import useGetDiscoverEvents from "../query/useGetDiscoverEvents";

import EventCard from "../components/EventCard/EventCard";
import { Skeleton } from "components/skeleton";

export default function DiscoverPage() {
    const { data: events, isLoading } = useGetDiscoverEvents("user");

    return (
        <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
            {isLoading ? (
                Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="w-full h-64 rounded-lg" />)
            ) : events?.length === 0 ? (
                <div>You have no events</div>
            ) : (
                events?.map((event, index: number) => (
                    <EventCard
                        key={`${event.id}-${index}`}
                        id={event.id}
                        name={event.name}
                        creator={event.creator}
                        description={event.description}
                        imgUrl={event.image}
                        available={event.sold}
                        maxAttendees={event.limit}
                    />
                ))
            )}
        </div>
    );
}
