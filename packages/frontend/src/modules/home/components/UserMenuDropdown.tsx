import * as React from "react";
import { User, ChevronsUpDown, Ticket } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "components/avatar";
import { Button } from "components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "components/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";

export default function SpaceSwitcher() {
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

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
                    John Doe
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px] p-2">
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => navigate("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        My profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => navigate("/your-events")}>
                        <Ticket className="mr-2 h-4 w-4" />
                        My events
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}