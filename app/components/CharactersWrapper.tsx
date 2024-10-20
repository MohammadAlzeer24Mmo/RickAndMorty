"use client"
import React, { ReactNode } from "react";

interface CharactersWrapperProps {
  children: ReactNode;
}

const CharactersWrapper: React.FC<CharactersWrapperProps> = (props) => {
  return (
    <>
      <main className="w-[75%] p-4 min-h-screen mb-14 ">
        <h2 className="mb-4 text-[8px] font-bold text-blue-400 md:text-xl lg:text-2xl">
          Characters
        </h2>
        <div className="grid grid-cols-5 relative gap-4  ">
          {props.children}
        </div>
      </main>
    </>
  );
};

export default CharactersWrapper;
