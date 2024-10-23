import { endOfWeek, startOfWeek, subWeeks } from 'date-fns';
import { prisma } from '../prisma';

export async function getSalesAmountLastWeek() {
    const lastWeekStart = startOfWeek(subWeeks(new Date(), 1), {
        weekStartsOn: 0, // A semana começa no domingo
    });

    const lastWeekEnd = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 0 });

    const paymentsLastWeek = await prisma.$queryRaw`
        SELECT SUM(\`amount\`) as \`totalSalesAmountLastWeek\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${lastWeekStart}
        AND \`createdAt\` <= ${lastWeekEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalSalesAmountLastWeek =
        paymentsLastWeek[0]?.totalSalesAmountLastWeek || 0;

    return totalSalesAmountLastWeek;
}
