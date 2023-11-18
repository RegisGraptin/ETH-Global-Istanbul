
import React from "react";

/**
 * Site footer
 */
export const Feature = () => {

  return (
    <>
      <section className="container mx-auto">
        <article className="columns-2 my-20">
          <article>
            <img src="/images/image_1.jpg" className="mx-auto object-cover rounded-lg shadow-xl dark:shadow-gray-800 h-auto max-w-xl" />
          </article>

          <article>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Better Data</span> Scalable AI.</h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

            <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

            <blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
              <p>"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."</p>
            </blockquote>
          </article>
        </article>
      </section>

      <section className="container mx-auto mt-10 mb-20">
        <article className="columns-2 my-20">
          <article>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Better Data</span> Scalable AI.</h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

            <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

            <blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
              <p>"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."</p>
            </blockquote>
          </article>

          <article>
            <img src="/images/image_1.jpg" className="mx-auto object-cover rounded-lg shadow-xl dark:shadow-gray-800 h-auto max-w-" />
          </article>
        </article>
      </section>

    </>
  );
};
