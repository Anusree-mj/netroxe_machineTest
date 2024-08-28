import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/libs/connectDB';
import Todo from '@/models/todo';

export async function POST(req: Request) {
    await connectToMongoDB();
    try {
        const { userId, task, newTask, newDescription } = await req.json();
        
        // Validate required fields
        if (!userId || !task) {
            return NextResponse.json({ status: 'nok', message: 'Missing userId or task' }, { status: 400 });
        }

        const todo = await Todo.findOne({ userId });

        if (todo) {
            const todoItem = todo.todos.find(item => item.task === task);
            if (todoItem) {
                if (newTask) {
                    todoItem.task = newTask; // Update task if newTask is provided
                }
                if (newDescription) {
                    todoItem.description = newDescription; // Update description if newDescription is provided
                }
                await todo.save();
                console.log(todoItem, 'todoitem updated');
                return NextResponse.json({ status: 'ok' });
            } else {
                return NextResponse.json({ status: 'nok', message: 'Todo item not found' }, { status: 404 });
            }
        } else {
            return NextResponse.json({ status: 'nok', message: 'Todo document not found' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 'nok', message: 'Unexpected error occurred' }, { status: 500 });
    }
}