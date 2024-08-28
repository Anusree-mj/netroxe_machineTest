import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/libs/connectDB';
import Todo from '@/models/todo';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    await connectToMongoDB();

    try {
        const { userId } = params;
        console.log('useriddddd', userId);

        const todos = await Todo.find({ userId: userId });
        console.log(todos, 'todossssssssssssss')

        return NextResponse.json({ status: 'ok', todos });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 'nok', message: 'Unexpected error occurred' }, { status: 500 });
    }
}
