"use client";

import clsx from "clsx";

// Soft pastel colors
const genreColors = {
    Action: { text: "text-red-400", border: "border-red-400", ring: "ring-red-400", hoverText: "hover:text-red-400", hoverBorder: "hover:border-red-400" },
    Adventure: { text: "text-orange-400", border: "border-orange-400", ring: "ring-orange-400", hoverText: "hover:text-orange-400", hoverBorder: "hover:border-orange-400" },
    Animation: { text: "text-pink-400", border: "border-pink-400", ring: "ring-pink-400", hoverText: "hover:text-pink-400", hoverBorder: "hover:border-pink-400" },
    Comedy: { text: "text-yellow-400", border: "border-yellow-400", ring: "ring-yellow-400", hoverText: "hover:text-yellow-400", hoverBorder: "hover:border-yellow-400" },
    Crime: { text: "text-slate-400", border: "border-slate-400", ring: "ring-slate-400", hoverText: "hover:text-slate-400", hoverBorder: "hover:border-slate-400" },
    Documentary: { text: "text-cyan-400", border: "border-cyan-400", ring: "ring-cyan-400", hoverText: "hover:text-cyan-400", hoverBorder: "hover:border-cyan-400" },
    Drama: { text: "text-purple-400", border: "border-purple-400", ring: "ring-purple-400", hoverText: "hover:text-purple-400", hoverBorder: "hover:border-purple-400" },
    Family: { text: "text-green-400", border: "border-green-400", ring: "ring-green-400", hoverText: "hover:text-green-400", hoverBorder: "hover:border-green-400" },
    Fantasy: { text: "text-indigo-400", border: "border-indigo-400", ring: "ring-indigo-400", hoverText: "hover:text-indigo-400", hoverBorder: "hover:border-indigo-400" },
    History: { text: "text-amber-400", border: "border-amber-400", ring: "ring-amber-400", hoverText: "hover:text-amber-400", hoverBorder: "hover:border-amber-400" },
    Horror: { text: "text-rose-400", border: "border-rose-400", ring: "ring-rose-400", hoverText: "hover:text-rose-400", hoverBorder: "hover:border-rose-400" },
    Music: { text: "text-fuchsia-400", border: "border-fuchsia-400", ring: "ring-fuchsia-400", hoverText: "hover:text-fuchsia-400", hoverBorder: "hover:border-fuchsia-400" },
    Mystery: { text: "text-violet-400", border: "border-violet-400", ring: "ring-violet-400", hoverText: "hover:text-violet-400", hoverBorder: "hover:border-violet-400" },
    Romance: { text: "text-pink-400", border: "border-pink-400", ring: "ring-pink-400", hoverText: "hover:text-pink-400", hoverBorder: "hover:border-pink-400" },
    "Science Fiction": { text: "text-blue-400", border: "border-blue-400", ring: "ring-blue-400", hoverText: "hover:text-blue-400", hoverBorder: "hover:border-blue-400" },
    "TV Movie": { text: "text-teal-400", border: "border-teal-400", ring: "ring-teal-400", hoverText: "hover:text-teal-400", hoverBorder: "hover:border-teal-400" },
    Thriller: { text: "text-gray-400", border: "border-gray-400", ring: "ring-gray-400", hoverText: "hover:text-gray-400", hoverBorder: "hover:border-gray-400" },
    War: { text: "text-red-400", border: "border-red-400", ring: "ring-red-400", hoverText: "hover:text-red-400", hoverBorder: "hover:border-red-400" },
    Western: { text: "text-yellow-400", border: "border-yellow-400", ring: "ring-yellow-400", hoverText: "hover:text-yellow-400", hoverBorder: "hover:border-yellow-400" },
};

export default function GenreFilter({ genres, state, setState, compact = false }) {
    const toggleGenre = (genre) => {
        const newGenres = state.genre.includes(genre)
            ? state.genre.filter((g) => g !== genre)
            : [...state.genre, genre];
        setState({ ...state, genre: newGenres });
    };

    // Adjust padding and spacing for compact mode
    const gapClass = compact ? "gap-1.5" : "gap-2";
    const pxClass = compact ? "px-2.5" : "px-3";
    const pyClass = compact ? "py-1" : "py-1.5";

    return (
        <div className={`flex flex-wrap ${gapClass}`}>
            {genres.map((g) => {
                const isActive = state.genre.includes(g);
                const color = genreColors[g] || { text: "text-gray-400", border: "border-gray-700", ring: "ring-gray-400" };

                return (
                    <button
                        key={g}
                        onClick={() => toggleGenre(g)}
                        className={clsx(
                            "rounded-full text-xs font-medium border shadow-sm transition-all duration-200 cursor-pointer",
                            pxClass,
                            pyClass,
                            isActive
                                ? clsx(color.border, color.text, "bg-gray-800/30 ring-1", color.ring)
                                : clsx("border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-800/50", color.hoverText, color.hoverBorder)
                        )}
                    >
                        {g}
                    </button>
                );
            })}
        </div>
    );
}
