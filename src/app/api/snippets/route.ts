import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { z } from "zod";
import SnippetModel from "@/models/Snippet";
import connectToDatabase from "@/utils/connectToDatabase";

const CardSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000),
    code: z.string(),
    tags: z.array(z.string().max(100)).max(10).optional(),
    language: z.string().min(1, "Language must not be empty"),
    isFavorite: z.boolean().optional(),
    isTrashed: z.boolean().optional(),
});

function validateSchema(schema: z.ZodSchema, data: any) {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new z.ZodError(result.error.errors);
    }
    return result.data;
}

function validateInput(data: any) {
    return validateSchema(CardSchema, data);
}

function authenticateUser(req: NextRequest) {
    const { userId } = getAuth(req);
    if (!userId) {
        throw new Error("Unauthorized");
    }
    return userId;
}

function handleError(error: unknown) {
    console.error("Error in API route", { error });
    if (error instanceof z.ZodError) {
        return NextResponse.json(
            { error: "Invalid input", details: error.errors },
            { status: 400 }
        );
    }
    if (error instanceof Error && error.message === "Unauthorized") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
    );
}

function sendResponse(data: any, status: number = 200) {
    return NextResponse.json({ data, success: true }, { status });
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const userId = authenticateUser(req);

        const body = await req.json();
        const data = validateInput(body);

        const newSnippet = await SnippetModel.create({
            user: userId,
            ...data,
            tags: data.tags || [],
        });


        return sendResponse(
            { message: "Snippet added successfully", snippet: newSnippet },
            201
        );
    } catch (error) {
        return handleError(error);
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectToDatabase();
        const userId = authenticateUser(req);

        const body = await req.json();
        const data = validateInput(body);


        const updatedSnippet = await SnippetModel.findOneAndUpdate(
            { _id: body._id, user: userId },
            data,
            { new: true, runValidators: true }
        );

        if (!updatedSnippet) {
            return NextResponse.json(
                {
                    error: "Snippet not found or you don't have permission to update it",
                },
                { status: 404 }
            );
        }

        return sendResponse({
            message: "Snippet updated successfully",
            snippet: updatedSnippet,
        });
    } catch (error) {
        return handleError(error);
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const userId = authenticateUser(req);

        const allSnippets = await SnippetModel.find({ user: userId });

        return sendResponse({
            message: "Snippets fetched successfully",
            snippets: allSnippets,
        });
    } catch (error) {
        return handleError(error);
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectToDatabase();

        const userId = authenticateUser(req);
        const { _id } = await req.json();

        const deleteSnippet = await SnippetModel.deleteOne({ _id: _id });

        return sendResponse({
            message: "Snippet deleted successfully",
            deleteSnippet,
        });
    } catch (error) {
        return handleError(error);
    }
}
