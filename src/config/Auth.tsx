import prisma from "@/lib/db";
import { LoginFormSchema } from "@/schema/zodValidationSchema";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

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
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const username = credentials?.email;
        const email = credentials?.username;
        const password = credentials?.password;
        const validation = LoginFormSchema.safeParse({
          usernameOrEmail: username || email,
          password,
        });

        if (!validation.success) {
          throw new Error("username or password is invalid");
        }

        try {
          const existingUser = await prisma.user.findFirst({
            where: {
              OR: [{ email }, { username }],
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
            loginMethod: existingUser.loginMethod,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    signIn({ account, user }) {
      if (
        account?.provider == "google" &&
        !(user.loginMethod == "credentials")
      ) {
        throw new Error(
          "You have registered with credentials(username, password). Please use the same method"
        );
      }
      return true;
    },
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
    session({ session, user }) {
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
    error: "/pages/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
