import { useParams } from "react-router-dom";
import useGetEvent from "../query/useGetEvent";
import { MapPin, Users, UserPlus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "components/progress";

import { utils } from "ethers";
import { Card, CardTitle } from "components/card";
import useGetSimilarEvents from "../query/useGetSimilarEvents";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/tooltip";
import { Skeleton } from "components/skeleton";
import EventCard from "../components/EventCard/EventCard";
import BuyTicketModal from "../components/BuyTicketModal/BuyTicketModal";
import { Button } from "components/button";

export default function EventPage() {
    const { id } = useParams();

    const { data: event, isLoading: eventLoading } = useGetEvent(id);
    const { data: similarEvents } = useGetSimilarEvents(id);

    const loading = eventLoading || eventLoading;

    const progress = event ? Math.ceil((event?.boughtSeats / event?.seats) * 100) : 0;
    const location = event?.attributes.find((attr) => attr.trait_type === "location")?.value;
    const date = event?.attributes.find((attr) => attr.trait_type === "date")?.value;

    return (
        <div className="flex w-full flex-col gap-10">
            <div className="flex w-full gap-10 flex-col md:flex-row">
                {loading ? (
                    <Skeleton className="flex-[1] lg:flex-[3] h-96 rounded-md" />
                ) : (
                    <img src={event?.image} className="flex-[1] lg:flex-[3] h-96 rounded-md object-cover" />
                )}
                <div className="flex flex-col flex-[1] lg:flex-[2] gap-6 overflow-hidden">
                    {loading ? (
                        <Skeleton className="text-3xl font-bold text-ellipsis whitespace-nowrap overflow-hidden">
                            <h3 className="opacity-0">.</h3>
                        </Skeleton>
                    ) : (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <h3 className="text-3xl font-bold text-ellipsis whitespace-nowrap overflow-hidden">{event?.name}</h3>
                                </TooltipTrigger>
                                <TooltipContent align="start">{event?.name}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    <div className="flex flex-1 flex-col justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            {loading ? (
                                <Skeleton className="w-40">
                                    <div className="flex gap-2 items-center opacity-0">
                                        <MapPin size="1.25rem" className="opacity-70" />
                                    </div>
                                </Skeleton>
                            ) : (
                                <div className="flex gap-2 items-center">
                                    <MapPin size="1.25rem" className="opacity-70" />
                                    <span className="text-sm">{location}</span>
                                </div>
                            )}
                            {loading ? (
                                <Skeleton className="w-60">
                                    <div className="flex gap-2 items-center opacity-0">
                                        <MapPin size="1.25rem" className="opacity-70" />
                                    </div>
                                </Skeleton>
                            ) : (
                                <div className="flex gap-2 items-center">
                                    <Calendar size="1.25rem" className="opacity-70" />
                                    <span className="text-sm">Date {Intl.DateTimeFormat().format(date)}</span>
                                </div>
                            )}
                            {loading ? (
                                <Skeleton className="w-60">
                                    <div className="flex gap-2 items-center opacity-0">
                                        <MapPin size="1.25rem" className="opacity-70" />
                                    </div>
                                </Skeleton>
                            ) : (
                                <div className="flex gap-2 items-center">
                                    <UserPlus size="1.25rem" className="opacity-70" />
                                    <span className="text-sm">Limit {event?.seats?.toLocaleString()}</span>
                                </div>
                            )}
                            {loading ? (
                                <Skeleton className="w-52">
                                    <div className="flex gap-2 items-center opacity-0">
                                        <MapPin size="1.25rem" className="opacity-70" />
                                    </div>
                                </Skeleton>
                            ) : (
                                <div className="flex gap-2 items-center">
                                    <Users size="1.25rem" className="opacity-70" />
                                    <span className="text-sm link">
                                        Organized by{" "}
                                        <Link className="link" to={`/user/${event?.creator.address}`}>
                                            {event?.creator.name}
                                        </Link>
                                    </span>
                                </div>
                            )}
                        </div>
                        {loading ? (
                            <Skeleton>
                                <Card className="p-4 flex flex-col gap-1 opacity-0">
                                    <p className="text-sm font-medium opacity-60">Price</p>
                                    <CardTitle className="text-2xl font-bold">
                                        {event?.seatPrice ? Number(utils.formatEther(event?.seatPrice)).toLocaleString() : 0} ETH
                                    </CardTitle>
                                </Card>
                            </Skeleton>
                        ) : (
                            <Card className="p-4 flex flex-col gap-1">
                                <p className="text-sm font-medium opacity-60">Price</p>
                                <CardTitle className="text-2xl font-bold">
                                    {event?.seatPrice ? Number(utils.formatEther(event?.seatPrice)).toLocaleString() : 0} ETH
                                </CardTitle>
                            </Card>
                        )}
                        {loading ? (
                            <Skeleton>
                                <div className="flex flex-col gap-1 opacity-0">
                                    <div className="flex flex-1 justify-between">
                                        <span className="text-sm">{0}</span>
                                        <span className="text-sm">{0}</span>
                                    </div>
                                    <Progress value={progress} />
                                </div>
                            </Skeleton>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-1 justify-between">
                                    <span className="text-sm">{event?.boughtSeats?.toLocaleString()}</span>
                                    <span className="text-sm">{event?.seats?.toLocaleString()}</span>
                                </div>
                                <Progress value={progress} />
                            </div>
                        )}
                        {loading ? (
                            <Skeleton>
                                <BuyTicketModal progress={progress} event={event} />
                            </Skeleton>
                        ) : (
                            <BuyTicketModal progress={progress} event={event} />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex w-full gap-10 flex-col">
                <div className="flex gap-10 w-full">
                    <div className="flex flex-[1] lg:flex-[3]">
                        {loading ? (
                            <div className="w-full flex flex-col gap-1">
                                <Skeleton className="w-full">
                                    <p className="opacity-0">.</p>
                                </Skeleton>
                                <Skeleton className="w-full">
                                    <p className="opacity-0">.</p>
                                </Skeleton>
                                <Skeleton className="w-20">
                                    <p className="opacity-0">.</p>
                                </Skeleton>
                            </div>
                        ) : (
                            <p>{event?.description}</p>
                        )}
                    </div>
                    <span className="flex-[2] hidden lg:flex" />
                </div>
                <div className="flex flex-[1] lg:flex-[2] flex-col gap-4 overflow-hidden">
                    <div className="flex flex-col gap-4">
                        {loading ? (
                            <Skeleton>
                                <div className="flex justify-between opacity-0">
                                    <p className="font-bold">Similar events</p>
                                    <Link to="/discover">
                                        <Button variant="outline" size="sm">
                                            View more
                                        </Button>
                                    </Link>
                                </div>
                            </Skeleton>
                        ) : (
                            <div className="flex justify-between">
                                <p className="font-bold">Similar events</p>
                                <Link to="/discover">
                                    <Button variant="outline" size="sm">
                                        View more
                                    </Button>
                                </Link>
                            </div>
                        )}
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            {loading
                                ? [...Array(4)].map((_, i) => (
                                      <Skeleton key={i}>
                                          <span className="opacity-0">
                                              <EventCard key={i} id={1} name={"."} description={"."} creator={"."} imgUrl={"."} />
                                          </span>
                                      </Skeleton>
                                  ))
                                : similarEvents?.map((similarEvent, index) => (
                                      <EventCard
                                          key={index}
                                          id={similarEvent.id}
                                          name={similarEvent.name}
                                          description={similarEvent.description}
                                          creator={similarEvent.user!.name}
                                          imgUrl={similarEvent.image}
                                      />
                                  ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
