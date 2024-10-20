"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingCharacters from "./Loading";
import Loading from "./Loading";

// Define the prop types for the Episodes component
interface EpisodesProps {
  onSelectEpisodeID?: (id: number) => void; // Make it optional
}

const Episodes: React.FC<EpisodesProps> = (props) => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [episodeID, setEpisodeID] = useState<number | undefined>(undefined);
  const [LoadingEpisodes, setLoadingEpisodes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetching episodes
  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoadingEpisodes(true);
      setError(null);
      try {
        const res = await fetch("https://rickandmortyapi.com/api/episode");

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setEpisodes(data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingEpisodes(false);
      }
    };
    fetchEpisodes();
  }, []);

  useEffect(() => {
    if (props.onSelectEpisodeID) {
      props.onSelectEpisodeID(episodeID!); // Ensure episodeID is defined
    }
  }, [episodeID, props]);

  return (
    <nav className="w-[25%] bg-black-100 p-4 text-blue-400 h-[550px] max-h-[550px] ">
      <h2 className="mb-4 text-[8px] sm:text-lg md:text-xl lg:text-2xl font-bold text-center">Episodes</h2>
      {LoadingEpisodes && <Loading text="Loading episodes..." />}
      {error && (
        <p className="mt-4 text-center text-red-500">
          Failed to load episodes: {error}
        </p>
      )}
      {!LoadingEpisodes && (
        <ul className="space-y-2 border-2 border-blue-500 rounded-sm h-[550px] overflow-y-auto overflow-x-hidden custom-scrollbar">
          {episodes.map((episode) => (
            <li key={episode.id}>
              <a
                onClick={() => {
                  episodeID !== episode.id
                    ? setEpisodeID(episode.id)
                    : setEpisodeID(undefined);
                }}
                href="#"
                className={`font-style text-center transform transition-all duration-300 ${
                  episodeID === episode.id ? "bg-blue-700 scale-105 shadow-lg" : ""
                } block p-2 rounded hover:bg-blue-600 hover:scale-105 hover:shadow-lg text-[6px] sm:text-sm lg:text-base`}
              >
                {episode.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Episodes;
