"use client"
import { useState } from "react";
import Episodes from "./Episodes";
import Characters from "./characters/Characters";
import EpisodeCharacters from "./characters/EpisodeCharacters";
import CharactersWrapper from "./characters/CharactersWrapper";

const Main: React.FC = () => {
  const [episodeIdNumber, setEpisodeIdNumber] = useState<number | undefined>(undefined);

  const selectEpisodeIDHandler = (data: number) => {
    setEpisodeIdNumber(data);
    console.log(data);
  };
  return (
    <>
     <h1 className=" mt-4 text-center text-lg sm:text-xl font-bold text-blue-400 md:text-4xl">
          Rick and Morty Characters
        </h1>
    <div className="flex min-h-screen">
      <Episodes onSelectEpisodeID={selectEpisodeIDHandler} />
      <CharactersWrapper episodeIdNumber={episodeIdNumber} >
        {!episodeIdNumber && <Characters />}
        <EpisodeCharacters episodeIdNumber={episodeIdNumber} />
      </CharactersWrapper>
    </div>
    </>
  );
};

export default Main;