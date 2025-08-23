// pages/api/product/createProduct.ts
import { prisma } from '@/pages/api/server/db/prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    try {
        const { title, description, price, quantity, categoryId, img } =
            req.body;
        if (
            !title ||
            !description ||
            price == null ||
            quantity == null ||
            !categoryId ||
            !img
        ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const product = await prisma.product.create({
            data: {
                title,
                description,
                price: Number(price),
                quantity: Number(quantity),
                img, // já é URL
                categoryId: Number(categoryId),
                status: 'IN_STOCK',
            },
            include: { category: { select: { name: true, id: true } } },
        });
        res.status(201).json({ success: true, product });
    } catch (e) {
        console.error('Error creating product:', e);
        res.status(500).json({ error: 'Error creating product' });
    }
}
