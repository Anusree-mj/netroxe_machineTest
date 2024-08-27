import mongoose, { Document, Model } from "mongoose";

export interface IUser {
    userName: string;
    email:string;
    password: string;
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },       
    },
    {
        timestamps: true,
    }
);

const User: Model<IUserDocument> =
    mongoose.models?.User || mongoose.model("User", userSchema);

export default User;