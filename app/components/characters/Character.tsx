"use client";

interface CharacterProps {
  id: number;
  name: string;
  image: string;
  EpisodeID: number | undefined;
}

interface characterStyling {
  container: string;
  name: string;
  // image: string; // if needed later
}

const characterStyle: characterStyling = {
  container: "", 
  name: "",
};

const Character: React.FC<CharacterProps> = ({
  id,
  name,
  image,
  EpisodeID,
}) => {
  
characterStyle.container = !EpisodeID ? "itemAnimation p-[2px] sm:p-[5px] rounded hover:shadow-lg bg-[rgb(59,130,246,1)]" : "itemAnimation p-[5px] rounded hover:shadow-lg min-w-[50px]  lg:min-w-[142px]"
// characterStyle.image = EpisodeID ? "imageAnimation" : "imageAnimation"
characterStyle.name = !EpisodeID ? "font-serif text-[4px] sm:text-[8px] md:text-sm lg:text-base font-bold titleAnimation" : "mt-[0.7rem] text-[6px] font-bold text-blue-200 md:text-sm lg:text-sm font-style"

return  (
    <div
      key={id}
      className={characterStyle.container}
    >
      <img className="imageAnimation" src={image} alt={name} />
      <h3 className={characterStyle.name}  >
        {name}
      </h3>
    </div>
  )

};

export default Character;
