import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { Feature } from "~~/components/home/Feature";
import Disaster from "./disasters";

const Home: NextPage = () => {
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

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Send a donation
                <br />
                <Link href="/donation" passHref className="link">
                  Donate
                </Link>
              </p>
            </div>

            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Monthly Subscription
                <br />
                <Link href="/monthly-subscription" passHref className="link">
                  Create Subscription
                </Link>
              </p>
            </div>
          </div>
        </div>

        <Disaster />

        <Feature />

      </div>
    </>
  );
};

export default Home;
