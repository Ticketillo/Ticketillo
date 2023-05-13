import baseConfig from "./config.base.json";
import devConfig from "./config.dev.json";
import prodConfig from "./config.prod.json";
import { Config } from "./config.types";

const envConfigs: Record<string, Config> = {
    development: { ...baseConfig, ...devConfig },
    production: { ...baseConfig, ...prodConfig },
};

const envKey = process.env.REACT_APP_CONFIG_ENV || process.env.NODE_ENV;

if (!(envKey in envConfigs)) throw new Error(`${envKey} is not a valid env config`);

const config: Config = envConfigs[envKey];

export default config;
