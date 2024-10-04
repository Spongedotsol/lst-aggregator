// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="https://nextjs.org/icons/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="https://nextjs.org/icons/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, Wallet, BarChart3, Twitter } from "lucide-react"

const SpongeBubble = ({ color, size, top, left }) => (
  <div
    className={`absolute rounded-full ${size} ${color} opacity-30 animate-float`}
    style={{ top: `${top}%`, left: `${left}%` }}
  />
)

export default function DAppInterface() {
  const [swapAmount, setSwapAmount] = useState("")
  const [stakeAmount, setStakeAmount] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 p-4 relative overflow-hidden flex flex-col">
      {/* Sponge-like background */}
      <div className="absolute inset-0 overflow-hidden">
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
            <img src="/placeholder.svg?height=32&width=32" alt="Sponge Logo" className="w-8 h-8" />
            <span className="text-white text-xl font-bold">Sponge</span>
          </div>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900">
            Connect Wallet
          </Button>
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
              <CardHeader>
                <CardTitle>Swap Tokens</CardTitle>
                <CardDescription className="text-gray-300">Exchange your tokens instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token-from" className="text-white">From</Label>
                    <Select>
                      <SelectTrigger id="token-from" className="bg-gray-700 bg-opacity-50 border-none text-white">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 text-white">
                        <SelectItem value="eth">ETH</SelectItem>
                        <SelectItem value="usdc">USDC</SelectItem>
                        <SelectItem value="dai">DAI</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="amount-from"
                      placeholder="0.0"
                      type="number"
                      value={swapAmount}
                      onChange={(e) => setSwapAmount(e.target.value)}
                      className="bg-gray-700 bg-opacity-50 border-none text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="token-to" className="text-white">To</Label>
                    <Select>
                      <SelectTrigger id="token-to" className="bg-gray-700 bg-opacity-50 border-none text-white">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 text-white">
                        <SelectItem value="eth">ETH</SelectItem>
                        <SelectItem value="usdc">USDC</SelectItem>
                        <SelectItem value="dai">DAI</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input id="amount-to" placeholder="0.0" type="number" disabled className="bg-gray-700 bg-opacity-50 border-none text-white placeholder-gray-400" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Swap</Button>
              </CardFooter>
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
      <footer className="mt-8 bg-gray-800 bg-opacity-50 p-4 rounded-lg text-white">
        <div className="container mx-auto max-w-4xl flex justify-between items-center">
          <div>© Sponge 2024</div>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (formerly Twitter)">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </div>
  )
}