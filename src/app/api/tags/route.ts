import TagModel from "@/models/Tag";
import connectToDatabase from "@/utils/connectToDatabase";
import { mongo } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { title } = await req.json();

        if (!title) {
            return NextResponse.json(
                { message: "Title is required to add Tag" },
                { status: 404 }
            );
        }

        const existedTag = await TagModel.find({ title });

        if (existedTag.length > 0) {
            return NextResponse.json(
                { message: "Tag Already existed", existedTag },
                { status: 201 }
            );
        }

        const newTag = await TagModel.create({
            title,
        });

        return NextResponse.json(
            { message: "Tag Added Successfully", newTag },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while creating new Tag:", error);
        return NextResponse.json(
            { error: "Error while creating new Tag" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectToDatabase();

        const allTags = await TagModel.find({});

        return NextResponse.json(
            { message: "Tag Fetched Successfully", allTags },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while getting all Tag:", error);
        return NextResponse.json(
            { error: "Error while getting all Tag" },
            { status: 500 }
        );
    }
}
