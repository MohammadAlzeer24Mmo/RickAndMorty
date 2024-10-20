"use client"
import React from "react";

interface LoadingProps {
  text: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const loadingPosition =
    props.text === "Loading characters..." ||
    props.text === "Loading episode characters..."
      ? "absolute "
      : "";

  return (
    <div
      className={`flex flex-col m-auto text-center w-[100%] ${loadingPosition} items-center justify-center h-screen bg-gray-900 text-white`}
    >
      <div className="spinner"></div>
      <p className="mt-5 text-lg font-bold tracking-wider text-blue-400">
        {props.text}
      </p>
    </div>
  );
};

export default Loading;
