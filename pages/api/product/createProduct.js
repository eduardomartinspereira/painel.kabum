import { prisma } from '@/pages/api/server/db/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, description, price, img, quantity, categoryId } =
            req.body;

        try {
            const newProduct = await prisma.product.create({
                data: {
                    title,
                    description,
                    price: parseFloat(
                        price.replace('R$', '').replace(',', '.')
                    ), // Converte o preço para float
                    img,
                    quantity: parseInt(quantity),
                    categoryId: parseInt(categoryId),
                    status: 'IN_STOCK',
                    game: 'PLANO_MENSAL',
                    type: 'PC',
                    productKey: 'default-key',
                },
            });
            return res.status(200).json({ success: true, product: newProduct });
        } catch (error) {
            console.error('Error creating product:', error);
            return res
                .status(500)
                .json({ success: false, message: 'Failed to create product.' });
        }
    } else {
        // Retorna erro para métodos não suportados
        return res
            .status(405)
            .json({ success: false, message: 'Method not allowed.' });
    }
}
