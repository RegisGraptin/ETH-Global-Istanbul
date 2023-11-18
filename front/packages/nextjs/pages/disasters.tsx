import React, { useEffect } from 'react'
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

import { getDisastersDocument, getDisastersQuery, execute } from '../.graphclient'



const Disaster: NextPage = () => {

  const [data, setData] = React.useState<getDisastersQuery>()

  useEffect(() => {
    execute(getDisastersDocument, {}).then((result) => {
      setData(result?.data);
      console.log(result?.data);
    })
  }, [setData])

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Safety First - Current Disasters</span>
          </h1>
          <p className="text-center text-lg">List of the current disasters.</p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">



            {data && data.disasterRegistereds.map((item, index) => {
              return (
                <div key={index} className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
                  <BugAntIcon className="h-8 w-8 fill-secondary" />
                  <p>

                      <p>
                        {item.disaster_location}
                        <br/>
                        {item.disaster_category}

                      </p>
                    <br />

                    <a href={item.disaster_evidence}>More info</a>

                    <Link href="/donation" passHref className="link">
                      Elligible or not
                    </Link>
                  </p>
                </div>
              )
            })}
          </div>



        </div>
      </div>
    </>
  );
};

export default Disaster;
