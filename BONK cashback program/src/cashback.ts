import {
  Keypair,
  Transaction,
  PublicKey,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import {
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress,
  createTransferCheckedInstruction,
} from "@solana/spl-token";
import base58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

export const cashback = async (walletAddress: string, spentAmount: number) => {

  const tokenAddress = new PublicKey(
    "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" // $BONK mintAddress (airdrop token)
  );
  const tokenDecimal = 9; // $BONK decimal 
  const cashback = 100; // amount of $BONK to airdrop for every 1$ spent

  const connection = new anchor.web3.Connection(
    "https://mainnet.helius-rpc.com/?api-key=d7aa98e6-4f1e-420d-be26-231d5a586b93" 
  ); 
  const payer = Keypair.fromSecretKey(
    base58.decode(process.env.SOLANA_PRIVATE_KEY!)
  );
  const transaction = new Transaction();
  const cashbackDecimal = cashback * Math.pow(10, tokenDecimal);
  const amount = Math.round(Number(spentAmount * cashbackDecimal));
  const payerAddress = payer.publicKey;
  const receiverAddress = new PublicKey(walletAddress);

  const receiverAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    tokenAddress,
    receiverAddress
  );

  const payerAccount = await getAssociatedTokenAddress(
    tokenAddress,
    payerAddress
  );

  const transferInstruction = createTransferCheckedInstruction(
    payerAccount, // source account
    tokenAddress, // token address
    receiverAccount.address, // destination account
    payerAddress, // owner of source account
    amount, // amount to transfer
    tokenDecimal // decimals of the token
  );

  transaction.instructions.push(transferInstruction);

  const tx = await sendAndConfirmTransaction(connection, transaction, [payer], {
    commitment: "confirmed",
  });
  console.log("Cashback successful, signature:", `https://solscan.io/tx/${tx}`);

  return;
};
