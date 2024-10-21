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
    <nav className="w-[25%] bg-black-100 rounded-none  text-blue-400 h-[550px] max-h-[350px] lg:max-h-[790px]   md:max-h-[550px] lg:h-[790px]  overflow-y-auto overflow-x-hidden custom-scrollbar border-2 p-4 border-[rgb(59,130,246)]">
      <h2 className="mb-4 text-[8px] pb-2 border-b-2 border-blue-400  sm:text-lg md:text-xl lg:text-2xl font-bold text-center">Episodes</h2>
      {LoadingEpisodes && <Loading text="Loading episodes..." />}
      {error && (
        <p className="mt-4 text-center text-red-500">
          Failed to load episodes: {error}
        </p>
      )}
      {!LoadingEpisodes && (
        <ul className="space-y-2  rounded-sm ">
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
                } block p-1 md:p-3 rounded border-2 border-blue-400 hover:bg-blue-600 hover:scale-105 hover:shadow-lg text-[6px] sm:text-xs md:text-sm lg:text-base`}
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
