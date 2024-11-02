/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import "@jup-ag/terminal/css";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"; // 加入 Backpack 錢包
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { MagicEdenWalletAdapter } from "@solana/wallet-adapter-magiceden";
import { UnifiedWalletProvider, useWallet } from '@jup-ag/wallet-adapter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Wallet, BarChart3 } from "lucide-react";
import JupiterClient from "./jupiter/JupiterClient";
import useSnackbarStore from "@/state/useSnackbarStore";
import SimpleSnackbar from './ui/toast';

interface SpongeBubbleProps {
  color: string;
  size: string;
  top: number;
  left: number;
}

const SpongeBubble = ({ color, size, top, left }: SpongeBubbleProps) => (
  <div
    className={`absolute rounded-full ${size} ${color} opacity-30 animate-float`}
    style={{ top: `${top}%`, left: `${left}%` }}
  />
);

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 p-4 relative overflow-hidden flex flex-col">
            {/* Sponge-like background */}
            <div className="absolute inset-0 overflow-hidden ">
                <SpongeBubble color="bg-yellow-600" size="w-24 h-24" top={10} left={5} />
                <SpongeBubble color="bg-blue-600" size="w-32 h-32" top={30} left={80} />
                <SpongeBubble color="bg-purple-600" size="w-40 h-40" top={60} left={20} />
                <SpongeBubble color="bg-pink-600" size="w-28 h-28" top={80} left={70} />
                <SpongeBubble color="bg-orange-600" size="w-36 h-36" top={40} left={40} />
            </div>
            <div className="container mx-auto p-4 max-w-4xl relative z-10 flex-grow">
                <Navbar />

                <Tabs defaultValue="swap" className="w-full min-h-[100vh]">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="swap" className="flex items-center justify-center  bg-gray-800 bg-opacity-50 text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
                        <ArrowRightLeft className="mr-2 h-4 w-4" />
                        Swap
                    </TabsTrigger>
                    <TabsTrigger value="stake" className="flex items-center justify-center  bg-gray-800 bg-opacity-50 text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
                        <Wallet className="mr-2 h-4 w-4" />
                        Stake
                    </TabsTrigger>
                    <TabsTrigger value="dashboard" className="flex items-center justify-center bg-gray-800 bg-opacity-50 text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Dashboard
                    </TabsTrigger>
                    </TabsList>
                    <TabsContent value="swap">
                    <Card className="bg-gray-800 bg-opacity-30 backdrop-blur-lg text-white border-none">
                        <CardContent>
                            <JupiterClient/>
                        </CardContent>
                    </Card>
                    </TabsContent>
                    <TabsContent value="stake">
                    <Card className="bg-gray-800 bg-opacity-30 backdrop-blur-lg text-white border-none">
                        <CardHeader>
                            <div className="flex justify-between">

                            <CardTitle className="block">Stake Tokens</CardTitle>
                            <Button onClick={async () => {
                                const amount = 1;
                                const publicKey = wallet.publicKey;
                                const connection = new Connection("https://devnet.helius-rpc.com/?api-key=51e0da6e-3012-4def-8966-65a5397ff53d", "confirmed");

                                try {
                                    const signature = await connection.requestAirdrop(publicKey as PublicKey, amount * LAMPORTS_PER_SOL);
                                    showSnackbar(`Success! you get 1 SOL. Please open your wallet on devnet to check.`, "success");
                                } catch (e: any) {
                                    showSnackbar(`${e}`, "error");
                                }
                            }}>
                                get faucet
                            </Button>
                            <SimpleSnackbar/>
                            </div>
                            <CardDescription className="text-gray-300">Earn rewards by staking your tokens</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                            <Label htmlFor="stake-token" className="text-white">Token to Stake</Label>
                            <Select>
                                <SelectTrigger id="stake-token" className="bg-gray-700 bg-opacity-50 border-none text-white">
                                <SelectValue placeholder="Select token" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-700 text-white">
                                <SelectItem value="sol">SOL</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="stake-amount" className="text-white">Amount to Stake</Label>
                            <Input
                                id="stake-amount"
                                placeholder="0.0"
                                type="number"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                className="bg-gray-700 bg-opacity-50 border-none text-white placeholder-gray-400"
                            />
                            </div>
                            <div className="space-y-2">
                            <Label className="text-white">Estimated APY</Label>
                            <p className="text-2xl font-bold text-purple-300">5.2%</p>
                            </div>
                        </div>
                        </CardContent>
                        <CardFooter>
                        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                            Stake
                        </Button>
                        </CardFooter>
                    </Card>
                    </TabsContent>
                    <TabsContent value="dashboard">
                    <Card className="bg-gray-800 bg-opacity-30 backdrop-blur-lg text-white border-none">
                        <CardHeader>
                        <CardTitle>Your Dashboard</CardTitle>
                        <CardDescription className="text-gray-300">Overview of your staking and rewards</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-gray-700 bg-opacity-50 border-none">
                                <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
                                </CardHeader>
                                <CardContent>
                                <p className="text-2xl font-bold text-purple-300">$1,234.56</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-gray-700 bg-opacity-50 border-none">
                                <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
                                </CardHeader>
                                <CardContent>
                                <p className="text-2xl font-bold text-purple-300">$98.76</p>
                                </CardContent>
                            </Card>
                            </div>
                            <Card className="bg-gray-700 bg-opacity-50 border-none">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Staked Assets</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>SOL</span>
                                    <span>10</span>
                                </div>
                                </div>
                            </CardContent>
                            </Card>
                        </div>
                        </CardContent>
                        <CardFooter>
                        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Claim Rewards</Button>
                        </CardFooter>
                    </Card>
                    </TabsContent>
                </Tabs>
                <Footer />
            </div>
        </div>
    )
}

export default HomePage;