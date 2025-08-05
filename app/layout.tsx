import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "./component/WalletProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolLaunch - Solana Token Launchpad",
  description: "Create, deploy, and manage SPL tokens on Solana with our easy-to-use launchpad. No coding required.",
  keywords: ["Solana", "SPL Token", "Cryptocurrency", "Blockchain", "Token Creation", "Launchpad"],
  authors: [{ name: "SolLaunch Team" }],
  openGraph: {
    title: "SolLaunch - Solana Token Launchpad",
    description: "Create and deploy SPL tokens on Solana in minutes",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
