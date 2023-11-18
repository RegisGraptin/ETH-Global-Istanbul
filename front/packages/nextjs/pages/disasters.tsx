import React, { useEffect } from 'react'
import type { NextPage } from "next";

import { getDisastersDocument, getDisastersQuery, execute } from '../.graphclient'

const Disaster: NextPage = () => {

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [data, setData] = React.useState<getDisastersQuery>()

  useEffect(() => {
    execute(getDisastersDocument, {}).then((result) => {
      setData(result?.data);
      console.log(result?.data);
    })
  }, [setData]);

  return (
    <>
      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold">Current Natural Disasters</span>
        </h1>

        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">

          {data && data.disasterRegistereds.map((item, index) => {
            return (

              <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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

                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">
                      Need help
                    </a>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>

    </>
  );
};

export default Disaster;
