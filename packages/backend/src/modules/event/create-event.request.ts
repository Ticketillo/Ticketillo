import { ApiProperty } from "@nestjs/swagger";

export class CreateEventRequest {
    @ApiProperty({
        name: "name",
        type: "string",
        required: true,
    })
    name: string;

    @ApiProperty({
        name: "address",
        type: "string",
        required: true,
    })
    address: string;

    @ApiProperty({
        name: "data",
        type: "string",
        required: true,
    })
    data: string;
}
