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
        merchantId: process.env.NEXT_PUBLIC_GATEFI_PARTNER_ID, // "9e34f479-b43a-4372-8bdf-90689e16cd5b",
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
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Safety First</span>
          </h1>
          <p className="text-center text-lg">Provide funds for those in need.</p>
          <p className="text-center text-lg">
            Help people by providing funds to them when an natural disaster has occurred.
          </p>
        </div>

        <div>
          <div
            style={{
              position: "relative",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div id="embed-button"></div>
            {(
              <button
                style={{
                  position: "absolute",
                  right: "113px",
                  transform: "none",
                  top: "10px",
                  background: "rgba(0, 0, 0, 0.7)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 15px",
                  cursor: "pointer",
                  zIndex: 2000, // ensure it's above the embedded widget
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Donation;
