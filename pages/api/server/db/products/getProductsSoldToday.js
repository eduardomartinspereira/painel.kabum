import { endOfDay, startOfDay } from 'date-fns';
import { prisma } from '../prisma';

export async function getProductsSoldToday() {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const paymentsToday = await prisma.payment.findMany({
        where: {
            createdAt: {
                gte: todayStart,
                lte: todayEnd,
            },
        },
        select: {
            productQuantity: true,
        },
    });

    const totalProductsSold = paymentsToday.reduce((total, payment) => {
        return total + payment.productQuantity;
    }, 0);

    return totalProductsSold;
}
