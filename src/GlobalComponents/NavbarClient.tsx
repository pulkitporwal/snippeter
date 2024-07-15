"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { mainColor } from "../../Colors";

export function AuthenticationButtons() {
  const { userId } = useAuth();

  if (userId) {
    return (
      <div className="flex gap-2 flex-col sm:flex-row sm:w-auto sm:mt-0 max-sm:w-[60%] max-sm:mt-8">
        <Link href="/dashboard">
          <button
            className="w-full sm:w-auto p-2 px-6 text-sm text-black rounded-md border hover:bg-transparent hover:opacity-80"
            style={{ backgroundColor: mainColor, borderColor: mainColor }}
          >
            Dashboard
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-2 flex-col sm:flex-row sm:w-auto sm:mt-0 max-sm:w-[60%] max-sm:mt-8">
      <Link href="/sign-in">
        <button
          className="w-full sm:w-auto p-2 px-6 text-sm rounded-md border"
          style={{ color: mainColor, borderColor: mainColor }}
        >
          Sign In
        </button>
      </Link>
      <Link href="/sign-up">
        <button
          className="w-full sm:w-auto p-2 px-6 text-sm text-black rounded-md border hover:bg-transparent"
          style={{ backgroundColor: mainColor, borderColor: mainColor }}
        >
          Sign up
        </button>
      </Link>
    </div>
  );
}
