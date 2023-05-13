import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Logger } from "@nestjs/common";

export default async (region: string, SecretId: string): Promise<Record<string, string>> => {
    try {
        const client = new SecretsManagerClient({ region: region });
        const secrets = await client.send(
            new GetSecretValueCommand({
                SecretId,
            }),
        );
        return JSON.parse(secrets.SecretString);
    } catch (e) {
        Logger.log("Could not load config AWS secrets: " + e);
        return {};
    }
};
