"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";

interface Character {
  id: number;
  name: string;
  image: string;
}

interface EpisodeCharactersProps {
  episodeIdNumber: number | undefined;
}

const EpisodeCharacters: React.FC<EpisodeCharactersProps> = (props) => {
  const [episodeCharacters, setEpisodeCharacters] = useState<Character[]>([]);
  const [loadingEpisodeCharacters, setLoadingEpisodeCharacters] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [episodeName, setEpisodeName] = useState<string | null>(null);

  useEffect(() => {
    if (props.episodeIdNumber !== undefined) {
      const fetchEpisodeCharacters = async () => {
        setEpisodeCharacters([]);
        setLoadingEpisodeCharacters(true);
        try {
          // Fetching episode depending on selected episodeIdNumber
          const res = await fetch(
            `https://rickandmortyapi.com/api/episode/${props.episodeIdNumber}`
          );

          if (!res.ok) {
            throw new Error(
              `Episode fetch failed: ${res.status} ${res.statusText}`
            );
          }

          const data = await res.json();
          const charactersLinks = data.characters;
          setEpisodeName(data.name);

          // Fetching Characters for the selected episode using Promise.all
          const charactersArray = await Promise.all(
            charactersLinks.map(async (charactersLink: string) => {
              const respond = await fetch(charactersLink);

              if (!respond.ok) {
                throw new Error(
                  `Character fetch failed: ${respond.status} ${respond.statusText}`
                );
              }

              const characterData: Character = await respond.json();
              return characterData;
            })
          );

          setEpisodeCharacters(charactersArray);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoadingEpisodeCharacters(false);
        }
      };
      fetchEpisodeCharacters();
    }
  }, [props.episodeIdNumber]);

  return (
    <>
      {/* Display loading spinner */}
      {loadingEpisodeCharacters && (
        <div>
          <Loading text="Loading episodes characters..." />
        </div>
      )}
      {/* Display error message if exists */}
      {error && !loadingEpisodeCharacters && (
        <p className="text-red-500 text-center absolute mt-4 w-[75%] m-auto">
          Failed to load episodes: {error}
        </p>
      )}
      {/* Rendering Characters for the selected episode */}
     {props.episodeIdNumber && <div className="absolute font-bold text-blue-400 left-[42.5%] lg:left-[42%] text-[8px] md:text-xl lg:text-2xl top-4">
        ( {episodeName}  episode )
      </div>} 
      {!loadingEpisodeCharacters && props.episodeIdNumber &&
        episodeCharacters.map((character) => (
          <div
            key={character.id}
            className="itemAnimation p-[5px] rounded hover:shadow-lg bg-[rgb(59,130,246,1)] min-w-[50px]  lg:min-w-[142px]"
          >
            <img
              className="imageAnimation"
              src={character.image}
              alt={character.name}
            />
            <h3 className="mt-1 text-[6px] font-bold text-blue-200 md:text-sm lg:text-base font-style">
              {character.name}
            </h3>
          </div>
        ))}
    </>
  );
};

export default EpisodeCharacters;
