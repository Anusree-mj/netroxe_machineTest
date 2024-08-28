import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/libs/connectDB';
import Todo from '@/models/todo';

// add
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
                isComplete: false
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
// delete
export async function DELETE(req: Request) {
    await connectToMongoDB();
    try {
        const { userId, task } = await req.json();
        console.log('useriddddd', userId);
        
        let todo = await Todo.findOne({ userId: userId });
        
        if (todo) {
            todo.todos = todo.todos.filter(todoItem => todoItem.task !== task);
            
            todo.totalTodo = todo.todos.length;
            
            await todo.save();
            
            return NextResponse.json({ status: 'ok' });
        } else {
            return NextResponse.json({ status: 'nok', message: 'Todo not found' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 'nok', message: 'Unexpected error occurred' }, { status: 500 });
    }
}
// edit complete
export async function PATCH(req: Request) {
    await connectToMongoDB();
    try {
        const { userId, task } = await req.json();
        
        const todo = await Todo.findOne({ userId: userId });

        if (todo) {
            const todoItem = todo.todos.find(item => item.task === task);
            if (todoItem) {
                todoItem.isComplete = !todoItem.isComplete; 
                await todo.save(); 
                console.log(todoItem,'todoitemmmmmmmmmmmm')
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
// edit todo
export async function PUT(req: Request) {
    await connectToMongoDB();
    try {
        const { taskId, task, description, userId } = await req.json();

        const todo = await Todo.findOne({ userId});

        if (todo) {
            const todoItem = todo.todos.find(item => item.task === taskId);

            if (todoItem) {
                todoItem.task = task || todoItem.task;
                todoItem.description = description || todoItem.description;

                await todo.save(); 
                console.log(todoItem, 'todoItem updated');
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