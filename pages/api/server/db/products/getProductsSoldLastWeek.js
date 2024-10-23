import { endOfWeek, startOfWeek, subWeeks } from 'date-fns';
import { prisma } from '../prisma';

export async function getProductsSoldLastWeek() {
    const lastWeekStart = startOfWeek(subWeeks(new Date(), 1), {
        weekStartsOn: 0,
    });

    const lastWeekEnd = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 0 });

    const paymentsLastWeek = await prisma.$queryRaw`
        SELECT SUM(\`productQuantity\`) as \`totalProductsSoldLastWeek\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${lastWeekStart}
        AND \`createdAt\` <= ${lastWeekEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalProductsSoldLastWeek = Number(
        paymentsLastWeek[0]?.totalProductsSoldLastWeek || 0
    );

    return totalProductsSoldLastWeek;
}
