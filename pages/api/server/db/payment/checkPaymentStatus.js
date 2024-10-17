import { prisma } from '../prisma';

export async function checkPaymentStatus(gatewayId) {
    try {
        // Query the payment data from the database using gatewayId as the reference
        const payment = await prisma.payment.findUnique({
            where: { gatewayId },
        });

        if (!payment) {
            throw new Error('Payment not found');
        }

        return payment;
    } catch (error) {
        console.error('Error fetching payment status:', error.message);
        throw error;
    }
}
