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

      <div className="presentation-background">
        <div className="presentation_gradient_colors">
          <div className="presentation-content-layer container mx-auto max-height relative">
            <section className="presentation-content">
              <article>
                <h1 className="landing-title">
                  <img src="/logo.png" alt="logo" />
                  Safety<br />
                  <span className="shift-name">First</span>
                </h1>
                <p className="pt-5 text-4xl font-bold dark:text-white">Help people victims from natural disasters</p>

                <div
                  className="inline-block mt-5 white-button focus:!bg-secondary active:!text-neutral max-w-sm shadow-lg rounded-xl">
                  <div className="py-3 pl-5 pr-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <Link href="/donation" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
                    Contribute / Donate
                  </Link>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>

      <Disaster />

      <Feature />



      <div className="flex items-center flex-col flex-grow">

        <div className="flex-grow bg-base-300 w-full pb-12 pt-12 px-8 py-12">

        <h1 className="text-center mb-12">
          <span className="block text-4xl font-bold">See other features</span>
        </h1>

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


            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Real-Time Alerting System
                <br />
                <Link href="/waku" passHref className="link">
                  Alert
                </Link>
              </p>
            </div>


          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
