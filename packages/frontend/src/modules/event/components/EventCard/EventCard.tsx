import { Card, CardTitle } from "components/card";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "components/context-menu";
import { Skeleton } from "components/skeleton";
import { useNavigate } from "react-router-dom";

export interface EventCardProps {
    id: number;
    name: string;
    creator: string;
    description: string;
    imgUrl: string;
    available: number;
    maxAttendees: number;
    loading?: boolean;
}

const EventCard = ({ id, name, description, creator, imgUrl, loading, maxAttendees, available }: EventCardProps): JSX.Element => {
    const navigation = useNavigate();

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Card
                    className="flex flex-row items-center justify-center transition-all hover:-translate-y-2 cursor-pointer p-4 gap-4 h-56"
                    onClick={() => navigation(`/event/${id}`)}
                >
                    <div className="flex h-full w-full">
                        {loading ? (
                            <Skeleton className="rounded-md w-full" />
                        ) : (
                            <img src={imgUrl} className="rounded-md w-full object-cover" />
                        )}
                    </div>
                    <div className="flex flex-col w-full justify-between h-full">
                        <div className="flex flex-col w-full gap-2">
                            <CardTitle className="flex gap-2 flex-col">
                                <p>{name}</p>
                                <p className="text-fiord-400 text-sm">{creator}</p>
                            </CardTitle>
                            <p className="text-fiord-600 text-sm">{description}</p>
                        </div>

                        <div className="flex justify-end">
                            <p className="text-fiord-500 font-semibold">1500 $</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-fiord-500 text-xs">
                                <span className="font-semibold ">{maxAttendees} </span>
                                attendees
                            </p>
                            {!available ? (
                                <div className="hover:opacity-100 flex items-center justify-center rounded-md border-red-500 p-1 border-2">
                                    <p className="text-sm text-red-500">Sold</p>
                                </div>
                            ) : (
                                <div className="hover:opacity-100 flex items-center justify-center rounded-md border-fiord-500 p-1 border-2">
                                    <p className="text-sm text-fiord-500">Available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    <a href={`/event/${id}`} target="_blank">
                        Open in new Tab
                    </a>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default EventCard;
