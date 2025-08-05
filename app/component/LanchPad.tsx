'use client'
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useState, useEffect } from "react";
import axios from "axios";
import { Keypair, SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createInitializeMetadataPointerInstruction, createInitializeMintInstruction, ExtensionType, getMintLen, getAssociatedTokenAddressSync, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE, createAssociatedTokenAccountInstruction, createMintToInstruction } from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import { useNetwork } from "../context/NetworkContext";

export function LanchPad(){
    const wallet = useWallet();
    const {connection} = useConnection();
    const { network, isMainnet } = useNetwork();
    const [form, setForm] = useState({
        name: "",
        symbol: "",
        description: "",
        imageUrl: ""
    });
    const [message, setMessage] = useState("");
    const [mintAddress, setMintAddress] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [isMinting, setIsMinting] = useState(false);

    // Auto-clear messages after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleTokenMinting(recipient: string, mintPubkey: string, amount: number) {
        setIsMinting(true);
        try {
            const recipientPubkey = new PublicKey(recipient);
            const mintPubkeyObj = new PublicKey(mintPubkey);

            if(!wallet.publicKey){
                setMessage("Please connect your wallet first");
                return;
            }

            const associatedToken = getAssociatedTokenAddressSync(
                mintPubkeyObj,
                recipientPubkey,
                false,
                TOKEN_2022_PROGRAM_ID
            );

            const transaction = new Transaction().add(
                createAssociatedTokenAccountInstruction(
                    wallet.publicKey, 
                    associatedToken, 
                    recipientPubkey, 
                    mintPubkeyObj, 
                    TOKEN_2022_PROGRAM_ID
                ),
                createMintToInstruction(
                    mintPubkeyObj, 
                    associatedToken,
                    recipientPubkey, 
                    amount * LAMPORTS_PER_SOL, 
                    [], 
                    TOKEN_2022_PROGRAM_ID
                )
            );

            await wallet.sendTransaction(transaction, connection);
            setMessage(`Successfully minted ${amount} tokens!`);
        } catch (error) {
            setMessage("Failed to mint tokens. Please check the addresses and try again.");
            console.error(error);
        } finally {
            setIsMinting(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsCreating(true);

        if (!wallet.publicKey) {
            setMessage("Please connect your wallet first!");
            setIsCreating(false);
            return;
        }

        try {
            const response = await axios.post("https://metadata-off-chain.vercel.app/metadata", {
                name: form.name, 
                symbol: form.symbol, 
                description: form.description, 
                image: form.imageUrl
            });

            const metadataUrl = (response.data as { metadataurl: string }).metadataurl;
            const mintKeyPair = Keypair.generate();
            const metadata = {
                mint : mintKeyPair.publicKey, 
                name: form.name, 
                symbol: form.symbol, 
                uri: metadataUrl,
                additionalMetadata: []
            };

            const mintLen = getMintLen([ExtensionType.MetadataPointer]); 
            const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
            const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey, 
                    newAccountPubkey: metadata.mint,
                    space: mintLen, 
                    lamports, 
                    programId: TOKEN_2022_PROGRAM_ID
                }), 
                createInitializeMetadataPointerInstruction(mintKeyPair.publicKey, wallet.publicKey, mintKeyPair.publicKey, TOKEN_2022_PROGRAM_ID),
                createInitializeMintInstruction(mintKeyPair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID), 
                createInitializeInstruction({
                    programId: TOKEN_2022_PROGRAM_ID, 
                    mint: mintKeyPair.publicKey, 
                    metadata: mintKeyPair.publicKey, 
                    name: metadata.name, 
                    symbol: metadata.symbol, 
                    uri: metadata.uri, 
                    mintAuthority: wallet.publicKey, 
                    updateAuthority: wallet.publicKey 
                })
            );

            transaction.feePayer = wallet.publicKey; 
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            transaction.partialSign(mintKeyPair); 

            await wallet.sendTransaction(transaction, connection);
            setMessage("Token created successfully!");
            setMintAddress(mintKeyPair.publicKey.toBase58());
        } catch (error) {
            setMessage("Failed to create token. Please try again.");
            console.error(error);
        } finally {
            setIsCreating(false);
        }
    }

    if(!wallet.connected){
        return (
            <div className="flex items-center justify-center min-h-[60vh] px-4">
                <div className="card max-w-md w-full text-center animate-fade-in">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Connect Your Wallet
                    </h2>
                    <p className="text-gray-400 mb-6">
                        To create and manage tokens on Solana, please connect your wallet using the button in the navigation bar.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <span className={`inline-block w-2 h-2 rounded-full ${network === 'devnet' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                        <span>Connected to {network.charAt(0).toUpperCase() + network.slice(1)}</span>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">
                    Token Launchpad
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Create and deploy your SPL token on Solana. Fill out the form below to get started.
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4">
                    <span className={`inline-block w-3 h-3 rounded-full ${network === 'devnet' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                    <span className="text-sm text-gray-400">
                        Currently on {network.charAt(0).toUpperCase() + network.slice(1)}
                        {isMainnet && " (Real SOL will be used)"}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Token Creation Form */}
                <div className="card">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">1</span>
                        </div>
                        Create Token
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Token Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="input"
                                required
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g., My Awesome Token"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Token Symbol *
                            </label>
                            <input
                                type="text"
                                name="symbol"
                                className="input"
                                required
                                value={form.symbol}
                                onChange={handleChange}
                                placeholder="e.g., MAT"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                className="input min-h-[100px] resize-y"
                                rows={4}
                                required
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe your token and its purpose..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Image URL *
                            </label>
                            <input
                                type="url"
                                name="imageUrl"
                                className="input"
                                required
                                value={form.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/token-image.png"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isCreating}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isCreating ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Token...
                                </>
                            ) : (
                                "Create Token"
                            )}
                        </button>
                    </form>
                </div>

                {/* Token Minting Form */}
                <div className="card">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">2</span>
                        </div>
                        Mint Tokens
                    </h2>

                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const recipient = formData.get("recipient") as string;
                            const mintPubkey = formData.get("mintPubkey") as string;
                            const amount = Number(formData.get("Amount") as string);

                            if (!recipient || !mintPubkey || !amount) {
                                setMessage("Please fill in all minting fields.");
                                return;
                            }

                            await handleTokenMinting(recipient, mintPubkey, amount);
                        }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Recipient Wallet Address *
                            </label>
                            <input
                                type="text"
                                name="recipient"
                                className="input"
                                required
                                defaultValue={wallet.publicKey?.toBase58() || ""}
                                placeholder="Enter recipient wallet address"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Mint Account Address *
                            </label>
                            <input
                                type="text"
                                name="mintPubkey"
                                className="input"
                                required
                                defaultValue={mintAddress || ""}
                                placeholder="Enter your mint address"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Amount *
                            </label>
                            <input
                                type="number"
                                name="Amount"
                                className="input"
                                required
                                defaultValue={100}
                                min="0.000000001"
                                step="0.000000001"
                                placeholder="Enter amount to mint"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isMinting}
                            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                        >
                            {isMinting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Minting Tokens...
                                </>
                            ) : (
                                "Mint Tokens"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Mint Address Display */}
            {mintAddress && (
                <div className="card mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                🎉 Token Created Successfully!
                            </h3>
                            <p className="text-sm text-gray-400 mb-2">Mint Address:</p>
                            <p className="text-blue-400 font-mono break-all">{mintAddress}</p>
                        </div>
                        <button
                            onClick={() => navigator.clipboard.writeText(mintAddress)}
                            className="btn-secondary flex-shrink-0 ml-4"
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}

            {/* Success/Error Messages */}
            {message && (
                <div className="fixed top-20 right-4 z-50 max-w-sm">
                    <div className={`rounded-lg p-4 shadow-lg border animate-fade-in ${
                        message.includes('successfully') || message.includes('Successfully')
                            ? 'bg-green-900/90 border-green-500 text-green-100'
                            : 'bg-red-900/90 border-red-500 text-red-100'
                    }`}>
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                {message.includes('successfully') || message.includes('Successfully') ? (
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium">{message}</p>
                            </div>
                            <button
                                onClick={() => setMessage("")}
                                className="ml-4 inline-flex text-gray-400 hover:text-gray-200"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
