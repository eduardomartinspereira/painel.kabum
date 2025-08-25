import { prisma } from '@/pages/api/server/db/prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { firstName, lastName, email, cpf, phone, role, password } = req.body;

    console.log('Criando usuário:', { firstName, lastName, email, cpf, phone, role });

    try {
        // Verifica se o email já existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Esse email já existe' });
        }

        // Cria o novo usuário se o email não existir
        const newUser = await prisma.user.create({
            data: {
                firstName: firstName || null,
                lastName: lastName || null,
                email,
                cpf: cpf || null,
                phone: phone || null,
                role,
                password: password || null,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}
