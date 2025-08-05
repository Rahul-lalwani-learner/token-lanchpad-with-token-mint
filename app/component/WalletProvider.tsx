'use client';

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ReactNode } from "react";
import { NetworkProvider, useNetwork } from "../context/NetworkContext";

interface WalletContextProviderProps {
  children: ReactNode;
}

function WalletProviderInner({ children }: WalletContextProviderProps) {
  const { endpoint } = useNetwork();
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="w-screen overflow-x-hidden min-h-screen">
            <div className="m-auto flex flex-col max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function WalletContextProvider({ children }: WalletContextProviderProps) {
  return (
    <NetworkProvider>
      <WalletProviderInner>
        {children}
      </WalletProviderInner>
    </NetworkProvider>
  );
}
