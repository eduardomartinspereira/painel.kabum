import { endOfDay, startOfDay } from 'date-fns';
import { prisma } from '../prisma';

export async function getSalesAmountToday() {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const paymentsToday = await prisma.payment.findMany({
        where: {
            createdAt: {
                gte: todayStart,
                lte: todayEnd,
            },
            status: 'APPROVED',
        },
        select: {
            amount: true,
        },
    });

    console.log(paymentsToday, 'paymentsToday');
    const totalSalesAmount = paymentsToday.reduce((total, payment) => {
        return total + Number(payment.amount);
    }, 0);

    return totalSalesAmount;
}
