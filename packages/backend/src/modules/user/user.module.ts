import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { User } from "../../database/entities/User";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    exports: [],
})
export class UserModule {}
