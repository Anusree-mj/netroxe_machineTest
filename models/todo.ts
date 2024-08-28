import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface ITodo {
    userId: ObjectId;
    todos: Array<{
        task: string;
        description: string;
        isComplete: boolean;
    }>;
    totalTodo: number
}

export interface ITodoDocument extends ITodo, Document {
    createdAt: Date;
    updatedAt: Date;
}

const todoSchema = new mongoose.Schema<ITodoDocument>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        todos: [{
            task: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            isComplete: {
                type: Boolean,
                default: false
            }
        }],
        totalTodo: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const Todo: Model<ITodoDocument> =
    mongoose.models?.Todo || mongoose.model("Todo", todoSchema);

export default Todo;