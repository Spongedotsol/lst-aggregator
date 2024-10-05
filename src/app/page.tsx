"use client";

import { useEffect } from "react";
import { init,  } from "@jup-ag/terminal";
import "@jup-ag/terminal/css";
import { useWallet } from "@solana/wallet-adapter-react";
import { UnifiedWalletButton, UnifiedWalletProvider } from '@jup-ag/wallet-adapter';
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, Wallet, BarChart3, Twitter } from "lucide-react"
import JupiterClient from './JupiterClient';
import Image from 'next/image';
import Head from "next/head";

import icon from './icon.png';

const SpongeBubble = ({ color, size, top, left }) => (
  <div
    className={`absolute rounded-full ${size} ${color} opacity-30 animate-float`}
    style={{ top: `${top}%`, left: `${left}%` }}
  />
)

export default function DAppInterface() {
  const [stakeAmount, setStakeAmount] = useState("")

  const walletProps = useWallet();
  const endpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com";

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Initializing Jupiter Terminal...");

      init({
        displayMode: "integrated",
        integratedTargetId: "jupiter-terminal",
        endpoint: endpoint,
      });
    }
  }, [walletProps]);

  return (
    <UnifiedWalletProvider
      wallets={[]}
      config={{
        autoConnect: false,
        env: 'mainnet-beta',
        metadata: {
          name: 'UnifiedWallet',
          description: 'UnifiedWallet',
          url: 'https://jup.ag',
          iconUrls: ['https://jup.ag/favicon.ico'],
        },
        walletlistExplanation: {
          href: 'https://station.jup.ag/docs/additional-topics/wallet-list',
        },
      }}
    >
      <Head>
        <title>New Title Here</title>
        <link rel="icon" href="/app/icon.png" />
      </Head>
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
          {/* Navbar */}
          <div className="flex items-center justify-between mb-8 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Image src={icon} alt="Sponge Logo" className="w-16 h-16" width={50} height={50} />
              <span className="text-white text-xl font-bold">Sponge</span>
            </div>
            <UnifiedWalletButton />
          </div>

          <Tabs defaultValue="swap" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="swap" className="bg-gray-800 bg-opacity-50 text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Swap
              </TabsTrigger>
              <TabsTrigger value="stake" className="bg-gray-800 bg-opacity-50 text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
                <Wallet className="mr-2 h-4 w-4" />
                Stake
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="bg-gray-800 bg-opacity-50 text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
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
                  <CardTitle>Stake Tokens</CardTitle>
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
                          <SelectItem value="eth">ETH</SelectItem>
                          <SelectItem value="usdc">USDC</SelectItem>
                          <SelectItem value="dai">DAI</SelectItem>
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
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Stake</Button>
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
                            <span>ETH</span>
                            <span>0.5 ETH</span>
                          </div>
                          <div className="flex justify-between">
                            <span>USDC</span>
                            <span>500 USDC</span>
                          </div>
                          <div className="flex justify-between">
                            <span>DAI</span>
                            <span>200 DAI</span>
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
        </div>

        {/* Footer */}
        <footer className="mt-8 bg-gray-800 bg-opacity-50 p-4 rounded-lg text-white z-10">
          <div className="container mx-auto max-w-4xl flex justify-between items-center">
            <div>© Sponge 2024</div>
            <a href="https://x.com/spongedotsol" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (formerly Twitter)">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </footer>
      </div>
    </UnifiedWalletProvider>
  )
}
