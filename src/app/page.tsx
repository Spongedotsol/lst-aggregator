"use client";

import { useEffect } from "react";
import { init } from "@jup-ag/terminal";
import "@jup-ag/terminal/css";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
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
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Jupiter Swap</h1>
      <div id="jupiter-terminal" className="w-full h-[600px] mt-6" />
    </div>
  );
}
