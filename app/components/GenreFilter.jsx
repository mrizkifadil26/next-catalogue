"use client";

import { useState } from "react";

// Soft pastel colors
const genreColors = {
    Action: { text: "text-red-400", border: "border-red-400", ring: "ring-red-400" },
    Adventure: { text: "text-orange-400", border: "border-orange-400", ring: "ring-orange-400" },
    Animation: { text: "text-pink-400", border: "border-pink-400", ring: "ring-pink-400" },
    Comedy: { text: "text-yellow-400", border: "border-yellow-400", ring: "ring-yellow-400" },
    Crime: { text: "text-slate-400", border: "border-slate-400", ring: "ring-slate-400" },
    Documentary: { text: "text-cyan-400", border: "border-cyan-400", ring: "ring-cyan-400" },
    Drama: { text: "text-purple-400", border: "border-purple-400", ring: "ring-purple-400" },
    Family: { text: "text-green-400", border: "border-green-400", ring: "ring-green-400" },
    Fantasy: { text: "text-indigo-400", border: "border-indigo-400", ring: "ring-indigo-400" },
    History: { text: "text-amber-400", border: "border-amber-400", ring: "ring-amber-400" },
    Horror: { text: "text-rose-400", border: "border-rose-400", ring: "ring-rose-400" },
    Music: { text: "text-fuchsia-400", border: "border-fuchsia-400", ring: "ring-fuchsia-400" },
    Mystery: { text: "text-violet-400", border: "border-violet-400", ring: "ring-violet-400" },
    Romance: { text: "text-pink-400", border: "border-pink-400", ring: "ring-pink-400" },
    "Science Fiction": { text: "text-blue-400", border: "border-blue-400", ring: "ring-blue-400" },
    "TV Movie": { text: "text-teal-400", border: "border-teal-400", ring: "ring-teal-400" },
    Thriller: { text: "text-gray-400", border: "border-gray-400", ring: "ring-gray-400" },
    War: { text: "text-red-400", border: "border-red-400", ring: "ring-red-400" },
    Western: { text: "text-yellow-400", border: "border-yellow-400", ring: "ring-yellow-400" },
};


export default function GenreFilter({ genres, state, setState }) {
    const [open, setOpen] = useState(true);

    const toggleGenre = (genre) => {
        const newGenres = state.genre.includes(genre)
            ? state.genre.filter((g) => g !== genre)
            : [...state.genre, genre];
        setState({ ...state, genre: newGenres });
    };

    return (
        <div className="rounded-lg border border-gray-800 bg-gray-900/40 shadow-md overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800/60 transition cursor-pointer"
            >
                <span className="flex items-center gap-2">
                    🎭 <span>Genres</span>
                </span>
                <span className="text-xs text-gray-400">{open ? "▲" : "▼"}</span>
            </button>

            {/* Pills */}
            {open && (
                <div className="p-4 flex flex-wrap gap-2">
                    {genres.map((g) => {
                        const isActive = state.genre.includes(g);
                        const color = genreColors[g] || { text: "text-gray-400", border: "border-gray-700", ring: "ring-gray-400" };
                        // const color = genreColors[g]

                        return (
                            <button
                                key={g}
                                onClick={() => toggleGenre(g)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm transition-all duration-200 cursor-pointer
        ${isActive
                                        ? `${color.border} ${color.text} bg-gray-800/30 ring-1 ${color.ring}`
                                        : `border-gray-700 bg-gray-800 text-gray-400 hover:${color.border} hover:${color.text} hover:bg-gray-800/50`
                                    }`}
                            >
                                {g}
                            </button>
                        );
                    })}

                </div>
            )}
        </div>
    );
}
