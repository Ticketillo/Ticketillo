import { Ring } from "@uiball/loaders";
import { Button } from "components/button";
import { Card, CardTitle } from "components/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/dialog";
import { useToast } from "components/use-toast";
import { utils } from "ethers";
import { Frown, Ticket } from "lucide-react";
import { FullEventDto } from "models";
import useBuyTicket from "modules/event/query/useBuyTicket";
import { useState } from "react";

interface BuyTicketModalProps {
    progress: number;
    event: FullEventDto | undefined;
}

const BuyTicketModal = ({ progress, event }: BuyTicketModalProps) => {
    const [open, setOpen] = useState(false);

    const { toast } = useToast();

    const { mutate: buyTicket, isLoading } = useBuyTicket();

    const handleBuy = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { boughtSeats: _boughtSeats, seatPrice, ...eventRest } = event!;
        buyTicket(
            { ...eventRest, price: seatPrice },
            {
                onSuccess: () => {
                    setOpen(false);
                    toast({ title: "Ticket bought!" });
                },
                onError: () => {
                    setOpen(false);
                    toast({ title: "Error buying ticket", variant: "destructive" });
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="w-full" disabled={progress === 100} onClick={() => setOpen(true)}>
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
                <div className="flex flex-col w-full">
                    <Card className="p-4 flex flex-col gap-1">
                        <p className="text-sm font-medium opacity-60">Price</p>
                        <CardTitle className="text-2xl font-bold">
                            {event?.seatPrice ? Number(utils.formatEther(event?.seatPrice)).toLocaleString() : 0} MATIC
                        </CardTitle>
                    </Card>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="default" onClick={handleBuy}>
                        {isLoading ? <Ring /> : "Confirm"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default BuyTicketModal;
