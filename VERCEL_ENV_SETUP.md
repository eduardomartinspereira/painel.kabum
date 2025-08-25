# 🔧 Configuração de Variáveis de Ambiente para Vercel

## ❌ PROBLEMA IDENTIFICADO
O erro 401 em produção está acontecendo porque as variáveis de ambiente não estão configuradas corretamente na Vercel.

## ✅ SOLUÇÃO - Configure estas variáveis na Vercel:

### 1. No Dashboard da Vercel:
- Acesse: https://vercel.com/dashboard
- Vá no seu projeto
- Clique em "Settings" → "Environment Variables"

### 2. Adicione estas variáveis:

```
NEXTAUTH_SECRET=sua-chave-secreta-super-forte-aqui-min-32-chars
NEXTAUTH_URL=https://painel.estudosprogramacao.com.br
DATABASE_URL=sua-string-de-conexao-mysql
```

### 3. Valores específicos:

#### NEXTAUTH_SECRET
```bash
# Gere uma nova chave com:
openssl rand -base64 32
# Ou use este exemplo (MUDE PARA ALGO ÚNICO):
NEXTAUTH_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890abcdef123
```

#### NEXTAUTH_URL
```
NEXTAUTH_URL=https://painel.estudosprogramacao.com.br
```

#### DATABASE_URL
```
DATABASE_URL=mysql://usuario:senha@host:porta/database
```

## 🚀 Após configurar:
1. Faça um novo deploy
2. Teste o login
3. Verifique os logs na Vercel

## 🔍 Para debug adicional:
- Logs da Vercel: https://vercel.com/dashboard → seu projeto → Functions
- Logs em tempo real durante o teste de login