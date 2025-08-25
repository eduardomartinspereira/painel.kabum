import { prisma } from '../prisma';

export async function getRecentPayments() {
    const recentPayments = await prisma.$queryRaw`
        SELECT 
            p.id as \`paymentId\`, 
            p.status, 
            p.amount, 
            p.\`paymentMethod\`, 
            p.\`createdAt\`, 
            p.\`payerName\` as \`name\`,
            p.\`payerEmail\` as \`email\`
        FROM \`payments\` p
        WHERE p.status IN ('APPROVED', 'PENDING')
        ORDER BY p.\`createdAt\` DESC
        LIMIT 20;
    `;

    return recentPayments.map((payment) => ({
        name: payment.name,
        email: payment.email,
        status: payment.status,
        amount: Number(payment.amount),
        paymentId: payment.paymentId,
        paymentMethod: payment.paymentMethod,
        date: payment.createdAt.toISOString(),
    }));
}
