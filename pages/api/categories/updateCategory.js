import { prisma } from '@/pages/api/server/db/prisma';
import { getServerSession } from 'next-auth';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const session = await getServerSession(req, res);

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.query;
    const { name, description } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ 
                success: false,
                message: 'Nome é obrigatório' 
            });
        }

        // Buscar categoria atual pelo ID
        const currentCategory = await prisma.category.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!currentCategory) {
            return res.status(404).json({
                success: false,
                message: 'Categoria não encontrada'
            });
        }

        // Verificar se o novo nome já existe (exceto a categoria atual)
        const nameExists = await prisma.category.findFirst({
            where: {
                name: name,
                id: {
                    not: parseInt(id)
                }
            }
        });

        if (nameExists) {
            return res.status(400).json({
                success: false,
                message: 'Já existe uma categoria com este nome'
            });
        }

        // Atualizar categoria
        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                name: name,
                description: description || `Categoria: ${name}`
            }
        });

        // Contar produtos associados
        const productsCount = await prisma.product.count({
            where: { categoryId: parseInt(id) }
        });

        console.log(`Updated category "${currentCategory.name}" to "${name}"`);
        
        res.status(200).json({
            success: true,
            id: updatedCategory.id,
            name: updatedCategory.name,
            description: updatedCategory.description,
            productsCount: productsCount,
            message: `Categoria atualizada com sucesso. ${productsCount} produto(s) associados.`
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ 
            success: false,
            message: 'Erro ao atualizar categoria',
            error: error.message 
        });
    }
}
