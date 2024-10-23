"use client";

import { useEffect, useState } from "react";
import Loading from "../Loading";
import Pagination from "../Pagination";
import Character from "./Character";

interface Character {
  id: number;
  name: string;
  image: string;
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPagination, setShowPagination] = useState<boolean>(false);

  {/* Fetching characters */}
  useEffect(() => {
    const fetchCharacters = async () => {
      setError(null);
      setLoadingCharacters(true);
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setCharacters(data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingCharacters(false);
        setShowPagination(true)
      }
     console.log(loadingCharacters,"ddd")
    };
    fetchCharacters();
  }, []);


  return (
    <>
      {/* Display loading spinner */}
      {loadingCharacters && <Loading text="Loading characters..." />}
      {/* Display error message if exists */}
      {error && !loadingCharacters && (
        <p className="text-red-500 text-center absolute mt-4 w-[75%] m-auto">
          Failed to load episodes: {error}
        </p>
      )}
      {/* Rendering Characters */}
      {!loadingCharacters &&
        characters.map((character) => (
          <Character
          key={character.id}
          id={character.id}
          name={character.name}
          image={character.image}
          EpisodeID={undefined}
        />
        ))}
       {!loadingCharacters && showPagination && <Pagination/>}
    </>
  );
};

export default Characters;
