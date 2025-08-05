
'use client';

import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import '@solana/wallet-adapter-react-ui/styles.css';

export function NavBar(){
    return <div className=" flex justify-between w-full p-8">
        <WalletMultiButton/>
        <WalletDisconnectButton/> 
    </div>
}