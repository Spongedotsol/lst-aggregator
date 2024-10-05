import "./globals.css";
import { WalletContextProvider } from "./WalletContextProvider";
import JupiterClient from "./JupiterClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
          {children}
          <JupiterClient /> {/* 加入 Jupiter Terminal */}
        </WalletContextProvider>
      </body>
    </html>
  );
}
