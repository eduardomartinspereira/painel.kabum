import { PrismaClient } from '@prisma/client';

// declare global {
//   var prisma: PrismaClient | undefined;
// }

export const prisma =
    global.prisma ||
    new PrismaClient({
        log: ['query'],
    });

console.log(process.env.NODE_ENV, 'node_env');

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
