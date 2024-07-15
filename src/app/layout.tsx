import { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import GlobalContextProvider from "@/app/context/GlobalContext";
import { SnippetContextProvider } from "./context/SnippetContext";
import { dark } from "@clerk/themes";
import React from "react";

export const metadata: Metadata = {
  title: "Snippeter",
  description: "An easy to use place where you can put your code snippets",
  icons: {
    icon: "favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
      <html lang="en">
        <head>
          <title>SNIPETTER</title>
          <link rel="icon" sizes="any" href="/favicon.png" />
        </head>
        <GlobalContextProvider>
          <SnippetContextProvider>
            <body className="poppins font-normal">{children}</body>
          </SnippetContextProvider>
        </GlobalContextProvider>
      </html>
    </ClerkProvider>
  );
}
