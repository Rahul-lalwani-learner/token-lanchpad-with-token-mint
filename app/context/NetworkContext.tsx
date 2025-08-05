'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Network = 'devnet' | 'mainnet';

interface NetworkContextType {
  network: Network;
  setNetwork: (network: Network) => void;
  endpoint: string;
  isMainnet: boolean;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

interface NetworkProviderProps {
  children: ReactNode;
}

export function NetworkProvider({ children }: NetworkProviderProps) {
  const [network, setNetwork] = useState<Network>('devnet');

  const getEndpoint = (network: Network): string => {
    if (network === 'mainnet') {
      return process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_ENDPOINT || 'https://api.mainnet-beta.solana.com';
    }
    return process.env.NEXT_PUBLIC_ALCHEMY_DEVNET_ENDPOINT || 'https://api.devnet.solana.com';
  };

  const contextValue: NetworkContextType = {
    network,
    setNetwork,
    endpoint: getEndpoint(network),
    isMainnet: network === 'mainnet',
  };

  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork(): NetworkContextType {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
}
