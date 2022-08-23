import ReactXnft, { Text, View, Button, usePublicKey, useConnection } from "react-xnft";
import { Transaction, PublicKey, SystemProgram } from "@solana/web3.js";
import React from "react";

//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  // no-op
});

export function App() {

  const publicKey = usePublicKey();
  const connection = useConnection();

  const sign = async () => {
    const tx = new Transaction();
    const transferIx = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: publicKey,
      lamports: 0.1 * 1_000_000_000,
    });
    tx.add(transferIx);
    const blockhash = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash.blockhash;
    tx.feePayer = publicKey;

    //
    // The following produces "Cannot read properties of undefined (reading 'toString')" error
    //
    const transaction: Transaction = await window.xnft.signTransaction(tx);
    console.log(transaction);

    //
    // The following works fine
    //
    // const signature = await window.xnft.send(tx);
    // console.log("tx signature", signature);

  }

  return (
    <View>
      <Text>Hello, World!</Text>
      <Button onClick={() => { sign() }}>Sign</Button>
    </View>
  );
}
