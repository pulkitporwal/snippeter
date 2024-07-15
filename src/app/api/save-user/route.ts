// app/api/save-user/route.ts

import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import connectToDatabase from "@/utils/connectToDatabase";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    // Fetch user data from Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    // Check if user already exists in the database
    let user = await UserModel.findOne({ clerkUserId: userId });

    if (!user) {
      // If user doesn't exist, create a new entry
      user = new UserModel({
        clerkUserId: userId,
        emailAddress: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        profileImage: clerkUser.imageUrl,
      });
      await user.save();
      return NextResponse.json(
        { message: "User data added successfully" },
        { status: 201 }
      );
    } else {
      // If user exists, check for changes and update if necessary
      let isUpdated = false;
      if (user.emailAddress !== clerkUser.emailAddresses[0].emailAddress) {
        user.emailAddress = clerkUser.emailAddresses[0].emailAddress;
        isUpdated = true;
      }
      if (user.firstName !== clerkUser.firstName) {
        user.firstName = clerkUser.firstName;
        isUpdated = true;
      }
      if (user.lastName !== clerkUser.lastName) {
        user.lastName = clerkUser.lastName;
        isUpdated = true;
      }
      if (user.profileImage !== clerkUser.imageUrl) {
        user.profileImage = clerkUser.imageUrl;
        isUpdated = true;
      }

      if (isUpdated) {
        await user.save();
        return NextResponse.json(
          { message: "User data updated successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "No updates required" },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.error("Error handling user data:", error);
    return NextResponse.json(
      { error: "Error handling user data" },
      { status: 500 }
    );
  }
}
