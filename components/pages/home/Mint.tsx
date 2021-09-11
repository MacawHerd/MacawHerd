import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import {
  buyMacaws,
  getOwnedMetas,
} from "../../../utils/functions/MacawFunctions";
import CountdownTimer from "../../countdown";

function Mint() {
  const [buyAmount, setBuyAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const { contextState, setContextState } = useContext(AppContext);

  async function handleMint() {
    if (contextState.isFantom && !contextState.isPaused) {
      setIsMinting(true);

      const txHash = await buyMacaws(
        contextState.macawContractSigner,
        contextState.price,
        buyAmount
      );

      if (txHash) {
        setContextState({
          ...contextState,
          txHash,
          showPopup: true,
        });
      }
      setIsMinting(false);
    }
  }

  return (
    <div className="flex flex-col relative items-center  w-full py-20">
      <div className="absolute right-8 lg:right-16 bottom-0 lg:top-40">
        <img
          className="rounded-2xl w-40 lg:w-60"
          src="/assets/images/tree.gif"
          alt=""
        />
      </div>

      <h2 className="text-[30px] lg:text-7xl text-center lg:text-left text-green-400 font-bold leading-relaxed mt-12 lg:mt-0">
        Mint your Macaw
      </h2>
      <div className="flex flex-col items-center py-12">
        <div className="text-5xl text-gray-200 font-bold mb-8">
          {700 - contextState.currentSupply}
        </div>
        <span className="text-3xl text-gray-400 uppercase tracking-widest font-semibold">
          Available
        </span>
      </div>
      <div className="flex flex-col items-center justify-center py-12 transform">
        <div className="flex items-center py-8">
          <span className="text-3xl text-white mr-6 ">You Pay:</span>
          <span className="text-green-500 font-bold text-5xl">
            {contextState.price * buyAmount} FTM{" "}
          </span>
        </div>
        <div
          onClick={() => handleMint()}
          className="px-24 py-2 bg-green-400 font-semibold text-gray-800 text-2xl mb-8 cursor-pointer"
        >
          {contextState.isPaused ? (
            <span className="">Live Soon</span>
          ) : (
            <span>Mint {buyAmount == 1 ? "a" : buyAmount} Macaw</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-4">
          <div
            onClick={() => setBuyAmount(1)}
            className="font-white bg-green-300 p-2 w-16 h-12 flex items-center justify-center font-semibold cursor-pointer text-gray-800 text-2xl"
          >
            x1
          </div>
          <div
            onClick={() => setBuyAmount(5)}
            className="font-white bg-green-300 p-2 w-16 h-12 flex items-center justify-center font-semibold cursor-pointer text-gray-800 text-2xl"
          >
            x5
          </div>
          <div
            onClick={() => setBuyAmount(10)}
            className="font-white bg-green-300 p-2 w-16 h-12 flex items-center justify-center font-semibold cursor-pointer text-gray-800 text-2xl"
          >
            x10
          </div>
        </div>
      </div>
      <CountdownTimer />
    </div>
  );
}

export default Mint;
