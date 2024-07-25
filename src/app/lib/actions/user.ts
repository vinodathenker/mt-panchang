"use server";

import { redirect } from "next/navigation";
import dbConnect from "../db";
import User from "../models/user";

export default async function register(formData: FormData) {
    try {
        debugger;
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const mobile = formData.get('mobile') as string;
        const password = formData.get('password') as string;
        await dbConnect();
        await User.create({
            name, email, mobile, password
        });       
        
    }
    catch (error) {
        console.log(error);
        return {
            message: 'Database Error: Failed to Create User.',
        };
    }
    redirect('/dashboard');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}