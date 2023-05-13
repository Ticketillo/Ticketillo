import { getNestTypeORMConfig } from "./typeorm.config";
import loadAwsSecrets from "./util/loadAwsSecrets";
import serverConfig from "./server.config";
import loggerConfig from "./logger.config";

export default async (): Promise<any> => {
    return {
        server: serverConfig(),
        database: getNestTypeORMConfig(),
        logger: loggerConfig(),
    };
};
