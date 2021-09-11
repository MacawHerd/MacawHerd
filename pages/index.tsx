import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  hashToLink,
  metadataFromUri,
  trimAddress,
  trimHash,
} from "../utils/functions/utils";

import { AppContext } from "../context/AppContext";
import Popup from "../components/Popup";
import Hero from "../components/pages/home/Hero";
import Mint from "../components/pages/home/Mint";
import Gallery from "../components/pages/home/Gallery";
import Footer from "../components/pages/home/Footer";
import { MACAW_ABI, MACAW_ADDRESS } from "../utils/contracts/MacawContract";

import {
  getPrice,
  getSupply,
  saleStatus,
} from "../utils/functions/MacawFunctions";

declare let window: any;

const Home: NextPage = () => {
  const { contextState, setContextState } = useContext(AppContext);

  useEffect(() => {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    connectWallet();
    window.ethereum.on("accountsChanged", () => {
      connectWallet();
    });

    window.ethereum.on("chainChanged", () => {
      document.location.reload();
    });
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    setContextState({ ...contextState, isLoading: true });
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let network = await provider.getNetwork();
    await provider.send("eth_requestAccounts", []);

    if (network.chainId != 250) {
      window.alert("Switch to Fantom to continue");
      setContextState({ ...contextState, isFantom: false, isConnected: true });
      return;
    }

    let signer = provider.getSigner();
    const macawContract = new ethers.Contract(
      MACAW_ADDRESS,
      MACAW_ABI,
      provider
    );
    const macawContractSigner = new ethers.Contract(
      MACAW_ADDRESS,
      MACAW_ABI,
      signer
    );

    const addr = await signer.getAddress();
    const price = await getPrice(macawContract);
    const currentSupply = await getSupply(macawContract);
    const isPaused = await saleStatus(macawContract);
    setContextState({
      ...contextState,
      addr,
      price,
      isPaused,
      currentSupply,
      isLoading: false,
      isConnected: true,
      macawContract,
      macawContractSigner,
    });
  }

  return (
    <div className="font-lato bg-black items-center justify-center flex">
      <Head>
        <title>Macaw Herd </title>
        <meta
          name="description"
          content="Macaw Herd is a collection of 700 randomly generated Macaw NFTs on the Fantom Blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="  min-h-screen flex flex-col items-center justify-center  max-w-screen-xl overflow-hidden">
        <nav className="absolute top-0 h-20 flex flex-row items-center justify-end w-full px-4 lg:px-24 py-12">
          <div className="flex items-center justify-between lg:justify-end w-full">
            <div className="px-4 py-2 bg-green-400 rounded cursor-pointer mr-8">
              <Link href="/my-macaws">
                <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                  My Macaws
                </span>
              </Link>
            </div>

            <div
              className="px-4 py-2 bg-green-400 rounded cursor-pointer"
              onClick={() => connectWallet()}
            >
              <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                {contextState.addr != ""
                  ? trimAddress(contextState.addr)
                  : "Connect"}
              </span>
            </div>
          </div>
        </nav>
        <Hero />
        <Gallery />
        <Mint />
        <Footer />
        <Popup>
          <div className=" flex rounded-2xl flex-col items-center justify-evenly text-white text-xl py-16 px-4 space-y-4 border-8 border-green-400 max-w-[400px] bg-[#0D0A21] ">
            <span className="text-lg font-bold text-gray-300">
              Your transaction was successfull
            </span>
            <div className="flex hover:text-green-400">
              <a
                href={hashToLink(contextState.txHash)}
                target="_blank"
                rel="noreferrer"
              >
                {trimHash(contextState.txHash)}
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
            {/* <div className="rounded p-2 font-bold text-gray-800 bg-green-500 flex items-center justify-center">
              <Link href="/wallet">View Your Papers</Link>
            </div> */}
          </div>
        </Popup>
      </main>
    </div>
  );
};

export default Home;
