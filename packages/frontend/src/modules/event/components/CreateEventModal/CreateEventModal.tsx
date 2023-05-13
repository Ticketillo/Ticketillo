import { Button } from "components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/dialog";
import { Input } from "components/input";
import { Textarea } from "components/textarea";
import DatePicker from "../DatePicker/DatePicker";
import { useState } from "react";

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

interface ModalStepProps {
    active: boolean;
}

const FirstModalStep = ({ active }: ModalStepProps) => {
    return (
        <div className={`${!active && "hidden"} flex flex-col justify-center gap-4 my-8`}>
            <TextInput label="Event name" type="text" placeholder="Name" />
            <TextArea label="Event description" placeholder="Description" />
            <div className="flex flex-row gap-4 w-full items-end">
                <TextInput name="attendees" type="numeric" placeholder="100" label="Max attendees" />
                <DatePicker label="Event date" />
            </div>
        </div>
    );
};

const SecondModalStep = ({ active }: ModalStepProps) => {
    return (
        <div className={`${!active && "hidden"} flex flex-col justify-center gap-4 my-8`}>
            <TextInput label="Event image" name="eventImage" type="file" />
            <TextInput label="Ticket price" name="price" type="text" />
        </div>
    );
};

const CreateEventModal = () => {
    const [modalStep, setModalStep] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const handleNext = () => {
        setModalStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (modalStep === 0) setOpenModal(false);
        else setModalStep((prev) => prev - 1);
    };

    return (
        <Dialog open={openModal}>
            <DialogTrigger>
                <Button onClick={() => setOpenModal(true)}>Create event</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new event</DialogTitle>
                    <DialogDescription>Provide the following information to create an awesome event.</DialogDescription>
                </DialogHeader>
                <FirstModalStep active={modalStep === 0} />
                <SecondModalStep active={modalStep === 1} />
                <DialogFooter>
                    <Button variant="outline" onClick={handleBack}>
                        {modalStep === 0 ? "Cancel" : "Back"}
                    </Button>
                    <Button variant="default" onClick={handleNext}>
                        Next
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEventModal;
