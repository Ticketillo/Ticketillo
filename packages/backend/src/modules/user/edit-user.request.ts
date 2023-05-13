import { ApiProperty } from "@nestjs/swagger";

export class EditUserRequest {
    @ApiProperty({
        name: "address",
        type: "string",
        required: true,
    })
    address: string;

    @ApiProperty({
        name: "name",
        type: "string",
        required: true,
    })
    name: string;

    @ApiProperty({
        name: "description",
        type: "string",
        required: true,
    })
    description: string;

    @ApiProperty({
        name: "image",
        type: "string",
        required: true,
    })
    image: string;
}
