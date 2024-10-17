import { verifyPassword } from '@/app/server/db/utils';
import { NextResponse } from 'next/server';
import { prisma } from '../../../server/db/prisma';

export async function POST(req) {
    try {
        const { name, email, password, action, userId } = await req.json();

        console.log(name, email, password, action, userId);

        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        console.log(user);

        if (!user) {
            return NextResponse.json(
                { message: 'Credenciais inválidas.' },
                { status: 401 }
            );
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'Credenciais inválidas.' },
                { status: 401 }
            );
        }

        const { password: _, ...userData } = user;
        return NextResponse.json({
            message: 'Login bem-sucedido.',
            user: userData,
        });
    } catch (error) {
        console.error('Erro:', error);
        return NextResponse.json(
            { message: 'Erro ao processar a solicitação.' },
            { status: 500 }
        );
    }
}
