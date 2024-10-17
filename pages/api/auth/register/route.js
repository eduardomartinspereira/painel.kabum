import { registerUser } from '@/app/server/db/user/registerUser';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        const user = await registerUser(name, email, password);

        return NextResponse.json(
            { message: 'User created successfully', user },
            { status: 201 }
        );
    } catch (error: any) {
        if (error.message === 'Email already in use') {
            return NextResponse.json(
                { message: error.message },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
