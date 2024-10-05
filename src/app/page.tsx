"use client";

import { useEffect } from "react";
import { init,  } from "@jup-ag/terminal";
import "@jup-ag/terminal/css";
import { useWallet } from "@solana/wallet-adapter-react";
import { UnifiedWalletButton, UnifiedWalletProvider } from '@jup-ag/wallet-adapter';

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
      <UnifiedWalletButton />
      <div className="min-h-screen p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Jupiter Swap</h1>
        <div id="jupiter-terminal" className="w-full h-[600px] mt-6" />
      </div>
    </UnifiedWalletProvider>
  );
}
