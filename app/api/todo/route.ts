import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/libs/connectDB';
import Todo from '@/models/todo';


export async function POST(req: Request) {
    await connectToMongoDB();
    try {
        const { userId, task, description } = await req.json();
        console.log('useriddddd',userId)
        let todo = await Todo.findOne({ userId: userId });
        if (todo) {
            todo.todos.push({
                task,
                description,
                isCompleted: false
            });
            todo.totalTodo += 1
        } else {
            todo = await Todo.create({
                userId,
                todos: [{
                    task, description, isCompleted: false
                }],
                totalTodo: 1
            });
        }
        await todo.save();

        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 'nok', message: 'Unexpected error occured' }, { status: 500 });
    }
}
