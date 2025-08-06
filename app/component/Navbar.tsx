
'use client';

import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useNetwork } from "../context/NetworkContext";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import '@solana/wallet-adapter-react-ui/styles.css';
import { useWallet } from "@solana/wallet-adapter-react";

export function NavBar() {
    const { network, setNetwork, isMainnet } = useNetwork();
    const [showWarning, setShowWarning] = useState(false);
    const pathname = usePathname();
    const wallet = useWallet();

    const handleNetworkChange = (newNetwork: 'devnet' | 'mainnet') => {
        if (newNetwork === 'mainnet' && !isMainnet) {
            setShowWarning(true);
        } else {
            setNetwork(newNetwork);
        }
    };

    const confirmMainnetSwitch = () => {
        setNetwork('mainnet');
        setShowWarning(false);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <div className="flex md:flex-row flex-col items-center justify-between w-full p-4 lg:px-8">
                    {/* Logo and Navigation */}
                    <div className="flex items-center space-x-1 sm:space-x-8">
                        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white hover:text-blue-400 transition-colors">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <span>SolLaunch</span>
                        </Link>
                        
                        <div className="hidden md:flex items-center space-x-6">
                            <Link 
                                href="/" 
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive('/') 
                                        ? 'text-blue-400 bg-blue-400/10' 
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/token" 
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive('/token') 
                                        ? 'text-blue-400 bg-blue-400/10' 
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                Token Launchpad
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400 hidden sm:block">Network:</span>
                                <div className="flex bg-gray-800 rounded-lg p-1">
                                    <button
                                        onClick={() => handleNetworkChange('devnet')}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                                            network === 'devnet'
                                                ? 'bg-green-600 text-white shadow-sm'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                        }`}
                                    >
                                        Devnet
                                    </button>
                                    <button
                                        onClick={() => handleNetworkChange('mainnet')}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                                            network === 'mainnet'
                                                ? 'bg-orange-600 text-white shadow-sm'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                        }`}
                                    >
                                        Mainnet
                                    </button>
                                </div>
                            </div>
                    </div>
                            
                    <div className="flex items-center md:m-0 mt-4">
                        {wallet.connected ? 
                        <WalletDisconnectButton className="!bg-red-600 hover:!bg-red-700 !rounded-lg !text-sm !font-medium !px-3 !py-2 !transition-all !duration-200 !hidden sm:!inline-flex" /> : 
                        <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 !rounded-lg !text-sm !font-medium !px-3 !py-2 !transition-all !duration-200 !hidden sm:!inline-flex" />}
                        
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden border-t border-gray-800 px-4 py-2">
                    <div className="flex space-x-4">
                        <Link 
                            href="/" 
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/') 
                                    ? 'text-blue-400 bg-blue-400/10' 
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/token" 
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/token') 
                                    ? 'text-blue-400 bg-blue-400/10' 
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            Launchpad
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mainnet Warning Modal */}
            {showWarning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-orange-500 rounded-xl p-6 max-w-md w-full animate-fade-in">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-orange-500">Mainnet Warning</h3>
                        </div>
                        
                        <p className="text-gray-300 mb-6">
                            You are about to switch to Solana Mainnet. This will use real SOL tokens and incur actual costs. 
                            Please ensure you understand the implications before proceeding.
                        </p>
                        
                        <div className="flex space-x-3">
                            <button
                                onClick={confirmMainnetSwitch}
                                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                I Understand, Switch to Mainnet
                            </button>
                            <button
                                onClick={() => setShowWarning(false)}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}