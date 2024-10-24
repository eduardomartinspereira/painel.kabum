import { endOfWeek, startOfWeek, subWeeks } from 'date-fns';
import { prisma } from '../prisma';

export async function getSalesAmountLastWeek() {
    const lastWeekStart = startOfWeek(subWeeks(new Date(), 1), {
        weekStartsOn: 0,
    });

    const lastWeekEnd = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 0 });

    const weekBeforeLastStart = startOfWeek(subWeeks(new Date(), 2), {
        weekStartsOn: 0,
    });

    const weekBeforeLastEnd = endOfWeek(subWeeks(new Date(), 2), {
        weekStartsOn: 0,
    });

    const paymentsLastWeek = await prisma.$queryRaw`
        SELECT SUM(\`amount\`) as \`totalSalesAmountLastWeek\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${lastWeekStart}
        AND \`createdAt\` <= ${lastWeekEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalSalesAmountLastWeek =
        paymentsLastWeek[0]?.totalSalesAmountLastWeek || 0;

    const paymentsWeekBeforeLast = await prisma.$queryRaw`
        SELECT SUM(\`amount\`) as \`totalSalesAmountWeekBeforeLast\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${weekBeforeLastStart}
        AND \`createdAt\` <= ${weekBeforeLastEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalSalesAmountWeekBeforeLast =
        paymentsWeekBeforeLast[0]?.totalSalesAmountWeekBeforeLast || 0;

    return {
        totalSalesAmountLastWeek,
        totalSalesAmountWeekBeforeLast,
    };
}
