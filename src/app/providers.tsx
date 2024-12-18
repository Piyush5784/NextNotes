"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { RecoilRoot } from "recoil";

export default function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <>
      <RecoilRoot>
        <SessionProvider>
          <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </SessionProvider>
      </RecoilRoot>
    </>
  );
}
