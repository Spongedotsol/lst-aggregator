"use client"; 

import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import "@jup-ag/terminal/css";

export default function JupiterClient() {
  const wallet = useWallet();
  const endpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com";

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Checking if window.Jupiter is available...");
      if (window.Jupiter) {
        console.log("Jupiter SDK is available, initializing...");
        window.Jupiter.init({
          displayMode: "integrated",
          integratedTargetId: "jupiter-terminal",
          endpoint: endpoint,
          passthroughWalletContextState: wallet,
          enableWalletPassthrough: true,
          formProps: {
            initialOutputMint: "So11111111111111111111111111111111111111112",
            fixedOutputMint: true,
          }
        });
      } else {
        console.error("Jupiter SDK is not loaded on the window.");
      }
    }
  }, [wallet]);

  return <div id="jupiter-terminal" className="w-full h-[600px]" />;
}
