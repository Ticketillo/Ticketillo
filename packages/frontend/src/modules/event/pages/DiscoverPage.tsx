import useGetDiscoverEvents from "../query/useGetDiscoverEvents";

import EventCard from "../components/EventCard/EventCard";
import { Skeleton } from "components/skeleton";

export default function DiscoverPage() {
    const { data: events, isLoading } = useGetDiscoverEvents();

    return (
        <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
            {isLoading ? (
                Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="w-full h-64 rounded-lg" />)
            ) : events?.length === 0 ? (
                <p className="text-md">There are no events yet, create one!</p>
            ) : (
                events?.map((event, index: number) => (
                    <EventCard
                        key={`${event.id}-${index}`}
                        id={event.id}
                        name={event.name}
                        creator={event.user!.name}
                        description={event.description}
                        imgUrl={event.image}
                        available={1}
                        maxAttendees={event.seats}
                    />
                ))
            )}
        </div>
    );
}
