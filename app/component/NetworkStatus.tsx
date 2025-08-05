'use client';

import { useNetwork } from "../context/NetworkContext";

export function NetworkStatus() {
  const { network, isMainnet } = useNetwork();

  return (
    <div className={`fixed bottom-4 left-4 z-40 px-3 py-2 rounded-lg border backdrop-blur-sm ${
      isMainnet 
        ? 'bg-orange-900/80 border-orange-500 text-orange-100' 
        : 'bg-green-900/80 border-green-500 text-green-100'
    }`}>
      <div className="flex items-center space-x-2">
        <span className={`w-2 h-2 rounded-full ${
          isMainnet ? 'bg-orange-400' : 'bg-green-400'
        } animate-pulse`}></span>
        <span className="text-sm font-medium">
          {network.charAt(0).toUpperCase() + network.slice(1)}
        </span>
        {isMainnet && (
          <span className="text-xs opacity-80">
            (Live Network)
          </span>
        )}
      </div>
    </div>
  );
}
