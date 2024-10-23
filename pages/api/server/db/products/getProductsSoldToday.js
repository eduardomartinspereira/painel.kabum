import { endOfDay, startOfDay } from 'date-fns';
import { prisma } from '../prisma';

export async function getProductsSoldToday() {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const paymentsToday = await prisma.$queryRaw`
        SELECT SUM(\`productQuantity\`) as \`totalProductsSold\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${todayStart}
        AND \`createdAt\` <= ${todayEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalProductsSold = paymentsToday[0]?.totalProductsSold || 0;

    return totalProductsSold;
}
