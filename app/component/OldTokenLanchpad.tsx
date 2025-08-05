'use client'
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react";
import axios from "axios";
import { Keypair, SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createInitializeMetadataPointerInstruction, createInitializeMintInstruction, ExtensionType, getMintLen, getAssociatedTokenAddressSync, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE, createAssociatedTokenAccountInstruction, createMintToInstruction } from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";

export function LanchPad(){
    const wallet = useWallet();
    const {connection} = useConnection();
    const [form, setForm] = useState({
        name: "",
        symbol: "",
        description: "",
        imageUrl: ""
    });
    const [message, setMessage] = useState("");
    const [mintaddress, setMintAdress] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleTokenMinting(recipient: string, mintPubkey: string, amount: number) {
        // Convert recipient and mintPubkey from string to PublicKey
        try {
            const recipientPubkey = new PublicKey(recipient);
            const mintPubkeyObj = new PublicKey(mintPubkey);

            // You can now use recipientPubkey and mintPubkeyObj as PublicKey instances
            // Add your minting logic here

            console.log("Recipient Pubkey:", recipientPubkey.toBase58());
            console.log("Mint Pubkey:", mintPubkeyObj.toBase58());
            

            if(!wallet.publicKey){
                setMessage("first connect wallet");
                return;
            }

            // For standard wallets, allowOwnerOffCurve should be false
            const associatedToken = getAssociatedTokenAddressSync(
                mintPubkeyObj,
                recipientPubkey,
                false, // allowOwnerOffCurve is false for standard wallets
                TOKEN_2022_PROGRAM_ID
            );
            
            console.log(`Asssociated Token: ${associatedToken.toBase58()}`);

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
                    associatedToken, // destination if the associated token account  
                    recipientPubkey, 
                    amount * LAMPORTS_PER_SOL, 
                    [], 
                    TOKEN_2022_PROGRAM_ID
                )
            )

            await wallet.sendTransaction(transaction, connection);

            setMessage(`${amount} TOKEN minted successfully!!`)
        } catch (error) {
            setMessage("Invalid recipient or mint address.");
            console.log(error);
        }
    }
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!wallet.publicKey) {
            alert("Wallet not connected!");
            return;
        }

        const response = await axios.post("https://metadata-off-chain.vercel.app/metadata", {
            name: form.name, 
            symbol: form.symbol, 
            description: form.description, 
            image: form.imageUrl
        })

        // Get the metadata URL from the response
        const metadataUrl = (response.data as { metadataurl: string }).metadataurl;
        
        // create mint account address for the user who is creating token
        const mintKeyPair = Keypair.generate();
        const metadata = {
            mint : mintKeyPair.publicKey, 
            name: form.name, 
            symbol: form.symbol, 
            uri: metadataUrl, // Use the metadataUrl directly from the response
            additionalMetadata: []
        }



        console.log("MetaData: ", metadata)

        const mintLen = getMintLen([ExtensionType.MetadataPointer]); 
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

        const transaction = new Transaction().add(
            
            // create mint account first
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
        )

        transaction.feePayer = wallet.publicKey; 
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        transaction.partialSign(mintKeyPair); 

        await wallet.sendTransaction(transaction, connection);
        // now token has been created successfully 
        setMessage("Token Created Successfully!!");
        setMintAdress(mintKeyPair.publicKey.toBase58());

    }




    if(!wallet.connected){
        return (
            <div className="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg mx-auto my-8 w-full max-w-lg border border-blue-200">
            <svg className="w-14 h-14 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1m-4 4h8m0 0l-2.5-2.5M21 12l-2.5 2.5" />
            </svg>
            <span className="text-xl font-bold text-blue-700 mb-2">
                Connect Your Wallet
            </span>
            <span className="text-base text-gray-600 text-center max-w-xs">
                To access the LaunchPad and create your token, please connect your Solana wallet.
            </span>
            </div>
        );
    }
    // Use React state to manage form values

    
    return (
        <div className="flex flex-col items-center justify-center w-full p-8 ">
            <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
            <label className="flex flex-col">
                <span className="mb-1 font-semibold">Name</span>
                <input
                type="text"
                name="name"
                className="border rounded px-3 py-2"
                required
                value={form.name}
                onChange={handleChange}
                />
            </label>
            <label className="flex flex-col">
                <span className="mb-1 font-semibold">Symbol</span>
                <input
                type="text"
                name="symbol"
                className="border rounded px-3 py-2"
                required
                value={form.symbol}
                onChange={handleChange}
                />
            </label>
            <label className="flex flex-col">
                <span className="mb-1 font-semibold">Description</span>
                <textarea
                name="description"
                className="border rounded px-3 py-2"
                rows={3}
                required
                value={form.description}
                onChange={handleChange}
                />
            </label>
            <label className="flex flex-col">
                <span className="mb-1 font-semibold">Image URL</span>
                <input
                type="url"
                name="imageUrl"
                className="border rounded px-3 py-2"
                required
                value={form.imageUrl}
                onChange={handleChange}
                />
            </label>
            <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700"
            >
                Submit
            </button>
            </form>


            <div className="flex flex-col gap-4 w-full max-w-md mt-8 border-t pt-8">
                <h2 className="text-lg font-bold mb-2">Mint Tokens</h2>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const recipient = formData.get("recipient") as string;
                        const mintPubkey = formData.get("mintPubkey") as string;
                        const amount = Number(formData.get("Amount") as string);

                        if (!recipient || !mintPubkey) {
                            setMessage("Please provide both recipient and mint address.");
                            return;
                        }

                        // Implement mint logic here
                        handleTokenMinting(recipient, mintPubkey, amount);
                    }}
                >
                    <label className="flex flex-col">
                        <span className="mb-1 font-semibold">Recipient Wallet Address</span>
                        <input
                            type="text"
                            name="recipient"
                            className="border rounded px-3 py-2"
                            required
                            defaultValue={wallet.publicKey?.toBase58() || ""}
                            placeholder="Enter recipient wallet address"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 font-semibold">Mint Account Address</span>
                        <input
                            type="text"
                            name="mintPubkey"
                            className="border rounded px-3 py-2"
                            required
                            defaultValue={mintaddress || ""}
                            placeholder={
                                mintaddress
                                    ? ""
                                    : "Enter your mint address"
                            }
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 font-semibold">Amount</span>
                        <input
                            type="number"
                            name="Amount"
                            className="border rounded px-3 py-2"
                            required
                            defaultValue={2}
                            placeholder={"Enter Amount.. Default 2.0 TOKEN"}
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-green-600 text-white rounded px-4 py-2 font-semibold hover:bg-green-700"
                    >
                        Mint Token
                    </button>
                </form>
            </div>


            {mintaddress && (
                <div className="fixed bottom-0 left-0 w-full bg-blue-700 text-white py-3 px-6 flex items-center justify-center z-40 shadow-lg">
                    <span className="font-semibold mr-2">Mint Address:</span>
                    <span className="truncate">{mintaddress}</span>
                </div>
            )}
            {message && (
            <div className="fixed top-6 right-6 z-50">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-fade-in">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{message}</span>
                </div>
            </div>
            )}
        </div>
    );
}