import React from "react";

function Hero() {
  return (
    <div className="min-h-screen w-full flex flex-col-reverse lg:flex-row items-center px-8 lg:px-24 pt-24 lg:py-32">
      <div className="flex-1 flex-col flex lg:pr-24">
        <h1 className="text-[60px] lg:text-[100px] text-center acme lg:text-left text-green-400 leading-relaxed mt-12 lg:mt-0">
          Macaw Herd
        </h1>
        <span className="text-lg font-semibold text-gray-200 text-center lg:text-left">
          Macaw Herd is a collection of 700 randomly generated Macaw NFTs on the
          Fantom Blockchain, with all traits hand drawn individually
          and meticulously by our artist. Each Macaw in our Macaw Herd
          collection is unique with no limit on what you could potentially use
          them for. Our Macaws are cute, goofy, and very smart individuals.
          Macaws are known for eating too many seeds, nuts and fruits but
          they’re especially known for mimicking your sounds. I mean come on,
          who wouldn’t want to own a Macaw? Holding a Macaw grants you access
          to future airdrops, hodlers-only perks and features.
        </span>
      </div>
      <div className="flex-1 flex items-center justify-end w-full h-full">
        <div className="p-6 rounded-md bg-yellow-600">
          <img className="rounded" src="/assets/images/GIF.gif" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
