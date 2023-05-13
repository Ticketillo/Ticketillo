import { Badge } from "components/badge";
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
                    className="flex flex-row items-center justify-center transition-all hover:-translate-y-2 cursor-pointer p-4 gap-4"
                    onClick={() => navigation(`/event/${id}`)}
                >
                    <div className="flex h-full w-full">
                        {loading ? <Skeleton className="rounded-md w-full" /> : <img src={imgUrl} className="rounded-md w-full" />}
                    </div>
                    <div className="flex flex-col w-full justify-between h-full">
                        <div className="flex flex-col w-full gap-2">
                            <CardTitle className="flex gap-2 flex-col">
                                <p>{name}</p>
                                <p className="text-fiord-400 text-sm">{creator}</p>
                            </CardTitle>
                            <p className="text-fiord-600 text-sm">{description}</p>
                        </div>

                        <div className="flex justify-between pt-10">
                            <p className="text-fiord-600 text-xs">{maxAttendees} attendees</p>
                            {!available ? (
                                <div>
                                    <Badge variant="destructive" className="hover:opacity-100">
                                        <p>Sold</p>
                                    </Badge>
                                </div>
                            ) : (
                                <div>
                                    <Badge variant="default" className="hover:opacity-100 bg-fiord-600">
                                        <p>Available</p>
                                    </Badge>
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
