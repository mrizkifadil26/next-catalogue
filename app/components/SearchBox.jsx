"use client";

import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function SearchBox({ state, setState, suggestions, index }) {
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const listRef = useRef(null);

    const handleClear = () => {
        setQuery("");
        setShowSuggestions(false);
        setState({
            ...state,
            search: "",
            selectedSlug: null,
            selectedKey: null,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (highlightedIndex >= 0 && filteredFlat[highlightedIndex]) {
            handleSelect(filteredFlat[highlightedIndex]);
        } else {
            const val = query.trim();

            if (!val) {
                // Reset when empty
                setState({
                    ...state,
                    search: "",
                    selectedSlug: null,
                    selectedKey: null,
                });
            } else {
                setState({
                    ...state,
                    search: val,
                    selectedSlug: null,
                    selectedKey: null,
                });
            }
        }

        setShowSuggestions(false);
    };

    const handleSelect = (s) => {
        setQuery(s.label); // keep text in input
        setShowSuggestions(false);
        setHighlightedIndex(-1);

        if (s.type === "title") {
            setState({
                ...state,
                search: s.label,
                selectedSlug: s.slug,
                selectedKey: null,
            });
        } else if (s.type === "actor" || s.type === "director") {
            setState({
                ...state,
                search: s.label,
                selectedSlug: null,
                selectedKey: s.id,
            });
        }
    };

    // Groups
    const groups = [
        {
            type: "title",
            label: "Titles",
            items: (suggestions?.titles || []).map((t) => ({
                type: "title",
                label: t.label,
                slug: t.slug,
            })),
        },
        {
            type: "actor",
            label: "Actors",
            items: (suggestions?.actors || []).map((a) => ({
                type: "actor",
                label: a.label,
                id: a.id,
            })),
        },
        {
            type: "director",
            label: "Directors",
            items: (suggestions?.directors || []).map((d) => ({
                type: "director",
                label: d.label,
                id: d.id,
            })),
        },
    ];

    // Filter + flatten, cap at 6
    const filteredFlat = query
        ? groups.flatMap((g) =>
            g.items
                .filter((s) =>
                    s.label.toLowerCase().includes(query.toLowerCase())
                )
                .map((s) => ({ ...s, groupLabel: g.label }))
        )
        : [];

    const limited = filteredFlat.slice(0, 6);

    // Regroup for UI
    const filteredGroups = limited.reduce((acc, item) => {
        let group = acc.find((g) => g.label === item.groupLabel);
        if (!group) {
            group = { label: item.groupLabel, items: [] };
            acc.push(group);
        }
        group.items.push(item);
        return acc;
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!showSuggestions || limited.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev < limited.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : limited.length - 1
            );
        } else if (e.key === "Enter") {
            if (highlightedIndex >= 0 && limited[highlightedIndex]) {
                e.preventDefault();

                handleSelect(limited[highlightedIndex]);
            }
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
            setHighlightedIndex(-1);
        }
    };

    useEffect(() => {
        setHighlightedIndex(-1);
    }, [query]);

    return (
        <div className="relative w-full sm:mb-4">
            <form onSubmit={handleSubmit} className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search movies, actors, directors..."
                    value={query}
                    onChange={(e) => {
                        const val = e.target.value;
                        setQuery(val);
                        setShowSuggestions(true);

                        if (val === "") {
                            // Same effect as Clear
                            setState({
                                ...state,
                                search: "",
                                selectedSlug: null,
                                selectedKey: null,
                            });
                        }
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 pr-12 py-3 rounded-xl text-base bg-gray-800/70 border border-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 
                        placeholder-gray-400 text-gray-100 shadow-sm"
                />

                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center 
                            w-6 h-6 rounded-full bg-gray-700/50 hover:bg-gray-600/70 text-gray-200 cursor-pointer"
                        aria-label="Clear search"
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                )}
            </form>

            {/* Dropdown suggestions */}
            {showSuggestions && filteredGroups.length > 0 && (
                <ul
                    ref={listRef}
                    className="absolute left-0 right-0 mt-2 bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-700 z-50
                                max-h-[320px] overflow-y-auto scrollbar-none">
                    {filteredGroups.map((group, gi) => (
                        <li key={gi}>
                            <div
                                className={clsx(
                                    "px-4 pr-6 pt-2 pb-1 text-[11px] font-semibold text-gray-400 tracking-wider uppercase",
                                    gi > 0 && "mt-2 border-t border-gray-700"
                                )}
                            >
                                {group.label}
                            </div>

                            {group.items.map((s, i) => {
                                const flatIndex = limited.indexOf(s);
                                return (
                                    <div
                                        key={i}
                                        onClick={() => handleSelect(s)}
                                        className={clsx(
                                            "px-4 py-1.5 cursor-pointer text-gray-100",
                                            flatIndex === highlightedIndex
                                                ? "bg-gray-700"
                                                : "hover:bg-gray-700"
                                        )}
                                    >
                                        {s.label}
                                    </div>
                                );
                            })}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
