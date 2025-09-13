import "../globals.css";

import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
    Image as ImageIcon, Captions,
    Film,
} from "lucide-react";

import { PiVideoCameraBold } from "react-icons/pi";
import { LuDrama } from "react-icons/lu";
import {
    RiGhost2Line,
    RiFolderImageLine,
    RiKnifeBloodLine,
    RiBearSmileLine,
    RiMap2Line,
    RiEmotionLaughLine,
    RiLinkUnlinkM,
} from "react-icons/ri";
import { LuAtom } from "react-icons/lu";
import {
    PiDetectiveBold,
    PiCowboyHatBold,
    PiMagicWandBold,
} from "react-icons/pi";
import { TbHearts, TbTank } from "react-icons/tb";
import { BiTargetLock } from "react-icons/bi";
import { FaChildren } from "react-icons/fa6";
import { FaHandcuffs } from "react-icons/fa6";

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

const genreStyles = {
    Action: { icon: BiTargetLock, color: "text-red-400" },
    Adventure: { icon: RiMap2Line, color: "text-green-500" },
    Animation: { icon: RiBearSmileLine, color: "text-pink-400" },
    Comedy: { icon: RiEmotionLaughLine, color: "text-yellow-400" },
    Crime: { icon: FaHandcuffs, color: "text-slate-500" },
    Documentary: { icon: PiVideoCameraBold, color: "text-green-600" },
    Drama: { icon: LuDrama, color: "text-indigo-400" },
    Family: { icon: FaChildren, color: "text-blue-400" },
    Fantasy: { icon: PiMagicWandBold, color: "text-purple-400" },
    Horror: { icon: RiGhost2Line, color: "text-rose-600" },
    Mystery: { icon: PiDetectiveBold, color: "text-teal-500" },
    Romance: { icon: TbHearts, color: "text-pink-500" },
    "Sci-Fi": { icon: LuAtom, color: "text-cyan-500" },
    Thriller: { icon: RiKnifeBloodLine, color: "text-red-600" },
    War: { icon: TbTank, color: "text-gray-600" },
    Western: { icon: PiCowboyHatBold, color: "text-amber-600" },

    // fallback
    Default: { icon: RiLinkUnlinkM, color: "text-gray-600" },
};


// Soft dark colors for language and tags
const tagColor = "bg-pink-800/70"; // soft dark pink

const placeholder =
    "https://placehold.co/220x330.png?text=No+Poster&font=roboto&bg=333333&color=ffffff";


export default function Card({ movie }) {
    const subtitles = movie.subtitles || []; // e.g. ["en", "id", "fr"]

    return (
        <div className="rounded-xl overflow-hidden shadow-lg bg-gray-900/80 border border-gray-800 flex flex-col h-full cursor-pointer">
            {/* Poster */}
            <div className="relative w-full aspect-[4/5] flex-shrink-0">
                <Image
                    src={
                        movie.poster
                            ? `https://image.tmdb.org/t/p/w342${movie.poster}`
                            : placeholder
                    }
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 220px, 280px"
                    onError={(e) => { e.currentTarget.src = placeholder; }}
                />
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 p-3 sm:p-4 space-y-2 h-full">
                {/* Title */}
                <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-100 line-clamp-2 break-words">
                        {movie.title}{" "}
                        {movie.original_title && movie.original_title !== movie.title && (
                            <span className="text-gray-400 text-xs sm:text-sm">
                                ({movie.original_title})
                            </span>
                        )}
                    </h3>
                </div>

                {/* Year + single source tag */}
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                    {/* Year */}
                    <p className="text-xs sm:text-sm text-gray-400 font-mono">{movie.year}</p>

                    {/* Source tag */}
                    {movie.tags && movie.tags.length > 0 && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-lg border border-2 border-pink-400 text-pink-400 font-medium font-mono uppercase">
                            {toTitleCase(movie.tags[0])}
                        </span>
                    )}
                </div>

                {/* Genres */}
                {/* Genres (fixed 2 lines height) */}
                <div className="flex flex-wrap gap-2 overflow-hidden items-start" style={{ minHeight: '3rem', maxHeight: '3rem' }}>
                    {(movie.genres || []).map((g) => {
                        const color = genreColors[g] || "bg-gray-500/50";
                        return (
                            <span
                                key={g}
                                className={`text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-white ${color}`}
                            >
                                {toTitleCase(g === "Science Fiction" ? "Sci-Fi" : g)}
                            </span>
                        );
                    })}
                </div>

                {/* <div className="flex-1 mb-4"></div> */}

                {/* Language + Tags + Status */}
                <div className="flex justify-between items-center gap-2 w-full sm:w-auto mt-auto">
                    <Tooltip.Provider delayDuration={500}>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <GenreBadge genre={movie.group} />
                            </Tooltip.Trigger>
                            {movie.group && (
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        side="top"
                                        className="px-2 py-1 text-xs sm:text-sm rounded-md bg-gray-800/90 text-gray-200 shadow-lg"
                                    >
                                        {movie.group}
                                        <Tooltip.Arrow className="fill-gray-800/90" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            )}
                        </Tooltip.Root>
                    </Tooltip.Provider>


                    <Tooltip.Provider delayDuration={500}>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <RiFolderImageLine
                                    size={18}
                                    className={movie.thumbnail ? "text-green-400" : "text-gray-600"}
                                />
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content
                                    side="top"
                                    className="px-2 py-1 text-xs sm:text-sm rounded-md bg-gray-800/90 text-gray-200 shadow-lg"
                                >
                                    {movie.thumbnail ? "Thumbnail available" : "No thumbnail"}
                                    <Tooltip.Arrow className="fill-gray-800/90" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>

                    <Tooltip.Provider delayDuration={500}>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <Captions
                                    size={18}
                                    className={subtitles.length > 0 ? "text-blue-400" : "text-gray-600"}
                                />
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content
                                    side="top"
                                    className="px-2 py-1 text-xs sm:text-sm rounded-md bg-gray-800/90 text-gray-200 shadow-lg max-w-xs"
                                >
                                    {subtitles.length > 0
                                        ? `Subtitles: ${subtitles.join(", ").toUpperCase()}`
                                        : "No subtitles"}
                                    <Tooltip.Arrow className="fill-gray-800/90" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>

                    {/* Language tooltip */}
                    <Tooltip.Provider delayDuration={700}>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <span
                                    className="text-sm sm:text-md font-semibold font-alt tracking-widest text-gray-500 cursor-default transition duration-300 hover:text-gray-200 hover:[text-shadow:0_0_6px_rgba(255,255,255,0.4)]"
                                >
                                    {movie.lang_code.toUpperCase()}
                                </span>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content
                                    side="bottom"
                                    sideOffset={6}
                                    className="pointer-events-none select-none px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-md bg-gray-800/95 text-gray-200 shadow-lg data-[state=delayed-open]:animate-fadeIn data-[state=closed]:animate-fadeOut"
                                >
                                    {toTitleCase(movie.language)}
                                    <Tooltip.Arrow className="fill-gray-800/95" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                </div>
            </div>
        </div >
    );
}

function GenreBadge({ genre }) {
    const { icon: Icon, color } = genreStyles[genre] || genreStyles.Default;

    return (
        <Icon size={20} className={color} />
    );
}