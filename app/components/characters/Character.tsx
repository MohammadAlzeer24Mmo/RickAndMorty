"use client";

interface CharacterProps {
  id: number;
  name: string;
  image: string;
  EpisodeID: number | undefined;
}

const Character: React.FC<CharacterProps> = ({
  id,
  name,
  image,
  EpisodeID,
}) => {
  return !EpisodeID ? (
    <div
      key={id}
      className="itemAnimation p-[2px] sm:p-[5px] rounded hover:shadow-lg bg-[rgb(59,130,246,1)]"
    >
      <img className="imageAnimation" src={image} alt={name} />
      <h3 className="font-serif text-[4px] sm:text-[8px] md:text-sm lg:text-base font-bold titleAnimation">
        {name}
      </h3>
    </div>
  ) : (
    <div
      key={id}
      className="itemAnimation p-[5px] rounded hover:shadow-lg min-w-[50px]  lg:min-w-[142px]"
    >
      <img
        className="imageAnimation"
        src={image}
        alt={name}
      />
      <h3 className="mt-[0.7rem] text-[6px] font-bold text-blue-200 md:text-sm lg:text-sm font-style">
        {name}
      </h3>
    </div>
  );
};

export default Character;
