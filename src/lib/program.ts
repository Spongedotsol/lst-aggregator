/* eslint-disable @typescript-eslint/no-explicit-any */
import * as anchor from "@coral-xyz/anchor";

import { Program, BN, AnchorProvider } from "@coral-xyz/anchor";
import {
  PublicKey,
  LAMPORTS_PER_SOL,
  Connection,
  Transaction,
} from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Vault, IDL } from "@/program/vault";

const authorityPublicKey = "spngKTnGPcTAauuFR7mEzYBXhCbsAsWdTUghLra91B4";

export const getProgram = (connection: Connection, wallet: AnchorWallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  anchor.setProvider(provider);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const program: Program<Vault> = new Program(IDL as any, "HoU7uBBQf1eqX2StdnCdgA7wuDZB3kyxU1EgpZ6aqPKF", provider);

  return { program, provider: provider };
};

export const getVault = async (connection: Connection, wallet: AnchorWallet) => {
  const { program, provider } = getProgram(connection, wallet);

  const publicKey = new PublicKey(authorityPublicKey);
  const publicKeyBytes = publicKey.toBytes();

  const vaultStatePDA = PublicKey.findProgramAddressSync(
    [Buffer.from("vault_state"), publicKeyBytes],
    program.programId
  )[0];

  const vaultPDA = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), vaultStatePDA.toBytes()],
    program.programId
  )[0];

  const userStatePDA = PublicKey.findProgramAddressSync(
    [Buffer.from("user_state"), provider.wallet.publicKey.toBytes()],
    program.programId
  )[0];

  return { vaultStatePDA, vaultPDA, userStatePDA };
};

export const stake = async (connection: Connection, wallet: AnchorWallet, amount: number): Promise<Transaction> => {
    const { program, provider } = getProgram(connection, wallet);
    const { vaultStatePDA, vaultPDA, userStatePDA } = await getVault(connection, wallet);
    
    return await program.methods
      .stake(new BN(amount * LAMPORTS_PER_SOL))
      .accounts({
        vaultState: vaultStatePDA,
        vault: vaultPDA,
        userState: userStatePDA,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .transaction();
}

export const unstake = async (connection: Connection, wallet: AnchorWallet, amount: number) => {
    const { program, provider } = getProgram(connection, wallet);
    const { vaultStatePDA, vaultPDA, userStatePDA } = await getVault(connection, wallet);
    
    return await program.methods
      .unstake(new BN(amount*LAMPORTS_PER_SOL)) // 0.001 SOL
      .accounts({
        vaultState: vaultStatePDA,
        vault: vaultPDA as any,
        userState: userStatePDA,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .transaction();
}