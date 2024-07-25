import dbConnect from '@/app/lib/db';
import User from '@/app/lib/models/user';
import { Password } from '@/app/lib/services/password';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

interface Credentials {
    email?: string;
    password?: string;
}

async function getUser(email: string) {
    try {
        await dbConnect();
        const user = await User.findOne({ email, isActive: true }).select('+password');
        return user?.toJSON();
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({

    pages: {
        signIn: '/auth/signin', // Custom sign-in page
    },
    providers: [
        // Credentials({
        //     async authorize(credentials: Credentials) {
        //         const parsedCredentials = z
        //         .object({ email: z.string().email(), password: z.string().min(6) })
        //         .safeParse(credentials);

        //     if (parsedCredentials.success) {
        //         const { email, password } = parsedCredentials.data;
        //         const user = await getUser(email);
        //         if (!user) return null;
        //         const passwordMatch = await Password.compare(user.password, password);
        //         if (passwordMatch) return user;
        //     }
        //     console.log('Invalid credentials');
        //     return null;
        //     },
        // }),
    ],
});