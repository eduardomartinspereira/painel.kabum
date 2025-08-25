// pages/api/product/createProduct.ts
import { prisma } from '@/pages/api/server/db/prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    try {
        // Aceitar tanto campos antigos quanto novos
        const { 
            title, description, price, quantity, categoryId, img,
            name, basePrice, category, brand, isActive 
        } = req.body;

        // Mapear campos antigos para novos
        const finalName = name || title;
        const finalDescription = description;
        const finalBasePrice = basePrice || price;
        const finalCategoryId = categoryId || (category?.id) || null;
        const finalImg = img;

        if (
            !finalName ||
            !finalDescription ||
            finalBasePrice == null
        ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const product = await prisma.product.create({
            data: {
                name: finalName,
                description: finalDescription,
                basePrice: Number(finalBasePrice),
                categoryId: finalCategoryId ? Number(finalCategoryId) : null,
                brand: brand || null,
                isActive: isActive !== undefined ? Boolean(isActive) : true,
            },
        });

        // Se há imagem, criar registro na tabela ProductImage
        if (finalImg) {
            await prisma.productImage.create({
                data: {
                    productId: product.id,
                    url: finalImg,
                    alt: finalName,
                    isPrimary: true,
                    order: 0,
                },
            });
        }

        res.status(201).json({ success: true, product });
    } catch (e) {
        console.error('Error creating product:', e);
        console.error('Error details:', {
            message: e.message,
            code: e.code,
            meta: e.meta
        });
        res.status(500).json({ error: 'Error creating product' });
    }
}
