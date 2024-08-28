import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/libs/connectDB';
import User from '@/models/users';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie';

interface Session {
    [key: string]: { email: string };
}

export async function POST(req: Request) {
    const session: Session = {};
    await connectToMongoDB();
    try {
        const { name, email, password } = await req.json();
        console.log('Reached API with', { name, email, password });
        const user = await User.findOne({ email: email })
        if (user) {
            return NextResponse.json({ status: 'nok', message: 'Email already found' }, { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName: name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        const sessionId = uuidv4();
        session[sessionId] = { email };

        const headers = new Headers();
        headers.append('Set-Cookie', cookie.serialize('netroxeCookie', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        }));
        return NextResponse.json({ status: 'ok', user: { _id: newUser._id, name, email } }, { headers });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 'nok',  message: 'Unexpected error occured' }, { status: 500 });
    }
}
