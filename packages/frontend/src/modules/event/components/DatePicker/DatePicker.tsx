"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "utils";
import { Popover, PopoverContent, PopoverTrigger } from "components/popover";
import { Button } from "components/button";
import { Calendar } from "components/calendar";

interface DatePickerProps {
    label: string;
    date: Date | undefined;
    onDate: (date: Date | undefined) => void;
}

export default function DatePicker({ label, date, onDate: setDate }: DatePickerProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm">{label}</p>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} fromDate={new Date()} initialFocus />
                </PopoverContent>
            </Popover>
        </div>
    );
}
