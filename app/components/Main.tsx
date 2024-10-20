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
    <div className="flex min-h-screen">
      <Episodes onSelectEpisodeID={selectEpisodeIDHandler} />
      <CharactersWrapper>
        {!episodeIdNumber && <Characters />}
        <EpisodeCharacters episodeIdNumber={episodeIdNumber} />
      </CharactersWrapper>
    </div>
  );
};

export default Main;
