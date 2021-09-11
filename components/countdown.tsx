import React, { useContext } from "react";
import Countdown from "react-countdown";

import { AppContext } from "../context/AppContext";

function CountdownTimer() {
  const { contextState, setContextState } = useContext(AppContext);

  const Completionist = () => (
    <span className="text-purple-700 text-4xl mb-4 font-semibold">
      {contextState.isPaused
        ? "Sale is not live"
        : contextState.currentSupply == 700
        ? "The sale is over"
        : "Sale is Live"}
    </span>
  );

  // Renderer callback with condition
  const renderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    hours: any;
    minutes: any;
    seconds: any;
    completed: any;
  }) => {
    if (completed) {
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <span className="text-purple-400 text-2xl mr-4">Live in </span>
          <span>
            {hours}h:{minutes}m:{seconds}s
          </span>
        </div>
      );
    }
  };
  return (
    <div>
      <span className="text-purple-700 text-3xl mb-4 font-semibold">
        <Countdown date={1631419200000} renderer={renderer} />
      </span>
    </div>
  );
}

export default CountdownTimer;
