import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "components/avatar";

export default function Logo() {
    return (
        <Link to="/">
            <div className="flex items-center">
                <Avatar className="mr-2 h-8 w-8 rounded-sm">
                    <AvatarImage src={`https://avatar.vercel.sh/1.png`} alt="Ticketillo logo" />
                    <AvatarFallback>TT</AvatarFallback>
                </Avatar>
                <p className="tracking-wide">Ticketillo</p>
            </div>
        </Link>
    );
}
