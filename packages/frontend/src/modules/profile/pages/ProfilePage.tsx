import { useForm } from "react-hook-form";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/card";
import { Button } from "components/button";
import { Label } from "components/label";
import { Input } from "components/input";
import { Textarea } from "components/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "components/avatar";
import { UserApi } from "../../../api/service";
import { useAuthState } from "../../auth/state";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfilePage() {
    const { register, handleSubmit } = useForm();
    const authState = useAuthState();
    const qc = useQueryClient();

    const onSubmit = async (data: any) => {
        await UserApi.createEvent({
            address: authState.address!,
            name: data.name,
            description: data.description,
            image: data.avatar[0]
        });
        await qc.invalidateQueries(["user"]);
    };

    return (
        <div className="w-full md:w-1/2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2 items-center">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={`https://avatar.vercel.sh/12312.png`} alt="user-avatar" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {authState.address}
                    </CardTitle>
                </CardHeader>
                <form>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" {...register("name")} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" {...register("description")} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="avatar">Avatar</Label>
                            <Input id="avatar" {...register("avatar")} type="file" accept="image/*" />
                        </div>
                    </CardContent>
                </form>
                <CardFooter className="flex justify-end">
                    <Button className="w-fit" onClick={handleSubmit(onSubmit)}>
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
