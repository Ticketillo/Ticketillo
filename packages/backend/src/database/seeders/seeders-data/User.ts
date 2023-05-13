import { User } from "../../entities/User";

export const users: User[] = [
    {
        address: "0x11E9E0EDca5c90E97886C64d33AC5bfde1694BD6",
        name: "Cryptobro",
        image: "https://picsum.photos/200/300",
        description: "Tomorrowland is the biggest electronic music festival in the world.",
    }
];

export default function getByEnv(env: string) {
    return users;
}
