import * as crypto from "crypto";
import { buildConfig } from "./util/config.utils";
import { validB64Key, validPort } from "./util/config.validator";

interface ServerConfig {
    port: number;
    secretKey: string;
    encryptionKey: string;
    enableSwagger: boolean;
    enableCors: boolean;
    baseUrl: string;
}

export default (): ServerConfig => {
    return buildConfig<ServerConfig>(
        {
            port: {
                default: 3000,
                development: 3001,
            },
            secretKey: {
                default: crypto.randomBytes(32).toString("base64"),
                development: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
                production: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
            },
            encryptionKey: {
                default: crypto.randomBytes(32).toString("base64"),
                development: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
                production: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
            },
            enableSwagger: {
                default: true,
                production: false,
            },
            enableCors: {
                default: true,
                production: false,
            },
            baseUrl: {
                default: "https://ticketillo.peersyst.tech",
                production: "https://ticketillo.peersyst.tech",
            }
        },
        {
            port: validPort,
            secretKey: validB64Key,
            encryptionKey: validB64Key,
        },
    );
};
