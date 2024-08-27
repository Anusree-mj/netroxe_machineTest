import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/libs/connectDB';
import User from '@/models/users';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie';

interface Session {
    [key: string]: { email: string };
}

const userActions = async (req: NextApiRequest, res: NextApiResponse) => {
    const session: Session = {};
    await connectToMongoDB();
    try {
        if (req.method === "POST") {
            const { name,email, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                userName:name,
                email,
                password: hashedPassword
            });
            await newUser.save();
            const sessionId = uuidv4();
            session[sessionId] = { email }
            res.setHeader('Set-Cookie', cookie.serialize('netroxeCookie', sessionId, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                maxAge: 60 * 60 * 24 * 7, 
                path: '/',
            }));
            res.status(201).json({ status: 'ok', credentials:{name,email} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'nok', message: error });
    }
}

export default userActions;

