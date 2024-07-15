"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfileUser = () => {
  const { user } = useUser();
  const imageURL = user?.imageUrl;

  const loadingImage = (
    <div className="w-9 h-9 rounded-full mb-[5px] bg-neutral-500"></div>
  );
  const loadingName = (
    <div className="w-20 h-2 rounded-full mb-[5px] bg-neutral-500"></div>
  );
  const loadingEmail = (
    <div className="w-14 h-2 rounded-full mb-[5px] bg-neutral-500"></div>
  );

  return (
    <div className="flex gap-3 items-center">
      {!user ? (
        loadingImage
      ) : (
        <Link href={"/profile"}>
          <img
            src={imageURL}
            className="w-9 h-9 rounded-full mb-[5px]"
            alt="profile"
          />
        </Link>
      )}

      <div className="max-md:hidden flex flex-col text-sm">
        {!user ? (
          loadingName
        ) : (
          <span className="font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
        )}
        {!user ? (
          loadingEmail
        ) : (
          <span className="text-slate-300 text-[11px]">
            {user?.emailAddresses[0].emailAddress}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileUser;
