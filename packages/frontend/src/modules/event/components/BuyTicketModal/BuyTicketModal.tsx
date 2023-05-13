import { Button } from "components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/dialog";
import { Frown, Ticket } from "lucide-react";
import { useState } from "react";

interface BuyTicketModalProps {
    progress: number;
}

const BuyTicketModal = ({ progress }: BuyTicketModalProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogTrigger>
                <Button
                    className="w-full"
                    disabled={progress === 100}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    {progress < 100 ? (
                        <div className="flex gap-2 items-center">
                            <Ticket size="1.25rem" />
                            <span>Get a ticket!</span>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Frown size="1.25rem" />
                            <span>Sold Out</span>
                        </div>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Buy this ticket</DialogTitle>
                    <DialogDescription>Confirm this action to buy a ticket for this event.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col w-full">Accept message</div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="default" onClick={() => undefined}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default BuyTicketModal;
