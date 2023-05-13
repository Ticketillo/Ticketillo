import { useParams } from "react-router-dom";
import useGetEvent from "../query/useGetEvent";
import { MapPin, Users, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "components/progress";
import { Button } from "components/button";

export default function EventPage() {
    const { id } = useParams();

    const { data: event } = useGetEvent(id);

    const progress = Math.ceil((event?.sold / event?.limit) * 100);

    return (
        <div className="flex w-full">
            <div className="flex w-full gap-10">
                <img src={event?.image} className="flex-[2] h-80 rounded-md object-cover" />
                <div className="flex flex-col flex-[1] gap-6">
                    <h3 className="text-3xl font-bold">{event?.name}</h3>
                    <div className="flex flex-col">
                        <div className="flex gap-2 items-center">
                            <MapPin size="1.25rem" className="opacity-70" />
                            <span className="text-sm">{event?.location}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Users size="1.25rem" className="opacity-70" />
                            <span className="text-sm link">
                                Organized by <Link to={`/user/${event?.user.id}`}>{event?.user.name}</Link>
                            </span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <UserPlus size="1.25rem" className="opacity-70" />
                            <span className="text-sm">Limit {event?.limit}</span>
                        </div>
                    </div>
                    <div className="flex flex-col mt-auto gap-3">
                        <Progress value={progress} />
                        <Button className="w-full">{}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
