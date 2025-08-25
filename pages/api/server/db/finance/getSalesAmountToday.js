import { endOfDay, startOfDay, subDays } from 'date-fns';
import { prisma } from '../prisma';

export async function getSalesAmountToday() {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const yesterdayStart = startOfDay(subDays(new Date(), 1));
    const yesterdayEnd = endOfDay(subDays(new Date(), 1));

    const paymentsToday = await prisma.$queryRaw`
        SELECT COALESCE(SUM(\`amount\`), 0) as \`totalSalesAmountToday\`
        FROM \`payments\`
        WHERE \`createdAt\` >= ${todayStart}
        AND \`createdAt\` <= ${todayEnd}
        AND \`status\` = 'APPROVED';
    `;

    const paymentsYesterday = await prisma.$queryRaw`
        SELECT COALESCE(SUM(\`amount\`), 0) as \`totalSalesAmountYesterday\`
        FROM \`payments\`
        WHERE \`createdAt\` >= ${yesterdayStart}
        AND \`createdAt\` <= ${yesterdayEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalSalesAmountToday = Number(paymentsToday[0]?.totalSalesAmountToday || 0);
    const totalSalesAmountYesterday = Number(paymentsYesterday[0]?.totalSalesAmountYesterday || 0);

    return {
        totalSalesAmountToday,
        totalSalesAmountYesterday,
    };
}
