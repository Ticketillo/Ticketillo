import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "components/avatar";

const HomePage = () => {
    return (
        <div className="text-red-500 text-2xl font-bold">
            <p>dalksdahjs</p>
            <Avatar className="mr-2 h-5 w-5">
                <AvatarImage src={`https://avatar.vercel.sh/1.png`} alt="dasdas" />
                <AvatarFallback>SC</AvatarFallback>
            </Avatar>
        </div>
    );
};

export default HomePage;
