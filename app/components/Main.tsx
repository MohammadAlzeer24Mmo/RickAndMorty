"use client"
import { useState } from "react";
import Episodes from "./Episodes";
import Characters from "./Characters";
import EpisodeCharacters from "./EpisodeCharacters";
import CharactersWrapper from "./CharactersWrapper";

const Main: React.FC = () => {
  const [episodeIdNumber, setEpisodeIdNumber] = useState<number | undefined>(undefined);

  const selectEpisodeIDHandler = (data: number) => {
    setEpisodeIdNumber(data);
    console.log(data);
  };

  return (
    <>
     <h2 className="mb-12 mt-4 text-center text-[8px] sm:text-lg font-bold text-blue-400 md:text-xl lg:text-2xl">
          Rick and Morty characters
        </h2>
    <div className="flex min-h-screen">
      <Episodes onSelectEpisodeID={selectEpisodeIDHandler} />
      <CharactersWrapper>
        {!episodeIdNumber && <Characters />}
        <EpisodeCharacters episodeIdNumber={episodeIdNumber} />
      </CharactersWrapper>
    </div>
    </>
  );
};

export default Main;