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

    console.log(paymentsToday, 'paymentsToday'); // Debugging step to inspect the fetched amounts

    // Ensure the amounts are treated as numbers by explicitly converting them
    const totalSalesAmount = paymentsToday.reduce((total, payment) => {
        return total + Number(payment.amount); // Ensure amount is treated as a number
    }, 0);

    console.log(totalSalesAmount, 'totalSalesAmount');

    return totalSalesAmount;
}
