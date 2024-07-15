import mongoose, { Document } from "mongoose";
import { string } from "zod";

interface Snippet extends Document {
    id?: string;
    title: string;
    description: string;
    code: string;
    isFavorite: boolean;
    language: string;
    tags: [];
    isTrashed: boolean;
    user?: string;
}

const snippetSchema = new mongoose.Schema<Snippet>({
    title: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    language: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: String,
            maxlength: 100,
        },
    ],
    isTrashed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: String,
    },
});

const SnippetModel =
    mongoose.models.Snippet || mongoose.model("Snippet", snippetSchema);

export default SnippetModel;
