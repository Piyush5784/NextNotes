import { LoginFormSchema } from "@/schema/zodValidationSchema";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../prisma";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email.toLowerCase();
        const password = credentials?.password;

        const validation = LoginFormSchema.safeParse({ email, password });

        if (!validation.success) {
          throw new Error("username or password is invalid");
        }

        try {
          const existingUser = await prisma.user.findUnique({
            where: {
              email,
            },
            include: {
              Note: true,
            },
          });

          if (!existingUser) {
            throw new Error("User not exists please register");
          }

          if (!existingUser?.isVerified) {
            throw new Error("User not verified please verify your email");
          }

          const notes = existingUser?.Note?.map((note) => ({
            ...note,
            time: note.time.toString(),
          }));

          return {
            id: existingUser.id.toString(),
            email: existingUser.email,
            isVerified: existingUser.isVerified,
            username: existingUser.username,
            notes,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.email = user.email;
        token.notes = user.notes;
      }

      return token;
    },
    async session({ session, user }) {
      if (user) {
        session.user.email = user.email;
        session.user.isVerified = user.isVerified;
        session.user.notes = user.notes;
        session.user.id = user.id;
        session.user.username = user.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/pages/signin",
  },
  secret: process.env.NEXTAUTH_SECRET || "mysecpassword",
};
