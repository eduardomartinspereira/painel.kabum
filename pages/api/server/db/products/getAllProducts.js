import { prisma } from '../prisma';

export const getAllProducts = async () => {
    // Usar Prisma Client para incluir as imagens e categoria relacionadas
    const products = await prisma.product.findMany({
        include: {
            images: {
                where: {
                    isPrimary: true
                },
                take: 1
            },
            category: true
        },
        orderBy: {
            name: 'asc'
        }
    });

    return products.map((product) => ({
        id: product.id,
        title: product.name,
        name: product.name,
        description: product.description,
        price: Number(product.basePrice),
        basePrice: Number(product.basePrice),
        status: product.isActive,
        category: product.category ? {
            id: product.category.id,
            name: product.category.name
        } : null,
        categoryId: product.categoryId,
        img: product.images.length > 0 ? product.images[0].url : null,
        image: product.images.length > 0 ? product.images[0].url : null,
    }));
};
