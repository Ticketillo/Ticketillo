import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config";
import { join } from "path";
import * as OpenApiValidator from "express-openapi-validator";
import { APP_FILTER } from "@nestjs/core";
import { CommandModule } from "nestjs-command";
import { TypeORMSeederAdapter } from "./database/seeders/adapter";
import { ErrorFilter } from "./modules/common/exception/error.filter";
import { ServeStaticModule } from "@nestjs/serve-static";
import { EventModule } from "./modules/event/event.module";
import { UserModule } from "./modules/user/user.module";
import { FileModule } from "./modules/file/file.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [async () => configuration()],
            expandVariables: true,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                return {
                    type: config.get("database.type"),
                    host: config.get("database.host"),
                    port: config.get("database.port"),
                    username: config.get("database.username"),
                    password: config.get<string>("database.password"),
                    database: config.get("database.database"),
                    synchronize: config.get("database.synchronize"),
                    autoLoadEntities: config.get("database.autoLoadEntities"),
                    entities: config.get("database.entities"),
                    migrations: config.get("database.migrations"),
                    migrationsRun: config.get("database.migrationsRun"),
                } as TypeOrmModuleOptions;
            },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "data"),
            serveRoot: "file"
        }),
        EventModule,
        UserModule,
        FileModule,
        CommandModule,
    ],
    providers: [TypeORMSeederAdapter, { provide: APP_FILTER, useClass: ErrorFilter }],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(
                ...OpenApiValidator.middleware({
                    apiSpec: join("./openapi-spec.json"),
                    validateRequests: {
                        allowUnknownQueryParameters: true,
                        coerceTypes: false,
                    },
                    validateResponses: false,
                    validateFormats: "full",
                }),
            )
            .forRoutes("*");
    }
}
