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
        const { email, password } = await req.json();
        console.log('Reached Login API with', { email, password });

        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ status: 'nok', message: 'Invalid email' }, { status: 401 });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ status: 'nok', message: 'Invalid password' }, { status: 401 });
        }

        const sessionId = uuidv4();
        session[sessionId] = { email: user.email };

        const headers = new Headers();
        headers.append('Set-Cookie', cookie.serialize('netroxeCookie', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        }));

        return NextResponse.json({ status: 'ok', message: 'Login successful', user: { email: user.email } }, { headers });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 'nok', message: error }, { status: 500 });
    }
}
