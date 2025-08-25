import { prisma } from '@/pages/api/server/db/prisma';

export default async function handler(req, res) {
    if (req.method !== 'PUT') return res.status(405).end();

    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: 'Missing id' });

        console.log('Updating product with ID:', id);
        console.log('Request body:', req.body);

        // Aceitar tanto os campos antigos quanto os novos para compatibilidade
        const { 
            title, description, price, quantity, categoryId, img,
            name, basePrice, category, brand, isActive 
        } = req.body || {};

        // Mapear campos antigos para novos se necessário
        const finalName = name || title;
        const finalBasePrice = basePrice || price;
        const finalCategory = category || (categoryId ? `Category ${categoryId}` : undefined);
        const finalDescription = description;

        if (
            !finalName ||
            !finalDescription ||
            finalBasePrice == null
        ) {
            console.log('Missing required fields:', { 
                name: finalName, 
                description: finalDescription, 
                basePrice: finalBasePrice 
            });
            return res.status(400).json({ 
                error: 'Missing required fields',
                received: { 
                    name: finalName, 
                    description: finalDescription, 
                    basePrice: finalBasePrice 
                }
            });
        }

        const data = {
            name: finalName,
            description: finalDescription,
            basePrice: Number(finalBasePrice),
            category: finalCategory || 'Sem categoria',
        };

        if (brand !== undefined) data.brand = brand;
        if (isActive !== undefined) data.isActive = Boolean(isActive);

        console.log('Update data:', data);

        // Verificar se o produto existe antes de atualizar
        const existingProduct = await prisma.product.findUnique({
            where: { id: Number(id) }
        });

        if (!existingProduct) {
            console.log('Product not found with ID:', id);
            return res.status(404).json({ error: 'Product not found' });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data,
        });

        console.log('Product updated successfully:', updatedProduct);
        return res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            meta: error.meta
        });
        
        return res.status(500).json({ 
            error: 'Error updating product',
            details: error.message,
            code: error.code
        });
    }
}
