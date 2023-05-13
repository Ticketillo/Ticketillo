import { Avatar, AvatarFallback, AvatarImage } from "components/avatar";

export default function Logo() {
    return (
        <div className="flex items-center">
            <Avatar className="mr-2 h-8 w-8">
                <AvatarImage src={`https://avatar.vercel.sh/1.png`} alt="Ticketillo logo" />
                <AvatarFallback>TT</AvatarFallback>
            </Avatar>
            <p>Ticketillo</p>
        </div>
    );
}
