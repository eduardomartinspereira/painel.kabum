import { endOfMonth, startOfMonth } from 'date-fns';
import { prisma } from '../prisma';

export async function getMonthlySalesData() {
    const currentYear = new Date().getFullYear();

    const monthlyData = [];

    for (let month = 0; month < 12; month++) {
        const monthStart = startOfMonth(new Date(currentYear, month));
        const monthEnd = endOfMonth(new Date(currentYear, month));

        const payments = await prisma.payment.findMany({
            where: {
                createdAt: {
                    gte: monthStart,
                    lte: monthEnd,
                },
                status: 'APPROVED',
            },
            select: {
                amount: true,
            },
        });

        const totalOrders = payments.length;
        const totalRevenue = payments.reduce((total, payment) => {
            return total + Number(payment.amount);
        }, 0);

        monthlyData.push({
            month: monthStart.toLocaleString('default', { month: 'long' }),
            totalOrders,
            totalRevenue,
        });
    }

    return monthlyData;
}
