import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/database/entities/User";
import { EditUserRequest } from "./edit-user.request";
import { UserDto } from "./user.dto";

@ApiTags("user")
@Controller("user")
@ApiErrorDecorators()
export class UserController {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    @Post()
    @ApiOperation({ description: "Create an event" })
    async createEvent(@Body() request: EditUserRequest): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { address: request.address } });
        if (user) {
            user.name = request.name;
            user.description = request.description;
            user.image = request.image;
        }
        await this.userRepository.save({
            address: request.address,
            name: request.name,
            description: request.description,
            image: request.image
        });
        return this.getUser(request.address);
    }

    @Get(":address")
    @ApiOperation({ description: "Get an user" })
    async getUser(@Param("address") address: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { address }, relations: ["event"] });
        return UserDto.fromEntity(user);
    }

    @Get("")
    @ApiOperation({ description: "Get all users" })
    async getAll(): Promise<UserDto[]> {
        const users = await this.userRepository.find({ relations: ["event"] });
        return users.map((user) => UserDto.fromEntity(user));
    }
}
