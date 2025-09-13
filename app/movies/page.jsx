"use client";

import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import Filters from "../components/Filters";
import Grid from "../components/Grid";

export default function MoviePage() {
    const [movies, setMovies] = useState([]);
    const [index, setIndex] = useState({});
    const [suggestions, setSuggestions] = useState(null);
    const [state, setState] = useState({
        genre: [],
        decade: null,
        years: [],
        search: "",
        language: null,
        tags: [],
        group: null,
        selectedSlug: null,    // for title selection
        selectedKey: null      // for actor/director selection
    });

    useEffect(() => {
        fetch("/data/movies.json")
            .then(res => res.json())
            .then(data => setMovies(data.movies));

        fetch("/data/index.json")
            .then(res => res.json())
            .then(data => setIndex(data));

        fetch("/data/suggestions.json")
            .then(res => res.json())
            .then(data => setSuggestions(data));
    }, []);

    const genres = Array.from(new Set(movies.flatMap((m) => m.genres))).sort();
    const languages = Array.from(new Set(movies.map((m) => m.language))).sort();
    const tags = Array.from(new Set(movies.flatMap((m) => m.tags || []))).sort();
    const groups = Array.from(new Set(movies.flatMap((m) => m.group || []))).sort();

    const years = Array.from(new Set(movies.map((m) => m.year))).sort(
        (a, b) => b - a
    );

    const filteredMovies = movies.filter((movie) => {
        // 1️⃣ Exact movie selected
        if (state.selectedSlug) {
            return movie.slug === state.selectedSlug;
        }

        // 2️⃣ Actor or director selected
        if (state.selectedKey) {
            const byActor = index.by_actor?.[state.selectedKey]?.movies || [];
            const byDirector = index.by_director?.[state.selectedKey]?.movies || [];
            const slugs = [...byActor, ...byDirector];
            if (slugs.length > 0) return slugs.includes(movie.slug);
        }

        let pass = true;

        // GENRES
        if (state.genre.length > 0) {
            if (!(movie.genres || []).some((g) => state.genre.includes(g)))
                return false;
        }

        // YEARS / DECADES
        if (state.decade) {
            if (state.years.length > 0) {
                pass = pass && state.years.includes(movie.year);
            } else {
                pass =
                    pass &&
                    movie.year >= state.decade &&
                    movie.year < state.decade + 10;
            }
        }

        // SEARCH (only if no identifier is set)
        if (!state.selectedSlug && !state.selectedKey && state.search) {
            pass = movie.title.toLowerCase().includes(state.search.toLowerCase());
        }

        // LANGUAGE
        if (state.language && movie.language !== state.language) {
            return false;
        }

        // GROUPS
        if (state.group && movie.group !== state.group) {
            return false;
        }

        // TAGS
        if (state.tags.length > 0) {
            if (!(movie.tags || []).some((t) => state.tags.includes(t)))
                return false;
        }

        return pass;
    });

    return (
        <div className="layout">
            {/* Search box */}
            <SearchBox
                state={state}
                setState={setState}
                suggestions={suggestions}
                index={index}
            />

            {/* Filters */}
            <Filters
                genres={genres}
                languages={languages}
                tags={tags}
                groups={groups}
                state={state}
                setState={setState}
            />

            {/* Virtualized Grid */}
            <Grid
                movies={filteredMovies}
            />
        </div>
    );
}
