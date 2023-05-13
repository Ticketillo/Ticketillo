import { DataSourceOptions, DataSource } from "typeorm";
import { buildConfig, ConfigValidators } from "./util/config.utils";
import { validPort } from "./util/config.validator";

export type NestConnectionOptions = DataSourceOptions & {
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    retryDelay?: number;
    retryAttempts?: number;
};
function getTypeORMConfig(): DataSourceOptions {
    return buildConfig<DataSourceOptions>(
        {
            host: {
                default: process.env.DB_HOST || "db",
                development: "localhost",
            },
            port: {
                default: parseInt(process.env.DB_PORT) || 5432,
            },
            username: {
                default: process.env.DB_USER || "db_user",
            },
            password: {
                default: process.env.DB_PASSWORD || "db_password",
            },
            database: {
                default: process.env.DB_DATABASE || "db_database",
            },
            type: "postgres",
            synchronize: false,
            migrationsRun: true,
            entities: [__dirname + "/../database/entities/*{.ts,.js}"],
            migrations: [__dirname + "/../database/migrations/**/*{.ts,.js}"],
        },
        {
            port: validPort,
        } as ConfigValidators<DataSourceOptions>,
    );
}

export function getNestTypeORMConfig(): NestConnectionOptions {
    return {
        ...getTypeORMConfig(),
        autoLoadEntities: true,
    };
}

export const ConnectionSource = new DataSource(getTypeORMConfig());
