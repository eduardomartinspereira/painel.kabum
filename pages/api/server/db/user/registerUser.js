import { prisma } from '../prisma';
import { hashPassword } from '../utils';

export const registerUser = async (name, email, password) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error('Email already in use');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return newUser;
};
