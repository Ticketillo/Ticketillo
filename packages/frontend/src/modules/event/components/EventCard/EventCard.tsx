import { Card, CardTitle } from "components/card";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "components/context-menu";
import { Skeleton } from "components/skeleton";
import { useNavigate } from "react-router-dom";
import ConditionalLink from "router/components/ConditionalLink/ConditionalLink";
import { utils } from "ethers";

export interface EventCardProps {
    id: number;
    name: string;
    creator: string;
    description: string;
    imgUrl: string;
    loading?: boolean;
    price: string;
}

const EventCard = ({ id, name, description, creator, imgUrl, loading, price }: EventCardProps): JSX.Element => {
    const navigation = useNavigate();

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <ConditionalLink condition={!loading} to={`/event/${id}`}>
                    <Card
                        className="flex flex-row items-center justify-center transition-all hover:-translate-y-2 cursor-pointer p-4 gap-4 h-52 w-full"
                        onClick={() => navigation(`/event/${id}`)}
                    >
                        <div className="flex h-full aspect-square">
                            {loading ? (
                                <Skeleton className="rounded-md w-full" />
                            ) : (
                                <img src={imgUrl} className="rounded-md w-full object-cover" alt="image" />
                            )}
                        </div>
                        <div className="flex flex-col justify-between h-full flex-1 overflow-hidden">
                            <div className="flex flex-col w-full gap-2">
                                <CardTitle className="flex gap-2 flex-col">
                                    <div className="overflow-hidden">
                                        <p className="flex-1 text-ellipsis whitespace-nowrap overflow-hidden max-w-full">{name}</p>
                                    </div>
                                    <p className="text-fiord-400 text-sm">{creator}</p>
                                </CardTitle>
                                <p className="text-fiord-600 text-sm">{description}</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="hover:opacity-100 flex items-center justify-center rounded-md border-fiord-500 p-1 border-2">
                                    <p className="text-sm text-fiord-500">Available</p>
                                </div>
                                <p className="text-fiord-500 font-semibold">{utils.formatEther(price)} ETH</p>
                            </div>
                        </div>
                    </Card>
                </ConditionalLink>
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
