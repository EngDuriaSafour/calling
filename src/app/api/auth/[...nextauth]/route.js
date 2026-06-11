import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../../util/mongoClient";
import User from "../../../../models/User";
import dbConnect from "../../../../../util/dbConnect";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-posta", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        
        const email = credentials.email;
        const password = credentials.password;
        
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("Henüz kayıt olmadınız!");
        }

        if (user) {
          return signInUser({ user, password });
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "gizli-anahtar",
  
  // Eksik olan ve kilitlenmeye sebep olan tek yer burasıydı:
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id; // Veritabanındaki gerçek ID token'a ekleniyor
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id; // Token'daki gerçek ID tarayıcı session'ına aktarılıyor
      }
      return session;
    },
  },
});

const signInUser = async ({ user, password }) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Hatalı şifre girdiniz!");
  }
  return user;
};

export { handler as GET, handler as POST };