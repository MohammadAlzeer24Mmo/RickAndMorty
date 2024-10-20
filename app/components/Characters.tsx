"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";

interface Character {
  id: number;
  name: string;
  image: string;
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      }
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
          <div
            key={character.id}
            className="itemAnimation p-[2px] sm:p-[5px] rounded hover:shadow-lg bg-[rgb(59,130,246,1)]"
          >
            <img className="imageAnimation" src={character.image} alt={character.name} />
            <h3 className="font-serif text-[4px] sm:text-[8px] md:text-sm lg:text-base font-bold titleAnimation">
              {character.name}
            </h3>
          </div>
        ))}
    </>
  );
};

export default Characters;
