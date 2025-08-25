import {
    endOfDay,
    endOfWeek,
    startOfDay,
    startOfWeek,
    subDays,
    subWeeks,
} from 'date-fns';
import { prisma } from '../prisma';

export async function getProductsSoldLastWeek() {
    const lastWeekStart = startOfDay(subDays(new Date(), 7)); // 7 days ago, start of the day
    const lastWeekEnd = endOfDay(subDays(new Date(), 1));

    const weekBeforeLastStart = startOfWeek(subWeeks(new Date(), 2), {
        weekStartsOn: 0,
    });
    const weekBeforeLastEnd = endOfWeek(subWeeks(new Date(), 2), {
        weekStartsOn: 0,
    });

    const paymentsLastWeek = await prisma.$queryRaw`
        SELECT COALESCE(SUM(
            CAST(JSON_UNQUOTE(JSON_EXTRACT(items, '$[*].quantity')) AS DECIMAL(10,2))
        ), 0) as \`totalProductsSoldLastWeek\`
        FROM \`payments\`
        WHERE \`createdAt\` >= ${lastWeekStart}
        AND \`createdAt\` <= ${lastWeekEnd}
        AND \`status\` = 'APPROVED';
    `;

    const paymentsWeekBeforeLast = await prisma.$queryRaw`
        SELECT COALESCE(SUM(
            CAST(JSON_UNQUOTE(JSON_EXTRACT(items, '$[*].quantity')) AS DECIMAL(10,2))
        ), 0) as \`totalProductsSoldWeekBeforeLast\`
        FROM \`payments\`
        WHERE \`createdAt\` >= ${weekBeforeLastStart}
        AND \`createdAt\` <= ${weekBeforeLastEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalProductsSoldLastWeek = Number(
        paymentsLastWeek[0]?.totalProductsSoldLastWeek || 0
    );

    const totalProductsSoldWeekBeforeLast = Number(
        paymentsWeekBeforeLast[0]?.totalProductsSoldWeekBeforeLast || 0
    );

    return {
        totalProductsSoldLastWeek,
        totalProductsSoldWeekBeforeLast,
    };
}
