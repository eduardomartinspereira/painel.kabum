import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    console.log(credentials, 'credentials');
                    const res = await fetch(
                        'https://game-ecommerce-template.vercel.app/api/auth/login',
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(credentials),
                        }
                    );

                    console.log(res);

                    if (!res.ok) {
                        console.error('Erro ao fazer login:', res.statusText);
                        return null;
                    }

                    const response = await res.json();

                    console.log(response.user);

                    if (
                        response.user &&
                        response.user.id &&
                        response.user.name &&
                        response.user.email
                    ) {
                        return response.user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Erro na autenticação:', error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image_url: user.image_url,
                };
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image_url = token.image_url;
            return session;
        },
    },
};

// Export the default function required by Next.js for API routes
export default NextAuth(authOptions);
