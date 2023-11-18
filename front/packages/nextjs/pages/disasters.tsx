import React, { useEffect, useState } from 'react'
import type { NextPage } from "next";
import { ISuccessResult, IDKitWidget } from '@worldcoin/idkit'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { BigNumber, ethers } from 'ethers'

import { getDisastersDocument, getDisastersQuery, execute } from '../.graphclient'

const Disaster: NextPage = () => {
  const { address } = useAccount();
  const [proof, setProof] = useState<ISuccessResult | null>(null);
  const [disasterId, setDisasterId] = useState<string | null>(null);
  const [selectedDisasterItem, setSelectedDisasterItem] = useState<string | null>(null);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);


  const { config: claimConfig } = usePrepareContractWrite({
    address: "0x91Da357C8dEF04Fbd57d506C18421F560B3D41Ba",
    abi: [{
      inputs: [],
      name: 'InvalidNullifier',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'signal',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'root',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'nullifierHash',
          type: 'uint256',
        },
        {
          internalType: 'uint256[8]',
          name: 'proof',
          type: 'uint256[8]',
        },
        {
          internalType: "string",
          name: "_actionId",
          type: "string"
        },
      ],
      name: 'verifyAndExecute',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    }],
    enabled: proof != null && address != null && disasterId != null,
    functionName: 'verifyAndExecute',
    args: [
      address!,
      proof?.merkle_root,
      proof?.nullifier_hash,
      proof?.proof ? ethers.utils.defaultAbiCoder.decode(['uint256[8]'], proof.proof)[0] : Array(8).fill(BigNumber.from(0)),
      disasterId,
    ],
  })

  const { data: res, write: claimFunction } = useContractWrite(claimConfig)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: res?.hash,
  })

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [data, setData] = React.useState<getDisastersQuery>()

  // const handleVerify = (disasterId, open) => {
  //   console.log("DIS:", disasterId);
  //   setDisasterId("disaster-".concat(disasterId)); // Set the disasterId when a user interacts with an item
  //   open(); // Open the World ID widget
  // };

  const handleVerify = (disasterItem, open) => {
    const uniqueActionId = "disaster-" + disasterItem.disasterId; // Generate a unique action ID
    setDisasterId(uniqueActionId); // Update the state with the new action ID
    setSelectedDisasterItem(disasterItem.disasterId);
    open(); // Open the World ID widget
  };

  useEffect(() => {
    execute(getDisastersDocument, {}).then((result) => {
      setData(result?.data);
      console.log(result?.data);
    })
  }, [setData]);

  return (
    <>
      {domLoaded && (
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Current Natural Disasters</span>
          </h1>

          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">

            {data && data.disasterRegistereds.map((item, index) => {
              return (

                <div key={index}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img className="rounded-t-lg" src={`/images/image_${index + 1}.jpg`} />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{capitalizeFirstLetter(item.disaster_category)} - {item.disaster_location}</h5>
                    </a>
                    {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}

                    <div className="flex mt-4 md:mt-6">
                      <a href={item.disaster_evidence} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        More info
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                      </a>

                      {address ? (
                        proof && selectedDisasterItem === item.disasterId ? (
                          <button disabled={isLoading} onClick={claimFunction}>Submit TX</button>
                        ) : (
                          <IDKitWidget
                          key={item.disasterId}
                          app_id="app_ca49010ff2c9b0c665b5c9c7f1b4e303"
                          action={disasterId}
                          signal={address}
                          onSuccess={setProof}
                        >
                          {({ open }) => <button onClick={() => handleVerify(item, open)}>Verify with World ID {"disaster-".concat(item.disasterId)}</button>}
                        </IDKitWidget>
                        )
                      ) : (
                        <p>Connect your wallet to claim</p>
                      )}
                      {isSuccess && (
                        <div>
                          Successfully claimed your tokens!
                          <div>
                            <a href={`https://optimistic.etherscan.io/tx/${res?.hash}`}>Explorer</a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>

  );
};

export default Disaster;
