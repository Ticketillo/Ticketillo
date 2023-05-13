import useGetMyEvents from "../query/useGetMyEvents";

import EventCard from "../components/EventCard/EventCard";

export default function MyEventsPage() {
    const { data: events, isLoading } = useGetMyEvents("user");

    return (
        <div className="w-full grid gap-4 grid-cols-2 md:grid-cols-3">
            {isLoading ? (
                <div>Loading..</div>
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
