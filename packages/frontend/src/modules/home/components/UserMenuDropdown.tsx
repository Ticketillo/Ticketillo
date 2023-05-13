import * as React from "react";
import { User, ChevronsUpDown, Ticket } from "lucide-react";
import { useAuthState } from "modules/auth/state";

import { Avatar, AvatarFallback, AvatarImage } from "components/avatar";
import { Button } from "components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "components/dropdown-menu";
import { useNavigate } from "react-router-dom";
import useGetUser from "modules/event/query/useGetUser";

export default function SpaceSwitcher() {
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();
    const { address } = useAuthState();

    const { data } = useGetUser(address);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a space"
                    className="w-[150px] justify-between"
                >
                    <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage src={`https://avatar.vercel.sh/12312.png`} alt="user-avatar" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <p className="truncate">{data?.address}</p>
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] p-2">
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => navigate("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        My profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => navigate("/tickets")}>
                        <Ticket className="mr-2 h-4 w-4" />
                        My tickets
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
