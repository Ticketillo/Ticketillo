import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/card";
import { Button } from "components/button";
import { Label } from "components/label";
import { Input } from "components/input";

export default function ProfilePage() {
    return (
        <div className="w-full md:w-1/2">
            <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Name</Label>
                        <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Description</Label>
                        <Input id="password" type="password" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button className="w-fit">Save</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
