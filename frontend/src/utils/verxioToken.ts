import {
    clusterApiUrl,
    sendAndConfirmTransaction,
    Connection,
    Keypair,
    SystemProgram,
    Transaction,

} from '@solana/web3.js';
import {
    ExtensionType,
    TOKEN_2022_PROGRAM_ID,
    createInitializeMintInstruction,
    createInitializeMetadataPointerInstruction,
    createInitializeInterestBearingMintInstruction,
    createInitializeNonTransferableMintInstruction,
    getMintLen,
    LENGTH_SIZE,
    TYPE_SIZE,
} from '@solana/spl-token';
import { createInitializeInstruction, pack, TokenMetadata } from '@solana/spl-token-metadata';
import bs58 from 'bs58';


(async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const secretKey = bs58.decode("4xRBSuyXwbKK7jwF1hV156L1AzH4h6n2sKsYhABTpKwdaKDqCg785XFreUmGtDfRG53SnRw9KtcFnf22doSTFqRt");
    const payer = Keypair.fromSecretKey(secretKey);

    const decimals = 9;
    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;
    const mintLen = getMintLen([ExtensionType.NonTransferable, ExtensionType.MetadataPointer]);
    
    const metadata: TokenMetadata = {
        mint: mint,
        name: 'Verxio sToken',
        symbol: 'sVERXIO',
        uri: 'https://raw.githubusercontent.com/Axio-Lab/hublab/dev/frontend/frontend/src/assets/verxiobg.png',
        additionalMetadata: [['new-field', 'new-value']],
      };

    const rate = 10;
    
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: mint,
            space: mintLen,
            lamports,
            programId: TOKEN_2022_PROGRAM_ID,
        }),
        
        createInitializeMetadataPointerInstruction(mint, payer.publicKey, mint, TOKEN_2022_PROGRAM_ID),
        createInitializeNonTransferableMintInstruction(mint, TOKEN_2022_PROGRAM_ID),
        createInitializeInterestBearingMintInstruction(mint, payer.publicKey, rate, TOKEN_2022_PROGRAM_ID),        // 
        createInitializeMintInstruction(mint, decimals, payer.publicKey, null, TOKEN_2022_PROGRAM_ID),
        createInitializeInstruction({
            programId: TOKEN_2022_PROGRAM_ID,
            mint: mint,
            metadata: mint,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mintAuthority: payer.publicKey,
            updateAuthority: payer.publicKey,
          }),
    );

    const transactionSignature  = await sendAndConfirmTransaction(connection, transaction, [payer, mintKeypair], undefined);
    console.log(
        "\nCreate Mint Account:",
        `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`,
      )

})();