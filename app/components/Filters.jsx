"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

import GenreFilter from "./GenreFilter";
import DecadeSlider from "./DecadeSlider";
import LanguageFilter from "./LanguageFilter";
import TagsFilter from "./TagsFilter";
import GroupFilter from "./GroupFilter";

export default function Filters({ genres, languages, tags, groups, state, setState }) {
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) setHeight(ref.current.scrollHeight);
    }, [genres, languages, tags, groups, state, open]);

    // Helper to remove a filter
    const removeFilter = (type, value) => {
        switch (type) {
            case "genre":
                setState({ ...state, genre: state.genre.filter((g) => g !== value) });
                break;
            case "year":
                setState({ ...state, years: state.years.filter((y) => y !== value) });
                break;
            case "decade":
                setState({ ...state, decade: null, years: [] });
                break;
            case "language":
                setState({ ...state, language: null });
                break;
            case "tag":
                setState({ ...state, tags: state.tags.filter((t) => t !== value) });
                break;
            case "group":
                setState({ ...state, group: null });
                break;
        }
    };

    // Generate selected filter pills
    const selectedFilters = [
        ...state.genre.map((g) => ({ type: "genre", value: g })),
        ...(state.decade ? [{ type: "decade", value: `${state.decade}s` }] : []),
        ...state.years.map((y) => ({ type: "year", value: y })),
        ...(state.language ? [{ type: "language", value: state.language }] : []),
        ...state.tags.map((t) => ({ type: "tag", value: t })),
        ...(state.group ? [{ type: "group", value: state.group }] : []),
    ];

    return (
        <section className="w-full max-w-7xl mx-auto mb-2 sm:mb-6">
            <div className="flex flex-wrap items-center mb-2">
                {/* Selected Filter Pills */}
                <div className="flex flex-wrap gap-3 flex-1">
                    {selectedFilters.map((f, idx) => {
                        // Determine color classes for pill
                        const colorClass =
                            f.type === "genre"
                                ? "text-red-400 border-red-400 bg-red-500/30 hover:bg-red-500/40"
                                : f.type === "decade" || f.type === "year"
                                    ? "text-indigo-400 border-indigo-400 bg-indigo-500/30 hover:bg-indigo-500/40"
                                    : f.type === "language"
                                        ? "text-purple-400 border-purple-400 bg-purple-500/30 hover:bg-purple-500/40"
                                        : f.type === "tag"
                                            ? "text-pink-400 border-pink-400 bg-pink-500/30 hover:bg-pink-500/40"
                                            : f.type === "group"
                                                ? "text-green-400 border-green-400 bg-green-500/30 hover:bg-green-500/40"
                                                : "text-gray-400 border-gray-400 bg-gray-500/30 hover:bg-gray-500/40";

                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    "flex items-center gap-1.5 text-sm font-medium pl-4 pr-2 py-1.5 rounded-full border transition select-none",
                                    colorClass
                                )}
                                style={{ lineHeight: 1.2 }}
                            >
                                <span className="whitespace-nowrap">{`${toTitleCase(f.type)}: ${toTitleCase(f.value)}`}</span>
                                <button
                                    onClick={() => removeFilter(f.type, f.value)}
                                    className={clsx(
                                        "flex items-center justify-center w-5 h-5 rounded-full hover:brightness-125 cursor-pointer",
                                        f.type === "genre"
                                            ? "text-red-400"
                                            : f.type === "decade" || f.type === "year"
                                                ? "text-indigo-400"
                                                : f.type === "language"
                                                    ? "text-purple-400"
                                                    : f.type === "tag"
                                                        ? "text-pink-400"
                                                        : f.type === "group"
                                                            ? "text-green-400"
                                                            : "text-gray-400"
                                    )}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3 h-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Clear All Button */}
                {selectedFilters.length > 0 && (
                    <button
                        className="flex items-center justify-center text-sm px-4 py-1 rounded-xl border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition cursor-pointer"
                        onClick={() =>
                            setState({
                                ...state,
                                genre: [],
                                decade: null,
                                years: [],
                                language: null,
                                tags: [],
                                groups: [],
                            })
                        }
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Filters dropdown */}
            <div className="relative w-full mt-2">
                <button
                    onClick={() => setOpen(!open)}
                    className={clsx(
                        "w-full flex justify-between items-center px-4 py-3 text-sm font-semibold text-gray-300 bg-gray-900/40 border border-gray-800 transition cursor-pointer",
                        open
                            ? "rounded-t-xl rounded-b-none" // when open, merge with dropdown
                            : "rounded-t-xl rounded-b-xl" // normal rounded corners on bottom
                    )}
                >
                    <span>🔧 Filters</span>
                    <span className="text-xs text-gray-400">{open ? "▲" : "▼"}</span>
                </button>

                <div
                    className={clsx(
                        "overflow-hidden transition-all ease-in-out",
                        open
                            ? "opacity-100 duration-500 rounded-b-lg bg-gray-900/90"
                            : "opacity-0 duration-200 rounded-b-none bg-transparent"
                    )}
                    style={{ maxHeight: open ? `${height}px` : 0 }}
                >
                    <div ref={ref} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min">
                        {/* Left column */}
                        <div className="flex flex-col gap-4">
                            {/* Genres */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-300 text-sm font-semibold">Genres</h3>
                                    <button
                                        onClick={() => setState({ ...state, genre: [] })}
                                        className="text-xs text-pink-400 hover:underline cursor-pointer"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <GenreFilter genres={genres} state={state} setState={setState} compact />
                            </div>

                            {/* Decade */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-300 text-sm font-semibold">Decade</h3>
                                    <button
                                        onClick={() => setState({ ...state, decade: null, years: [] })}
                                        className="text-xs text-pink-400 hover:underline cursor-pointer"
                                    >
                                        Reset
                                    </button>
                                </div>
                                <DecadeSlider state={state} setState={setState} compact />
                            </div>

                            {/* Tags */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-300 text-sm font-semibold">Tags</h3>
                                    <button
                                        onClick={() => setState({ ...state, tags: [] })}
                                        className="text-xs text-pink-400 hover:underline cursor-pointer"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <TagsFilter tags={tags} state={state} setState={setState} compact />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-300 text-sm font-semibold">Groups</h3>
                                    <button
                                        onClick={() => setState({ ...state, groups: [] })}
                                        className="text-xs text-pink-400 hover:underline cursor-pointer"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <GroupFilter groups={groups} state={state} setState={setState} compact />
                            </div>
                        </div>

                        {/* Right column */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-gray-300 text-sm font-semibold">Language</h3>
                                <button
                                    onClick={() => setState({ ...state, language: null })}
                                    className="text-xs text-pink-400 hover:underline cursor-pointer"
                                >
                                    Clear
                                </button>
                            </div>
                            <LanguageFilter languages={languages} state={state} setState={setState} compact />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
}