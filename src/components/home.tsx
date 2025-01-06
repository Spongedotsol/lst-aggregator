/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useMemo } from "react";
import { SessionProvider } from "next-auth/react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import "@jup-ag/terminal/css";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"; // 加入 Backpack 錢包
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import type { AppProps } from "next/app";
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
import LoadingSpinner from './ui/LoadingSpinner';
import useLoadingStore from "@/state/useLoadingStore";
import Layout from "../components/ui/layout";

function HomePage({ pageProps }: AppProps) {

    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new BackpackWalletAdapter(),
            new MagicEdenWalletAdapter(),
        ],
        []
    );

    return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <SessionProvider session={pageProps?.session} refetchInterval={0}>
            <UnifiedWalletProvider
                wallets={wallets}
                config={{
                autoConnect: true,
                env: "devnet",
                metadata: {
                    name: "UnifiedWallet",
                    description: "UnifiedWallet",
                    url: "https://jup.ag",
                    iconUrls: ["https://jup.ag/favicon.ico"],
                },
                walletlistExplanation: {
                    href:
                    "https://station.jup.ag/docs/additional-topics/wallet-list",
                },
                theme: "dark",
                }}
            >
                <HomeApp />
            </UnifiedWalletProvider>
            </SessionProvider>
        </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
    );
}


const HomeApp = () => {
    const [stakeAmount, setStakeAmount] = useState("");
    const { showSnackbar } = useSnackbarStore();
    const { isLoading, setLoading } = useLoadingStore();
    
    const wallet = useWallet();

    const handleFaucetClick = async () => {
        setLoading(true);
        const amount = 1;
        const publicKey = wallet.publicKey;

        if (!publicKey) {
            showSnackbar(`Please connect wallet first!`, "error");
            setLoading(false);
            return;
        }

        const connection = new Connection("https://niki-c1qc77-fast-devnet.helius-rpc.com", "confirmed");

        try {
            await connection.requestAirdrop(publicKey as PublicKey, amount * LAMPORTS_PER_SOL);
            showSnackbar(`Success! You received 1 SOL. Please open your wallet on devnet to check.`, "success");
        } catch (e: any) {
            showSnackbar(`${e}`, "error");
        } finally {
            setLoading(false); // Set loading to false after operation
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 p-4 relative overflow-hidden flex flex-col">

            <SpongeBackground />
            {isLoading && <LoadingSpinner />}
            <Layout>
            <div className="container mx-auto p-4 max-w-4xl relative z-10 flex-grow">
                <Navbar />
                <TabsSection stakeAmount={stakeAmount} setStakeAmount={setStakeAmount} onFaucetClick={handleFaucetClick} />
                <Footer />
                <SimpleSnackbar />
            </div>
            </Layout>
        </div>
    )
}

export default HomePage;