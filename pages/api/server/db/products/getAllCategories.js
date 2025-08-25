import { prisma } from '../prisma';

export const getAllCategories = async () => {
    // Como não há tabela Category no schema atual, 
    // vamos buscar categorias únicas dos produtos
    const products = await prisma.product.findMany({
        select: {
            category: true,
        },
        where: {
            isActive: true,
        },
        distinct: ['category'],
    });

    // Criar categorias baseadas nos valores únicos encontrados
    const categories = products.map((product, index) => ({
        id: index + 1, // ID temporário
        name: product.category,
        description: `Categoria: ${product.category}`,
        createdAt: new Date().toISOString(),
    }));

    return categories;
};
