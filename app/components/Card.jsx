import "../globals.css";

import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
}

// Soft, cinematic colors for genres
const genreColors = {
    Action: "bg-red-600/60",
    Adventure: "bg-orange-500/60",
    Animation: "bg-pink-500/60",
    Comedy: "bg-yellow-500/50",
    Crime: "bg-slate-500/50",
    Documentary: "bg-cyan-500/50",
    Drama: "bg-purple-500/60",
    Family: "bg-green-500/50",
    Fantasy: "bg-indigo-500/60",
    History: "bg-amber-500/50",
    Horror: "bg-rose-500/50",
    Music: "bg-fuchsia-500/50",
    Mystery: "bg-violet-500/50",
    Romance: "bg-pink-400/50",
    "Science Fiction": "bg-teal-500/50",
    Thriller: "bg-gray-500/50",
    War: "bg-red-500/50",
    Western: "bg-yellow-400/50",
};

// Soft dark colors for language and tags
const tagColor = "bg-pink-800/70"; // soft dark pink

const placeholder =
    "https://placehold.co/220x330.png?text=No+Poster&font=roboto&bg=333333&color=ffffff";


export default function Card({ movie }) {
    return (
        <div className="rounded-xl overflow-hidden shadow-lg bg-gray-900/80 border border-gray-800 flex flex-col h-full cursor-pointer">
            {/* Poster */}
            <div className="relative w-full h-72 flex-shrink-0">
                <Image
                    src={
                        movie.poster
                            ? `https://image.tmdb.org/t/p/w342${movie.poster}`
                            : placeholder
                    }
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 220px"
                    onError={(e) => {
                        e.currentTarget.src = placeholder; // fallback if 404
                    }}
                />
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 p-4">
                {/* Title + Year */}
                <div className="flex flex-col space-y-1">
                    <h3 className="font-semibold text-base md:text-lg text-gray-100 line-clamp-2">
                        {movie.title}{" "}
                        {movie.original_title && movie.original_title !== movie.title && (
                            <span className="text-gray-400 text-sm">
                                ({movie.original_title})
                            </span>
                        )}
                    </h3>
                    <p className="text-sm text-gray-400">{movie.year}</p>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {(movie.genres || []).map((g) => {
                        const color = genreColors[g] || "bg-gray-500/50";
                        return (
                            <span
                                key={g}
                                className={`text-xs px-3 py-1 rounded-full text-white ${color}`}
                            >
                                {toTitleCase(g)}
                            </span>
                        );
                    })}
                </div>

                <div className="flex-1" />

                {/* Language + Tags */}
                <div className="flex justify-between mt-4 items-center flex-wrap gap-2">
                    <Tooltip.Provider delayDuration={700}> {/* shows only if hover ≥700ms */}
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <span
                                    className="
    text-sm md:text-base font-semibold font-mono tracking-widest 
    text-gray-500 cursor-default transition duration-300
    hover:text-gray-200 hover:[text-shadow:0_0_6px_rgba(255,255,255,0.4)]
  "
                                >
                                    {movie.lang_code.toUpperCase()}
                                </span>

                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content
                                    side="bottom"
                                    sideOffset={6}
                                    className={`
          pointer-events-none select-none
          px-3 py-2 text-sm md:text-base rounded-md
          bg-gray-800/95 text-gray-200 shadow-lg
          data-[state=delayed-open]:animate-fadeIn
          data-[state=closed]:animate-fadeOut
        `}
                                >
                                    {toTitleCase(movie.language)}
                                    <Tooltip.Arrow className="fill-gray-800/95" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>

                    {movie.tags && movie.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {movie.tags.map((tag) => (
                                <span key={tag} className={`text-xs px-3 py-1 rounded-md text-white ${tagColor}`}>
                                    {toTitleCase(tag)}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
