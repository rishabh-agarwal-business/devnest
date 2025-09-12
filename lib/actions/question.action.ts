'use server';

import mongoose from "mongoose";
import { CreateQuestionParams } from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";
import { AskQuestionSchema } from "../validation";
import action from "../handlers/action";
import handleError from "../handlers/error";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import TagQuestion from "@/database/tagQuestion.model";

export async function createQuestion(params: CreateQuestionParams): Promise<ActionResponse> {
    const validResult = await action({ params, schema: AskQuestionSchema, authorize: true }) // Validate the input parameters against the schema

    if (validResult instanceof Error) return handleError(validResult) as ErrorResponse; // If validation fails, handle the error and return an ErrorResponse

    // Destructure the valid result (not used here, but can be used for further processing)
    const { title, content, tags } = validResult.params!;

    const userId = validResult?.session?.user?.id; // Get the user ID from the session
    if (!userId) {
        return handleError(new Error("Unauthorized")) as ErrorResponse; // If user ID is not found, return an unauthorized error
    }

    const session = await mongoose.startSession(); // Start a new MongoDB session for the transaction
    session.startTransaction(); // Begin the transaction

    try {
        const [question] = await Question.create([{ title, content, author: userId }], { session }); // Create a new question in the database
        if (!question) throw new Error("Failed to create question"); // If question creation fails, throw an error

        const tagIds: mongoose.Types.ObjectId[] = []; // Array to hold tag IDs
        const tagQuestionDocuments = []; // Array to hold tag-question relationship documents

        for (const tag of tags) { // Iterate over each tag
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, 'i') } }, // Case-insensitive search for the tag
                { $setOnInsert: { name: tag }, $inc: { questions: 1 } }, // If the tag exists, increment its question count
                { new: true, upsert: true, session } // If the tag does not exist, create it
            );

            tagIds.push(existingTag._id); // Add the tag ID to the array
            tagQuestionDocuments.push({ tag: existingTag._id, question: question._id }); // Prepare the tag-question relationship document
        }

        await TagQuestion.insertMany(tagQuestionDocuments, { session }); // Insert all tag-question relationship documents
        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagIds } }, // Add the tag IDs to the question's tags array
        }, { session }); // Update the question with the associated tags

        await session.commitTransaction(); // Commit the transaction if everything is successful

        return { success: true, data: JSON.parse(JSON.stringify(question)) }; // If everything is successful, return a success response with question and tag IDs
    } catch (error) {
        await session.abortTransaction(); // If an error occurs, abort the transaction
        return handleError(error) as ErrorResponse; // Handle the error and return an ErrorResponse
    } finally {
        session.endSession(); // End the session regardless of success or failure
    }
}