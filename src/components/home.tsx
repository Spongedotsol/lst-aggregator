/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import "@jup-ag/terminal/css";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"; // 加入 Backpack 錢包
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { MagicEdenWalletAdapter } from "@solana/wallet-adapter-magiceden";
import { UnifiedWalletProvider, useWallet } from '@jup-ag/wallet-adapter';
import Navbar from "@/components/ui/navbar";
import SpongeBackground from "@/components/ui/sponge";
import TabsSection from  "@/components/ui/tabsSection";
import Footer from "@/components/ui/footer";
import useSnackbarStore from "@/state/useSnackbarStore";
import SimpleSnackbar from './ui/toast';

function HomePage() {

  return (
    <UnifiedWalletProvider
        wallets={[
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new BackpackWalletAdapter(),
            new MagicEdenWalletAdapter()
        ]}
        config={{
            autoConnect: true,
            env: 'devnet',
            metadata: {
            name: 'UnifiedWallet',
            description: 'UnifiedWallet',
            url: 'https://jup.ag',
            iconUrls: ['https://jup.ag/favicon.ico'],
            },
            walletlistExplanation: {
                href: 'https://station.jup.ag/docs/additional-topics/wallet-list',
            },
            theme: "dark"
        }}
    >
        <HomeApp/>
    </UnifiedWalletProvider>
  );
}

const HomeApp = () => {
    const [stakeAmount, setStakeAmount] = useState("");
    const { showSnackbar } = useSnackbarStore();

    const wallet = useWallet();
    useEffect(() => {
        console.log(wallet);
    }, [wallet]);

    const handleFaucetClick = async () => {
        const amount = 1;
        const publicKey = wallet.publicKey;
        const connection = new Connection("https://devnet.helius-rpc.com/?api-key=51e0da6e-3012-4def-8966-65a5397ff53d", "confirmed");

        try {
            const signature = await connection.requestAirdrop(publicKey as PublicKey, amount * LAMPORTS_PER_SOL);
            showSnackbar(`Success! You received 1 SOL. Please open your wallet on devnet to check.`, "success");
        } catch (e: any) {
            showSnackbar(`${e}`, "error");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 p-4 relative overflow-hidden flex flex-col">

            <SpongeBackground />

            <div className="container mx-auto p-4 max-w-4xl relative z-10 flex-grow">
                <Navbar />
                <TabsSection stakeAmount={stakeAmount} setStakeAmount={setStakeAmount} onFaucetClick={handleFaucetClick} />
                <Footer />
                <SimpleSnackbar />
            </div>
        </div>
    )
}

export default HomePage;