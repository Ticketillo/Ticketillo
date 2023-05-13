import { useParams } from "react-router-dom";
import useGetEvent from "../query/useGetEvent";
import { MapPin, Users, UserPlus, Calendar, Frown, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "components/progress";

import { utils } from "ethers";
import { Card, CardTitle } from "components/card";
import useGetSimilarEvents from "../query/useGetSimilarEvents";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/tooltip";
import { Button } from "components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/dialog";
import { useState } from "react";

export default function EventPage() {
    const { id } = useParams();

    const { data: event } = useGetEvent(id);
    const { data: events } = useGetSimilarEvents(id);

    const progress = event ? Math.ceil((event?.boughtSeats / event?.seats) * 100) : 0;
    const location = event?.attributes.find((attr) => attr.trait_type === "location")?.value;
    const date = event?.attributes.find((attr) => attr.trait_type === "date")?.value;

    const [open, setOpen] = useState(false);

    return (
        <div className="flex w-full flex-col gap-10">
            <div className="flex w-full gap-10 flex-col md:flex-row">
                <img src={event?.image} className="flex-[3] h-96 rounded-md object-cover" />
                <div className="flex flex-col flex-[2] gap-6 overflow-hidden">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <h3 className="text-3xl font-bold text-ellipsis whitespace-nowrap overflow-hidden">{event?.name}</h3>
                            </TooltipTrigger>
                            <TooltipContent align="start">{event?.name}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="flex flex-1 flex-col justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <MapPin size="1.25rem" className="opacity-70" />
                                <span className="text-sm">{location}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Calendar size="1.25rem" className="opacity-70" />
                                <span className="text-sm">Date {Intl.DateTimeFormat().format(date)}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <UserPlus size="1.25rem" className="opacity-70" />
                                <span className="text-sm">Limit {event?.seats?.toLocaleString()}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Users size="1.25rem" className="opacity-70" />
                                <span className="text-sm link">
                                    Organized by{" "}
                                    <Link className="link" to={`/user/${event?.creator.address}`}>
                                        {event?.creator.name}
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <Card className="p-4 flex flex-col gap-1">
                            <p className="text-sm font-medium opacity-60">Price</p>
                            <CardTitle className="text-2xl font-bold">
                                {event?.seatPrice ? Number(utils.formatEther(event?.seatPrice)).toLocaleString() : 0} ETH
                            </CardTitle>
                        </Card>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-1 justify-between">
                                <span className="text-sm">{event?.boughtSeats?.toLocaleString()}</span>
                                <span className="text-sm">{event?.seats?.toLocaleString()}</span>
                            </div>
                            <Progress value={progress} />
                        </div>
                        <Dialog open={open} defaultOpen={false} onOpenChange={() => setOpen(false)}>
                            <DialogTrigger>
                                <Button className="w-full" disabled={progress === 100} onClick={() => setOpen(true)}>
                                    {progress < 100 ? (
                                        <div className="flex gap-2 items-center">
                                            <Ticket size="1.25rem" />
                                            <span>Get a ticket!</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2 items-center">
                                            <Frown size="1.25rem" />
                                            <span>Sold Out</span>
                                        </div>
                                    )}
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Buy this ticket</DialogTitle>
                                    <DialogDescription>Confirm this action to buy a ticket for this event.</DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col w-full">Accept message</div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="default" onClick={() => undefined}>
                                        Confirm
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div className="flex w-full gap-10">
                <p className="flex flex-[1]">{event?.description}</p>
            </div>
            {/* <div className="flex flex-1 gap-4">
                {events?.map(() => (
                    <EventCard key={event.id} {...event} />
                ))}
            </div> */}
        </div>
    );
}
