import { EventDto } from "../models/api";
import { EventApi } from "../api/service";
import { uploadFile } from "../api/service/helper/uploadFile";
import { config } from "../config";
import { Ticket__factory } from "./typechain";
import { FullEventDto } from "../models";
import { Web3ProviderService } from "./web3/Web3ProviderService";

export class EventService {
    static async getEvent(id: number): Promise<FullEventDto> {
        const eventDto = await EventApi.getEvent(id);
        const provider = Web3ProviderService.provider;
        const Ticket = new Ticket__factory(provider.getSigner());
        const ticket = Ticket.attach(eventDto.address);
        return FullEventDto.fromEventDto(
            eventDto,
            (await ticket.getSupply()).toNumber(),
            (await ticket.tokenIdCounter()).toNumber(),
            eventDto.price,
        );
    }

    static async createEvent(
        creatorAddress: string,
        name: string,
        description: string,
        image: File,
        externalUrl: string,
        seats: number,
        seatPrice: string,
        location: string,
    ): Promise<EventDto> {
        const fileUrl = await uploadFile(image, "image");
        const provider = await Web3ProviderService.provider;
        const signer = await provider.getSigner();
        const eventDto = await EventApi.createEvent({
            name: name,
            creator_address: await signer.getAddress(),
            data: JSON.stringify({
                description,
                external_url: config.backendUrl,
                image: fileUrl,
                price: seatPrice,
                attributes: [
                    {
                        trait_type: "location",
                        value: location,
                    },
                ],
            }),
        });

        const metadataUrl = config.backendUrl + "/api/event/" + eventDto.id + "/";
        const Ticket = new Ticket__factory(signer);
        const ticket = await Ticket.deploy(metadataUrl, seats, seatPrice, name, "TKT", "0x0000000000000000000000000000000000000000");
        const address = ticket.address;

        return EventApi.createEvent({
            address,
            id: eventDto.id,
            name: name,
            creator_address: await signer.getAddress(),
            data: JSON.stringify({
                description,
                external_url: config.backendUrl,
                image: fileUrl,
                price: seatPrice,
                attributes: [
                    {
                        trait_type: "location",
                        value: location,
                    },
                ],
            }),
        });
    }

    static async buyTicket(eventDto: EventDto) {
        const provider = await Web3ProviderService.provider;
        const Ticket = new Ticket__factory(await provider.getSigner());
        const ticket = await Ticket.attach(eventDto.address);
        await ticket.mint({ gasLimit: 300000, value: eventDto.price });
    }
}
