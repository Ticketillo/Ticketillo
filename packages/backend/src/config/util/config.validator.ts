export const validPort = (port: number) => !isNaN(port) && port > 0 && port < 65535;

export const validB64Key = (key: string) => {
    try {
        return Buffer.from(key, "base64").length === 32;
    } catch (e) {
        return false;
    }
};
