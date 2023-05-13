import { Logger } from "@nestjs/common";
import { DataSource, EntityTarget } from "typeorm";
import { TypeORMSeederAdapter } from "./adapter";
import { ConnectionSource } from "../../config/typeorm.config";
import { ConfigEnvType, getConfigEnv } from "../../config/util/config.utils";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import getByEnv, { events } from "./seeders-data/Events";
import { Event } from "../entities/Event";

export interface SeederAdapterI {
    insert<T>(entityTarget: EntityTarget<T>, data: QueryDeepPartialEntity<T>[]): Promise<void>;
    delete<T>(entityTarget: EntityTarget<T>): Promise<void>;
}

export class Seeder {
    private logger: Logger;
    private environment: ConfigEnvType;
    private adapter: SeederAdapterI;
    private connection: DataSource;

    constructor() {
        this.logger = new Logger(Seeder.name);
        this.environment = getConfigEnv();
    }

    logError(error: Error): void {
        this.logger.error(error);
    }

    async connect(): Promise<void> {
        this.connection = await ConnectionSource.initialize();
        await this.connection.initialize();
        this.adapter = new TypeORMSeederAdapter(this.connection);
        this.logger.log("Connected to database successfully!");
    }

    async disconnect(): Promise<void> {
        await this.connection.destroy();
        this.connection = null;
        this.adapter = null;
    }

    async reset(): Promise<void> {
        await this.connection.dropDatabase();
        await this.connection.runMigrations();
    }

    async seed(): Promise<void> {
        if (!this.connection || !this.adapter) {
            this.logger.error("Connection not acquired");
        }

        this.logger.log("Deleting current data...");
        await this.deleteAll();
        this.logger.log("Inserting seeders data ...");
        await this.insertAll();

        this.logger.log("Seeding finished.");
    }

    async deleteAll(): Promise<void> {
        await this.adapter.delete(Event);
    }

    async insertAll(): Promise<void> {
        await this.adapter.insert(Event, events);
    }
}

export async function runSeeders(pack = false): Promise<void> {
    const seeder = new Seeder();

    try {
        await seeder.connect();
        if (pack) await seeder.reset();
        await seeder.seed();
    } catch (error) {
        seeder.logError(error);
    } finally {
        await seeder.disconnect();
    }
}
