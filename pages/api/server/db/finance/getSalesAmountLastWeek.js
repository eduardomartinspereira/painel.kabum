import { endOfWeek, startOfWeek, subWeeks } from 'date-fns';
import { prisma } from '../prisma';

export async function getSalesAmountLastWeek() {
    const lastWeekStart = startOfWeek(subWeeks(new Date(), 1), {
        weekStartsOn: 0,
    });

    const lastWeekEnd = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 0 });

    const paymentsLastWeek = await prisma.payment.findMany({
        where: {
            createdAt: {
                gte: lastWeekStart,
                lte: lastWeekEnd,
            },
            status: 'APPROVED',
        },
        select: {
            amount: true,
        },
    });

    const totalSalesAmountLastWeek = paymentsLastWeek.reduce(
        (total, payment) => {
            return total + Number(payment.amount);
        },
        0
    );

    return totalSalesAmountLastWeek;
}
