import { Schema, Types, model, models } from "mongoose";

export interface ITagQuestion {
    question: Types.ObjectId;
    tagId: Types.ObjectId;
}

export interface ITagQuestionDoc extends ITagQuestion, Document { }

const TagQuestionSchema = new Schema<ITagQuestion>({
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    tagId: { type: Schema.Types.ObjectId, ref: 'Tag', required: true }
}, { timestamps: true });

const TagQuestion = models?.TagQuestion || model<ITagQuestion>('TagQuestion', TagQuestionSchema);

export default TagQuestion;