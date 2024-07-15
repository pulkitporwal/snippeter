import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const route = () => {
    return (
        <div className="w-full p-5 my-8 h-screen flex-col flex items-center justify-center">
            <Link href={"/dashboard"} className="self-start xl:ml-36 mb-3 bg-neutral-700 rounded-md px-4 py-2 ">&larr; Dashboard</Link>
            <UserProfile />
        </div>
    );
};

export default route;
