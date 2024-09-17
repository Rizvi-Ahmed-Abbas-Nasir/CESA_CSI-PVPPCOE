import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import  connectMongoDB from "@/lib/db"
import Register from "@/models/register"
import bcrypt from 'bcrypt';


 const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log(email, password)

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        await connectMongoDB();
        const user = await Register.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }
        if (!password) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default authOptions;