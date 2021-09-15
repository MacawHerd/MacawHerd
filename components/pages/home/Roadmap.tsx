import React from "react";

const roadMapData = [
  {
    amt: 10,
    info: "Macaw Herd will airdrop 5 random NFTs on Fantom Opera Chain to 5 random holders of Macaw Herd.",
  },
  {
    amt: 25,
    info: "Charity wallet filled with 10,500 FTM. All the donations will be going to SaveTheChildren Charity. Our mission with Macaw Herd is to bring a large community, all while supporting charities that help children across the world.",
  },
  {
    amt: 75,
    info: "Charity wallet filled with 10,500 FTM. At this stage our production will start on a new NFT project only available for Macaw Herd holders, and it will be free to claim.",
  },
  {
    amt: 100,
    info: "Charity wallet filled with 10,500 FTM. Charity wallet in total will be filled with 42,000 FTM and will all be donated to SaveTheChildren charity.",
  },
];

function RoadmapItem({
  amt,
  info,
  index,
}: {
  amt: number;
  info: string;
  index: number;
}) {
  return (
    <div
      className={`flex items-center justify-center ${
        index % 2 == 0 ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div className="flex flex-col min-w-[90px] min-h-[90px] lg:min-w-[120px] lg:min-h-[120px] bg-[#47C653] rounded-md justify-center items-center">
        <span className="text-white font-extrabold text-3xl lg:text-4xl mb-2">
          {amt}%
        </span>
        <span className=" font-bold lg:text-xl tracking-widest">MINTED</span>
      </div>
      <span
        className={`text-white text-sm lg:text-lg ${
          index % 2 == 0 ? "ml-4 lg:ml-12" : " mr-4 lg:mr-16"
        }`}
      >
        {info}
      </span>
    </div>
  );
}

function Roadmap() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-[30px] lg:text-5xl text-center lg:text-left text-green-400 font-bold leading-relaxed mb-20">
        Macaw Herd 2021 Roadmap
      </h2>
      <div className="grid grid-cols-1 gap-8 max-w-screen-md px-4">
        {roadMapData.map((item, index) => (
          <RoadmapItem amt={item.amt} info={item.info} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Roadmap;
