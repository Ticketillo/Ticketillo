import EventCard from "../components/EventCard/EventCard";

const EventScreen = () => {
    return (
        <div className="flex flex-row gap-4 my-24">
            <EventCard
                id={1}
                description="This is the description of the HackUPC event 2023"
                name="HackUPC"
                creator="Peersyst"
                imgUrl="https://picsum.photos/200/300"
                available={123}
                maxAttendees={900}
            />
            <EventCard
                id={2}
                description="This is the description of the HackUPC event 2023"
                name="HackUPC"
                creator="Peersyst"
                imgUrl="https://picsum.photos/200/300"
                available={0}
                maxAttendees={900}
                loading
            />
        </div>
    );
};

export default EventScreen;
