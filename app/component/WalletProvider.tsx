'use client';

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ReactNode } from "react";

interface WalletContextProviderProps {
  children: ReactNode;
}

export function WalletContextProvider({ children }: WalletContextProviderProps) {
  // Fallback to public devnet if environment variable is not set
  const endpoint = process.env.NEXT_PUBLIC_ALCHEMY_DEVNET_ENDPOINT || 'https://api.devnet.solana.com';
//   console.log(endpoint);
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="w-screen overflow-x-hidden">
            <div className="m-auto  flex flex-col max-w-3xl">
            {children}
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
