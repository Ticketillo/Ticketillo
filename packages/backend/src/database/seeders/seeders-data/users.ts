import { hashSync } from "bcrypt";
import { User, UserType } from "../../entities/User";
import { ConfigEnvType } from "../../../config/util/config.utils";

const devUsers = [
    {
        id: 1,
        email: "acarrera@peersyst.com",
        type: UserType.ADMIN,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        email: "scanal@peersyst.com",
        type: UserType.ADMIN,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        email: "jgrau@peersyst.com",
        type: UserType.USER,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const previewUsers = [
    {
        id: 1,
        email: "acarrera@peersyst.com",
        type: UserType.ADMIN,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const prodUsers = [
    {
        id: 1,
        email: "acarrera@peersyst.com",
        type: UserType.ADMIN,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        email: "scanal@peersyst.com",
        type: UserType.ADMIN,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function getByEnv(env: ConfigEnvType): User[] {
    if (env === "production") {
        return prodUsers;
    }
    if (env === "development" || env === "staging" || env === "test") {
        return devUsers;
    }
    if (env === "preview") {
        return previewUsers;
    }
    if (env === "test") {
        return devUsers;
    }
    return [];
}
