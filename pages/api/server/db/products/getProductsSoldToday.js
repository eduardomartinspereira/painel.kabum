import { endOfDay, startOfDay, subDays } from 'date-fns';
import { prisma } from '../prisma';

export async function getProductsSoldToday() {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    console.log(
        todayStart.toISOString(),
        todayEnd.toISOString(),
        'TODAY START (UTC)',
        'TODAY END (UTC)'
    );

    const paymentsToday = await prisma.$queryRaw`
        SELECT 
            COALESCE(SUM(
                CAST(JSON_UNQUOTE(JSON_EXTRACT(items, '$[*].quantity')) AS DECIMAL(10,2))
            ), 0) as \`totalProductsSold\`
        FROM \`payments\`
        WHERE \`createdAt\` >= ${todayStart}
        AND \`createdAt\` <= ${todayEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalProductsSoldToday = paymentsToday[0]?.totalProductsSold
        ? Number(paymentsToday[0].totalProductsSold)
        : 0;

    const yesterdayStart = startOfDay(subDays(new Date(), 1));
    const yesterdayEnd = endOfDay(subDays(new Date(), 1));

    const paymentsYesterday = await prisma.$queryRaw`
        SELECT 
            COALESCE(SUM(
                CAST(JSON_UNQUOTE(JSON_EXTRACT(items, '$[*].quantity')) AS DECIMAL(10,2))
            ), 0) as \`totalProductsSold\`
        FROM \`payments\`
        WHERE \`createdAt\` >= ${yesterdayStart}
        AND \`createdAt\` <= ${yesterdayEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalProductsSoldYesterday = paymentsYesterday[0]?.totalProductsSold
        ? Number(paymentsYesterday[0].totalProductsSold)
        : 0;

    console.log(totalProductsSoldToday, totalProductsSoldYesterday);

    return {
        totalProductsSoldToday,
        totalProductsSoldYesterday,
    };
}
