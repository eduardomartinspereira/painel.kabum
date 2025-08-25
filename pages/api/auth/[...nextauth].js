// app/lib/auth.ts
import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
// Use o alias se estiver configurado; caso contrário ajuste o caminho:
import { prisma } from '@/pages/api/server/db/prisma';

export const authOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development-only',
  providers: [
    Credentials({
      name: 'Email e senha',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('🔐 Tentativa de login para:', credentials?.email);
          
          if (!credentials?.email || !credentials?.password) {
            console.log('❌ Credenciais incompletas');
            return null;
          }

          const db = await prisma.user.findUnique({ 
            where: { email: credentials.email },
            select: {
              id: true,
              email: true,
              password: true,
              firstName: true,
              lastName: true,
              role: true
            }
          });
          
          if (!db) {
            console.log('❌ Usuário não encontrado:', credentials.email);
            return null;
          }
          
          if (!db.password) {
            console.log('❌ Usuário sem senha configurada:', credentials.email);
            return null;
          }

          const ok = await bcrypt.compare(credentials.password, db.password);
          if (!ok) {
            console.log('❌ Senha incorreta para:', credentials.email);
            return null;
          }

          if (db.role !== 'ADMIN') {
            console.log('❌ Usuário não é ADMIN:', credentials.email, 'Role:', db.role);
            return null;
          }

          console.log('✅ Login bem-sucedido para:', credentials.email);
          
          const authUser = {
            id: String(db.id),
            email: db.email,
            name: db.firstName || db.email.split('@')[0],
            firstName: db.firstName,
            lastName: db.lastName,
            role: db.role,
          };

          return authUser;
        } catch (error) {
          console.error('❌ Erro na autenticação:', error);
          return null;
        }
      },
    }),

    // Comentar Google Provider se não estiver sendo usado
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    // }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Se é um novo login
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.name = token.firstName || session.user.email?.split('@')[0] || 'Admin';
      }
      return session;
    },
  },

  pages: {
    signIn: '/',
    error: '/',
  },

  debug: process.env.NODE_ENV === 'development',
};
export default NextAuth(authOptions);
