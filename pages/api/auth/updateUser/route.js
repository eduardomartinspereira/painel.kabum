import { hashPassword } from '@/app/server/db/utils';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();

        if (body.action === 'update') {
            const { name, email, password, oldEmail } = body;

            if (!email) {
                return NextResponse.json(
                    { message: 'User ID is required' },
                    { status: 400 }
                );
            }

            const hashedPassword = await hashPassword(password);

            const updatedUser = await prisma.user.update({
                where: {
                    email: oldEmail,
                },
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            return NextResponse.json(updatedUser);
        } else {
            return NextResponse.json(
                { message: 'Invalid action' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { message: 'Error updating user', error: error.message },
            { status: 500 }
        );
    }
}
