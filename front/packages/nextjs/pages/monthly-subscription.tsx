import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { useState } from "react";


import { AddressInput } from "~~/components/scaffold-eth";
import { IntegerInput } from "~~/components/scaffold-eth";

const MonthlySubscription: NextPage = () => {


  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<string | bigint>("");

  const { config } = usePrepareContractWrite({
    address: '0x0Cb82Eae081FFDcF0D114c1a14FbC42972Cf8139',
    abi: [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "CreatedContract",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "charity_address",
            "type": "address"
          }
        ],
        "name": "createEvent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: 'createEvent',
    args: [amount, address],
  });

  const { write } = useContractWrite(config);

  const createNewSubscription = async function () {
    if (address == "" || amount == "") { return; }
    write?.();
  }

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Create your donation subscription</span>
          </h1>
          <p className="text-center text-lg">Choose your charity fundation, and make periodic donation.</p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">

            <AddressInput onChange={setAddress} value={address} placeholder="Input your address" />

            <IntegerInput
              value={amount}
              onChange={updatedAmount => {
                setAmount(updatedAmount);
              }}
              placeholder="value (wei)"
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => createNewSubscription()}>
              Deploy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthlySubscription;
