import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  metadataFromUri,
  trimAddress,
  uriToLink,
} from "../utils/functions/utils";

import { AppContext } from "../context/AppContext";
import Link from "next/link";
import { getOwnedMetas, getOwnedIDs } from "../utils/functions/MacawFunctions";
import { MACAW_ABI, MACAW_ADDRESS } from "../utils/contracts/MacawContract";

declare let window: any;

type Meta = {
  name: string;
  description: string;
  image: string;
};

const Wallet: NextPage = () => {
  const { contextState, setContextState } = useContext(AppContext);
  const [loaded, setLoaded] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [ownedUris, setOwnedUris] = useState<Meta[]>([]);

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
      window.alert("Switch to Fantom Testnet to continue");
      setContextState({ ...contextState, isFantom: false, isConnected: true });
      return;
    }

    let signer = provider.getSigner();

    const addr = await signer.getAddress();
    setContextState({
      ...contextState,
      addr,
      isLoading: false,
      isConnected: true,
    });
    if (!loaded) {
      await LoadOwnedNFTS();
    }
  }

  async function LoadOwnedNFTS() {
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let signer = provider.getSigner();
    const macawContract = new ethers.Contract(
      MACAW_ADDRESS,
      MACAW_ABI,
      provider
    );
    const addr = await signer.getAddress();
    const ids = await getOwnedIDs(macawContract, addr);
    const ownedMetas = await getOwnedMetas(ids);
    setOwnedUris(ownedMetas);
    setLoaded(true);
  }
  return (
    <div className="font-family['Poppins']">
      <Head>
        <title>Your Macaws </title>
        <meta name="description" content="Macaws Minted by Wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex flex-col items-center justify-center max-w-full overflow-hidden">
        <nav className="absolute top-0 h-20 flex flex-row items-center justify-between w-full px-4 lg:px-24 py-12">
          <div className="flex items-center justify-between lg:justify-end w-full">
            <div className="px-4 py-2 bg-green-400 rounded cursor-pointer mr-8">
              <Link href="/">
                <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                  Macaws Herds
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

        <div className="mt-20 flex flex-col items-center min-h-screen py-12 px-6">
          <h1 className="text-green-400 font-bold text-5xl mb-8">
            Macaws Owned
          </h1>
          <div className="flex items-center justify-center w-screen">
            {ownedUris.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {ownedUris.map((meta: Meta, index) => (
                  <div
                    className="flex flex-col items-center justify-center max-w-sm border-8 border-gray-800 bg-gray-800 rounded-md"
                    key={index}
                  >
                    <img className=" rounded" src={meta.image} alt="" />
                    <span className=" mt-4 text-3xl font-bold text-gray-200">
                      {meta.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center  h-[400px] w-full flex-1">
                {isEmpty ? (
                  <span className="text-white text-5xl font-semibold">
                    Oops! Looks like you don&apos;t own any Macaw
                  </span>
                ) : (
                  <span className="text-white text-4xl font-semibold animate-bounce">
                    Loading Your Macaws..
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Wallet;
