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
                    className="flex flex-row items-center justify-center transition-all hover:-translate-y-2 cursor-pointer p-8 gap-4"
                    onClick={() => navigation(`/event/${id}`)}
                >
                    <div className="flex flex-col h-full w-full">
                        {loading ? (
                            <Skeleton className="rounded-md w-full h-36" />
                        ) : (
                            <img src={imgUrl} className={`rounded-md h-36 w-full`} />
                        )}
                    </div>
                    <div className="flex flex-col w-full h-36 justify-between">
                        <div className="flex flex-col w-full gap-2">
                            <CardTitle className="flex flex-row gap-2">
                                <h4>{name}</h4>
                                <p className="text-fiord-400 font-normal"> · {creator}</p>
                            </CardTitle>
                            <h6 className="text-fiord-600">{description}</h6>
                        </div>

                        <div className="flex flex-row justify-between">
                            <h6 className="text-fiord-600">{maxAttendees} attendees</h6>
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
