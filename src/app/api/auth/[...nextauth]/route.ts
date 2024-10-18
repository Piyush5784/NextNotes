import * as bcrypt from "bcrypt";
import NextAuth, { Account, AuthOptions, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma"; // Your Prisma instance

import { Note, User } from "@prisma/client";

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
        const username = credentials?.email;
        const password = credentials?.password;

        if (!username || !password) {
          throw new Error("username and password are required");
        }

        try {
          const existingUser = await prisma.user.findUnique({
            where: {
              username,
            },
            include: {
              Note: true,
            },
          });
          if (existingUser) {
            const compare = await bcrypt.compare(
              password,
              existingUser.password
            );

            if (!compare) {
              throw new Error("Invalid Password");
            }
            const notes = existingUser?.Note.map((note: Note) => ({
              ...note,
              time: note.id.toString(),
            }));

            return {
              id: existingUser.id.toString(),
              email: existingUser.username,
              notes,
            };
          }
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await prisma.user.create({
            data: {
              username,
              password: hashedPassword,
            },
            include: {
              Note: true,
            },
          });

          return {
            id: newUser.id.toString(),
            email: newUser.username,
            notes: [],
          };
        } catch (error) {
          console.error("Error creating user:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User | any;
      account: Account | null;
      profile?: Profile;
      trigger?: "update" | "signIn" | "signUp";
      isNewUser?: boolean;
      session?: any;
    }) {
      if (user) {
        token.user = user as unknown as any;
      }
      if (trigger === "update") {
        token.user = session?.user;
      }

      return token;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl;
    },
    async session({
      session,
      user,
      token,
      trigger,
    }: {
      session: any;
      token: JWT;
      trigger: "update" | undefined;
      user: User | any;
    }) {
      if (user?.notes) {
        session.user.notes = user.notes;
      }
      if (user?.trash) {
        session.user.trash = user.trash;
      }

      session.user = token.user;
      if (trigger === "update") {
        return { ...session };
      }
      return session;
    },
  },
  // pages: {
  //   signIn: "/pages/signin",
  // },
  secret: process.env.NEXTAUTH_SECRET || "mysecpassword",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
