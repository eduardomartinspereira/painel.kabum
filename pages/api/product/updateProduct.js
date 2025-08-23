import { prisma } from '@/pages/api/server/db/prisma';

export default async function handler(req, res) {
    if (req.method !== 'PUT') return res.status(405).end();

    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: 'Missing id' });

        const { title, description, price, quantity, categoryId, img } =
            req.body || {};

        if (
            !title ||
            !description ||
            price == null ||
            quantity == null ||
            !categoryId
        ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const data = {
            title,
            description,
            price: Number(price),
            quantity: Number(quantity),
            categoryId: Number(categoryId),
        };

        if (img) data.img = img;

        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data,
            include: { category: { select: { id: true, name: true } } },
        });

        return res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Error updating product' });
    }
}
