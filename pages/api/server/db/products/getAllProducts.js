import { prisma } from '../prisma';

export const getAllProducts = async () => {
    const products = await prisma.$queryRaw`
    SELECT 
      p.id AS \`productId\`, 
      p.name AS \`title\`, 
      p.description, 
      p.basePrice AS \`price\`, 
      p.isActive AS \`status\`, 
      p.category AS \`categoryName\`
    FROM \`Product\` p
    ORDER BY p.\`name\` ASC
  `;

    return products.map((product) => ({
        id: product.productId,
        title: product.title,
        description: product.description,
        price: Number(product.price),
        status: product.status,
        category: product.categoryName,
    }));
};
