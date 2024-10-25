"use client";

import { useEffect, useState } from "react";
import Loading from "../Loading";
import Character from "./Character";

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
  const [charactersLinksList, setCharactersLinksList] = useState<String[]>([]);

  useEffect(() => {
    if (props.episodeIdNumber !== undefined) {
      const fetchEpisodeCharacters = async () => {
        setEpisodeCharacters([]);
        setLoadingEpisodeCharacters(true);
        setError(null);
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
          setCharactersLinksList(charactersLinks)
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
          <Loading text="Loading episode characters..." />
        </div>
      )}
      {/* Display error message if exists */}
      {error && !loadingEpisodeCharacters && props.episodeIdNumber && (
        <p className="text-red-500 text-center absolute mt-4 w-[75%] m-auto">
          Failed to load episodes: {error}
        </p>
      )}
      {/* Rendering Characters for the selected episode */}
     {props.episodeIdNumber && <div className="absolute font-bold text-blue-400 left-[5px]  text-[8px] md:text-xl lg:text-2xl top-[-28px] sm:top-[-35px] md:top-[-44px] lg:top-[-47px]">
        {`${charactersLinksList.length} Characters in episode "${episodeName}"`}
      </div>} 
      {!loadingEpisodeCharacters && props.episodeIdNumber &&
        episodeCharacters.map((character) => (
          <Character
          key={character.id}
          id={character.id}
          name={character.name}
          image={character.image}
          EpisodeID={props.episodeIdNumber}
        />
        ))}
    </>
  );
};

export default EpisodeCharacters;