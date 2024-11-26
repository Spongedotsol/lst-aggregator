import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Wallet, BarChart3 } from "lucide-react";
import JupiterClient from "./../jupiter/JupiterClient";
import {
  useWallet,
  useAnchorWallet,
  AnchorWallet,
} from "@solana/wallet-adapter-react";
import useSnackbarStore from "@/state/useSnackbarStore";
import { stake } from "@/lib/program";
import { Connection, PublicKey } from "@solana/web3.js";
import useLoadingStore from "@/state/useLoadingStore";
import useNetworkStore from "@/state/useNetworkStore";
interface TabsSectionProps {
  stakeAmount: string;
  setStakeAmount: (amount: string) => void;
  onFaucetClick: () => void;
}

const TabsSection = ({
  stakeAmount,
  setStakeAmount,
  onFaucetClick,
}: TabsSectionProps) => {
  const { showSnackbar } = useSnackbarStore();
  const { sendTransaction } = useWallet();
  const { setLoading } = useLoadingStore();
  const { contractAddress, rpcUrl, idl, authorityPublicKey } = useNetworkStore();
  const wallet = useAnchorWallet();

  return (
    <Tabs defaultValue="swap" className="w-full min-h-[100vh]">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger
          value="swap"
          className="flex items-center justify-center bg-gray-800 bg-opacity-50 text-white"
        >
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Swap
        </TabsTrigger>
        <TabsTrigger
          value="stake"
          className="flex items-center justify-center bg-gray-800 bg-opacity-50 text-white"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Stake
        </TabsTrigger>
        <TabsTrigger
          value="dashboard"
          className="flex items-center justify-center bg-gray-800 bg-opacity-50 text-white"
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Dashboard
        </TabsTrigger>
      </TabsList>

      <TabsContent value="swap">
        <Card className="bg-gray-800 bg-opacity-30 backdrop-blur-lg text-white border-none">
          <CardContent>
            <JupiterClient />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stake">
        <Card className="bg-gray-800 bg-opacity-30 backdrop-blur-lg text-white border-none">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Stake Tokens</CardTitle>
              <Button onClick={onFaucetClick}>Get Faucet</Button>
            </div>
            <CardDescription>
              Earn rewards by staking your tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StakeForm
              stakeAmount={stakeAmount}
              setStakeAmount={setStakeAmount}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
              onClick={async () => {
                setLoading(true);
                if (!wallet) {
                  showSnackbar(`Please connect wallet first!`, "error");
                  setLoading(false);
                  return;
                }
                const connection = new Connection(rpcUrl, "confirmed");
                console.log(contractAddress);
                console.log(rpcUrl);

                const tx = await stake(
                    connection,
                    wallet as AnchorWallet,
                    parseFloat(stakeAmount),
                    idl,
                    contractAddress,
                    new PublicKey(authorityPublicKey)
                );
                await sendTransaction(tx, connection)
                    .then((e: unknown) => {
                        showSnackbar(`your tx hash is ${e}`, "success");
                    })
                    .catch((e: unknown) => {
                        showSnackbar(`${e}`, "error");
                    })
                    .finally(() => {
                        setLoading(false);
                    });
              }}
            >
              Stake
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="dashboard">
        <Card className="bg-gray-800 bg-opacity-30 backdrop-blur-lg text-white border-none">
          <CardHeader>
            <CardTitle>Your Dashboard</CardTitle>
            <CardDescription>
              Overview of your staking and rewards
            </CardDescription>
          </CardHeader>
          <div className="flex min-h-[300px] justify-center items-center">
            <span className="text-3xl text-gray-500">Coming Soon!</span>
          </div>
          {/* <CardContent>
                        <DashboardContent />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Claim Rewards</Button>
                    </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const StakeForm = ({
  stakeAmount,
  setStakeAmount,
}: {
  stakeAmount: string;
  setStakeAmount: (amount: string) => void;
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="stake-token" className="text-white">
        SOL
      </Label>
      {/* <Select>
                <SelectTrigger id="stake-token" className="bg-gray-700 bg-opacity-50 border-none text-white">
                    <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-white">
                    <SelectItem value="sol">SOL</SelectItem>
                </SelectContent>
            </Select> */}
    </div>
    <div className="space-y-2">
      <Label htmlFor="stake-amount" className="text-white">
        Amount to Stake
      </Label>
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
      <p className="text-2xl font-bold text-purple-300">8%</p>
    </div>
  </div>
);

// const DashboardContent = () => (
//     <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//             <CardContentItem title="Total Staked" value="$1,234.56" />
//             <CardContentItem title="Total Rewards" value="$98.76" />
//         </div>
//         <CardContentItem title="Staked Assets" value="10 SOL" />
//     </div>
// );

// const CardContentItem = ({ title, value }: { title: string, value: string }) => (
//     <Card className="bg-gray-700 bg-opacity-50 border-none">
//         <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         </CardHeader>
//         <CardContent>
//             <p className="text-2xl font-bold text-purple-300">{value}</p>
//         </CardContent>
//     </Card>
// );

export default TabsSection;
