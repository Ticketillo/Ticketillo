import { Card, CardContent, CardHeader, CardTitle } from "components/card";

const EventCard = () => {
    return (
        <Card className="flex-row">
            <CardHeader>Image</CardHeader>
            <CardContent>
                <CardTitle>
                    <h6>Event name</h6>
                </CardTitle>
            </CardContent>
        </Card>
    );
};

export default EventCard;
