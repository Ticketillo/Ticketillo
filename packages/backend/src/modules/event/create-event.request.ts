import { ApiProperty } from "@nestjs/swagger";

export class CreateEventRequest {
    @ApiProperty({
        name: "id",
        type: "number",
    })
    id?: number;

    @ApiProperty({
        name: "name",
        type: "string",
        required: true,
    })
    name: string;

    @ApiProperty({
        name: "address",
        type: "string",
    })
    address?: string;

    @ApiProperty({
        name: "creator_address",
        type: "string",
        required: true,
    })
    creatorAddress: string;

    @ApiProperty({
        name: "data",
        type: "string",
        required: true,
    })
    data: string;
}
