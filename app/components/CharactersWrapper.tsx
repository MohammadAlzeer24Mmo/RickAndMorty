"use client"
import React, { ReactNode } from "react";

interface CharactersWrapperProps {
  children: ReactNode;
  episodeIdNumber: number | undefined;
}


const CharactersWrapper: React.FC<CharactersWrapperProps> = (props) => {
  const  changeMargin:string = props.episodeIdNumber === undefined? "mt-6 ":"mt-12 sm:mt-14 md:mt-16 "

  return (
    <>
      <main className={`${changeMargin} w-[75%] p-4 min-h-screen mb-14`}>
       
        <div className="grid grid-cols-5 relative gap-4  ">
          {props.children}
        </div>
      </main>
    </>
  );
};

export default CharactersWrapper;
