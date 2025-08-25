import { prisma } from '../prisma';

export async function getTotalApprovedPayments() {
    const totalApprovedPayments = await prisma.$queryRaw`
        SELECT COALESCE(SUM(\`amount\`), 0) as \`totalApprovedPayments\`
        FROM \`payments\`
        WHERE \`status\` = 'APPROVED';
    `;

    const totalPayments = Number(
        totalApprovedPayments[0]?.totalApprovedPayments || 0
    );

    return totalPayments;
}
