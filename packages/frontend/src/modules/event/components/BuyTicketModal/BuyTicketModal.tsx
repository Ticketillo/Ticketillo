import { Button } from "components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/dialog";
import { useState } from "react";

const BuyTicketModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogTrigger>
                <Button variant="default">Buy now</Button>
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
