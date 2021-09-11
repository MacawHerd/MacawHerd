import React from "react";

export default function Gallery() {
  return (
    <div className="flex flex-col w-full py-8 px-8 lg:px-24">
      <h2 className="text-[35px] lg:text-7xl text-center lg:text-left text-green-400 font-bold leading-relaxed mt-12 lg:mt-0">
        The Collection
      </h2>

      <div className="flex-1 py-12 ">
        <div className="grid  grid-cols-1 lg:grid-cols-6 gap-8">
          <img className="rounded-lg" src="/assets/images/1.png" alt="" />
          <img className="rounded-lg" src="/assets/images/2.png" alt="" />
          <img className="rounded-lg" src="/assets/images/3.png" alt="" />
          <img className="rounded-lg" src="/assets/images/4.png" alt="" />
          <img className="rounded-lg" src="/assets/images/5.png" alt="" />
          <div className="flex items-center justify-center bg-green-100 rounded text-3xl py-12 cursor-pointer font-bold">
            View All
          </div>
        </div>
      </div>
    </div>
  );
}
