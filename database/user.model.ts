import { Schema, model, models } from "mongoose";

export interface IUser {
    name: string;
    username: string;
    email: string;
    password?: string;
    bio?: string;
    image?: string;
    location?: string;
    portfolioWebsite?: string;
    reputation?: number;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unqiue: true },
    password: { type: String },
    bio: { type: String },
    image: { type: String },
    location: { type: String },
    portfolioWebsite: { type: String },
    reputation: { type: Number, default: 0 }
}, { timestamps: true });

const User = models?.User || model<IUser>("User", UserSchema);

export default User;