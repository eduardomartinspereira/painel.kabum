import { prisma } from '../prisma';

export async function getRecentPayments() {
    // Buscar os pagamentos mais recentes, limitando a quantidade de registros
    const recentPayments = await prisma.payment.findMany({
        where: {
            status: {
                in: ['APPROVED', 'PENDING'],
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 10,
        include: {
            user: true,
        },
    });

    return recentPayments.map((payment) => ({
        name: payment.user.name,
        userId: payment.user.id,
        status: payment.status,
        amount: payment.amount,
        productId: payment.id,
        paymentMethod: payment.paymentMethod,
        amount: payment.amount,
        date: Date(payment.createdAt),
    }));
}
