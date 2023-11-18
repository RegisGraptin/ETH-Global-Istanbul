import { useEffect, useRef } from "react";
import { GateFiDisplayModeEnum, GateFiSDK } from "@gatefi/js-sdk";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Donation: NextPage = () => {
  const embedInstanceSDK = useRef<GateFiSDK | null>(null);

  useEffect(() => {
    return () => {
      embedInstanceSDK.current?.destroy();
      embedInstanceSDK.current = null;
    };
  }, []);

  const createEmbedSdkInstance = () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const randomString = require("crypto").randomBytes(32).toString("hex");

    if (typeof document !== "undefined") {

      console.log(process.env.NEXT_PUBLIC_GATEFI_PARTNER_ID);

      embedInstanceSDK.current = new GateFiSDK({
        merchantId: process.env.NEXT_PUBLIC_GATEFI_PARTNER_ID || "", // "9e34f479-b43a-4372-8bdf-90689e16cd5b",
        displayMode: GateFiDisplayModeEnum.Embedded,
        nodeSelector: "#embed-button",
        isSandbox: true,
        walletAddress: "0xb43Ae6CC2060e31790d5A7FDAAea828681a9bB4B",
        email: "test@tester.com",
        externalId: randomString,
        defaultFiat: {
          currency: "EUR",
          amount: "50",
        },
        defaultCrypto: {
          currency: "USDT-MATIC",
        },
        fiatCurrencyLock: true,
        cryptoCurrencyLock: true,
        
      });
    }
  };

  useEffect(() => {
    if (!embedInstanceSDK.current) {
      createEmbedSdkInstance();
    }
  });

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="container px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Empower Your Impact with Personalized Giving</span>
          </h1>
          <p className="text-center text-lg">
            Choose your donation amount and direct it to the cause that matters most to you. 
            Our donation page puts the power in your hands, allowing you to support the foundation 
            of your choice with a contribution that reflects your commitment to positive change. 
            Make a difference on your terms – it starts with your choice.
          </p>
        </div>

        <div className="pt-10">
          <div
            style={{
              position: "relative",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div id="embed-button"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donation;
