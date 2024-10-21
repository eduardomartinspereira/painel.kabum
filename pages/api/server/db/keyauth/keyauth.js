import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function gerarKeyKeyAuth(plano) {
    const keyAuthUrl = 'https://keyauth.win/api/seller/';
    const sellerKey = '1b7ec5827a5e5c038dcd48931d49e62a';

    const mask = '*****-*****-*****';
    const level = '1';
    const amount = '1';
    let expiry;

    switch (plano) {
        case 'PLANO_MENSAL':
            expiry = '30';
            break;
        case 'PLANO_SEMANAL':
            expiry = '7';
            break;
        case 'PLANO_PERMANENTE':
            expiry = (10 * 365).toString();
            break;
        default:
            throw new Error('Plano inválido.');
    }
    try {
        console.log({
            sellerkey: sellerKey,
            type: 'add',
            format: 'json',
            expiry: expiry,
            mask: mask,
            level: level,
            amount: amount,
        });

        const response = await axios.get(keyAuthUrl, {
            params: {
                sellerkey: sellerKey,
                type: 'add',
                format: 'json',
                expiry: expiry,
                mask: mask,
                level: level,
                amount: amount,
            },
        });

        console.log('Resposta recebida da API KeyAuth:', response.data);

        if (response.status !== 200) {
            throw new Error(
                'Erro ao gerar key no KeyAuth. Status code: ' + response.status
            );
        }

        const data = response.data;
        console.log('Dados retornados pela API KeyAuth:', data);

        if (!data.key) {
            console.log('Chave não encontrada na resposta:', data);
            throw new Error('A chave gerada está indefinida.');
        }

        return data.key;
    } catch (error) {
        console.error('Erro ao chamar a API KeyAuth:', error);
        throw new Error('Erro ao gerar a licença.');
    }
}
