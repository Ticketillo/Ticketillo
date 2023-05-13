const ConfigEnvs = ["production", "staging", "preview", "development", "test"] as const;

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type ConfigEnvType = ArrayElement<typeof ConfigEnvs>;

export type ConfigKey<T> = T | Partial<Record<ConfigEnvType | "default", T>>;

export type ConfigKeys<T> = { [P in keyof T]: ConfigKey<T[P]> };

export type ConfigValidators<T> = Partial<Record<keyof T, (value: unknown) => boolean>>;

export function getConfigEnv(): ConfigEnvType {
    const env: any = process.env.CONFIG_ENV || process.env.NODE_ENV || "development";
    if (ConfigEnvs.indexOf(env) === -1) throw new Error("Invalid env value " + env);
    return env;
}

export function buildConfig<T>(config: ConfigKeys<T>, validators: ConfigValidators<T> = {}): T {
    const configEnv = getConfigEnv();
    const keys = Object.keys(config) as (keyof T)[];

    const result = keys.reduce((acc: Partial<T>, key: keyof T) => {
        const value = config[key];
        if (
            typeof value === "object" &&
            (value["default"] || value["production"] || value["staging"] || value["preview"] || value["development"] || value["test"])
        ) {
            if (value[configEnv] !== undefined)
                return {
                    ...acc,
                    [key]: value[configEnv],
                };
            else
                return {
                    ...acc,
                    [key]: value["default"],
                };
        } else {
            return {
                ...acc,
                [key]: value,
            };
        }
    }, {}) as T;

    for (const key in result) {
        if (validators[key] && !validators[key](result[key]))
            throw new Error(`Error validating config param ${key} with value ${result[key]}`);
    }

    return result;
}
