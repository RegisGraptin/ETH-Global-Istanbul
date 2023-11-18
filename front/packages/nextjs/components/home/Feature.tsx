
import React from "react";

/**
 * Site footer
 */
export const Feature = () => {

  return (
    <>
    <div className="bg-base-300">
    <section className="container mx-auto pt-10 pb-10">

    <h1 className="text-center pt-10 pb-10 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      Safety First Products
    </h1>

        <article className="columns-2 my-20">
          <article>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Monthly</span> Giving <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Control</span>.</h1>
            
            <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Empower your charitable giving with our Monthly Giving Control feature. 
              Now, you can effortlessly contribute to your chosen charity fund every month with just a 
              one-time commitment. Simply allocate an initial amount, like $200, to the smart contract, and 
              it will automatically transfer your specified monthly donation to the charity of your choice.
            </p>

            <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

            <blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
              <p>"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."</p>
            </blockquote>
          </article>

          <article>
            <img src="/images/donation_grad.png" className="mx-auto object-cover rounded-lg shadow-xl dark:shadow-gray-800 h-auto max-w-xl" />
          </article>
        </article>
      </section>
      
      <section className="container mx-auto pb-5 pt-5">
        <article className="columns-2 my-20">
          <article>
              <img src="/images/emergency_grad.png" className="mx-auto object-cover rounded-lg shadow-xl dark:shadow-gray-800 h-auto max-w-xl" />
          </article>

          <article>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Prepare</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Act Fast</span>.</h1>
            
            <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              When a natural disaster strikes, SafetyFirst smart contract is triggered instantly. 
              This triggers a seamless and transparent process that allocates funds directly to the 
              affected individuals and communities. With blockchain's inherent security and transparency, 
              you can trust that your contributions are making a direct impact without unnecessary intermediaries.
            </p>
            <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

            <blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
              <p>Blockchain facilitates swift responses to natural disasters, executing transactions rapidly at any 
                time. In critical situations where every second is crucial and lives are at risk, leveraging this 
                advanced technology becomes imperative. 
                
                {/* Quick and efficient mechanisms, such as the SafetyFirst 
                smart contract, are paramount for ensuring timely assistance in critical moments. */}
              </p>
            </blockquote>
          </article>
        </article>
      </section>


      <section className="container mx-auto pt-10 pb-10">

    <article className="columns-2 my-20">
      <article>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your Active Role</span> in <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Times of Need</span>.</h1>
        
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Empower yourself as a vital contributor to community safety with our Community Alert System. 
        When a natural disaster strikes, you become the firsthand source of crucial information. 
        By simply sharing your coordinates, you play a pivotal role in notifying others about the occurrence of a disaster.
        </p>

        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

        <blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
          <p>
            Our platform transforms crisis response by amplifying community engagement. 
            The more individuals interact with our Community Alert System, the clearer the signal becomes, 
            enabling swift and coordinated responses. Beyond awareness, it allows active participation, 
            signaling needs for assistance or offering help to foster unity and 
            collective strength.
          </p>

        </blockquote>
      </article>

      <article>
        <img src="/images/donation_grad.png" className="mx-auto object-cover rounded-lg shadow-xl dark:shadow-gray-800 h-auto max-w-xl" />
      </article>
    </article>
  </section>

      </div>
    </>
  );
};
