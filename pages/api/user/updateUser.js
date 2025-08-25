import { prisma } from '@/pages/api/server/db/prisma';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { id, firstName, lastName, email, cpf, phone, role, password } = req.body;

    console.log('Atualizando usuário:', { id, firstName, lastName, email, cpf, phone, role });

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Construir objeto de dados apenas com campos válidos
        const updateData = {
            email: email || existingUser.email,
            role: role || existingUser.role,
        };

        // Adicionar campos opcionais apenas se fornecidos
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (cpf !== undefined) updateData.cpf = cpf;
        if (phone !== undefined) updateData.phone = phone;
        if (password !== undefined && password.trim() !== '') updateData.password = password;

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData,
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
        res.status(500).json({ message: 'Erro ao editar usuário' });
    }
}
