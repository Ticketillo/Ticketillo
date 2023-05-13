import { Button } from "components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/dialog";
import { Input } from "components/input";
import { Textarea } from "components/textarea";
import DatePicker from "../DatePicker/DatePicker";
import { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { Ring } from "@uiball/loaders";
import useCreateEvent from "modules/event/query/useCreateEvent";
import { useToast } from "components/use-toast";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const TextInput = ({ label, ...inputProps }: TextInputProps) => {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm">{label}</p>
            <Input {...inputProps} />
        </div>
    );
};

const TextArea = ({ label, ...textAreaProps }: TextAreaProps) => {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm">{label}</p>
            <Textarea {...textAreaProps} />
        </div>
    );
};

const CreateEventModal = () => {
    const [modalStep, setModalStep] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const maxSteps = 2;

    const handleNext = () => {
        setModalStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (modalStep === 0) setOpenModal(false);
        else setModalStep((prev) => prev - 1);
    };

    const confirm = modalStep + 1 === maxSteps;

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [attendees, setAttendees] = useState<number>(0);
    const [date, setDate] = useState<Date>();
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<FileList>();
    const [location, setLocation] = useState<string>("");

    const { mutate: createEvent, isLoading } = useCreateEvent();
    const { toast } = useToast();

    const handleCreate = () => {
        const data = {
            name,
            description,
            attendees,
            price,
            image: image![0],
            location,
        };
        createEvent(data, {
            onSuccess: () => {
                toast({ title: "Event created!" });
                setOpenModal(false);
            },
            onError: () => {
                toast({ title: "Event creation failed!", variant: "destructive" });
                setOpenModal(false);
            },
        });
    };

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger>
                <Button onClick={() => setOpenModal(true)}>Create event</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new event</DialogTitle>
                    <DialogDescription>Provide the following information to create an awesome event.</DialogDescription>
                </DialogHeader>
                <div className={`${!(modalStep === 0) && "hidden"} flex flex-col justify-center gap-4 my-8`}>
                    <TextInput value={name} onChange={(e) => setName(e.target.value)} label="Event name" type="text" placeholder="Name" />
                    <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label="Event description"
                        placeholder="Description"
                    />
                    <div className="flex flex-row gap-4 w-full items-end">
                        <TextInput
                            value={attendees}
                            onChange={(e) => setAttendees(Number(e.target.value))}
                            name="attendees"
                            type="numeric"
                            placeholder="100"
                            label="Max attendees"
                        />
                        <DatePicker label="Event date" date={date && new Date()} onDate={setDate} />
                    </div>
                </div>
                <div className={`${!(modalStep === 1) && "hidden"} flex flex-col justify-center gap-4 my-8`}>
                    <TextInput onChange={(e) => setImage(e.target.files!)} label="Event image" name="eventImage" type="file" />
                    <TextInput value={price} onChange={(e) => setPrice(e.target.value)} label="Ticket price" name="price" type="text" />
                    <PlacesAutocomplete value={location} onChange={(e) => setLocation(e)} onSelect={(e) => setLocation(e)}>
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className="flex flex-col gap-2">
                                <TextInput
                                    label="Location"
                                    name="location"
                                    {...getInputProps({
                                        placeholder: "Search Places ...",
                                        className: "location-search-input",
                                    })}
                                />
                                <div className="flex flex-col autocomplete-dropdown-container">
                                    {loading && (
                                        <div className="flex flex-col w-full">
                                            <Ring size={30} />
                                        </div>
                                    )}
                                    {suggestions.map((suggestion) => {
                                        const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                                className="py-2 px-2"
                                            >
                                                <span className="text-sm">{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleBack}>
                        {modalStep === 0 ? "Cancel" : "Back"}
                    </Button>
                    <Button variant="default" onClick={!confirm ? handleNext : handleCreate}>
                        {!isLoading && (confirm ? "Confirm" : "Next")}
                        {isLoading && <Ring size={20} color="white" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEventModal;
