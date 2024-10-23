import { endOfDay, startOfDay } from 'date-fns';
import { prisma } from '../prisma';

export async function getSalesAmountToday() {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const paymentsToday = await prisma.$queryRaw`
        SELECT SUM(\`amount\`) as \`totalSalesAmount\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${todayStart}
        AND \`createdAt\` <= ${todayEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalSalesAmount = paymentsToday[0]?.totalSalesAmount || 0;

    console.log(paymentsToday, 'paymentsToday');
    return totalSalesAmount;
}
