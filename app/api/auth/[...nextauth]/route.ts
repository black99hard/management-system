import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text", placeholder: "student, lecturer, admin" },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;
        const role = credentials?.role?.toLowerCase() || 'student';

        // Dummy logic for authentication (replace with real logic)
        if (username && password) {
          const user = {
            id: "1",
            name: "SALAHUDEEN RIDWAN",
            email: "SALAHUDEEN.RIDWAN@example.com",
            role: role,
          };
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };