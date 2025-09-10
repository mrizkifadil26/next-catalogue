"use client";

import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import Grid from "../components/Grid";

export default function TVPage() {
    const [movies, setMovies] = useState([]);

    const [state, setState] = useState({
        genre: [],
        decade: null,   // 👈 add decade
        years: [],      // 👈 multi-year pills
        search: "",
        limit: 30,
    });

    useEffect(() => {
        fetch("/data/movies.json")
            .then((res) => res.json())
            .then((data) => setMovies(data.movies));
    }, []);

    const genres = Array.from(new Set(movies.flatMap((m) => m.genres))).sort();
    const years = Array.from(new Set(movies.map((m) => m.year))).sort(
        (a, b) => b - a
    );

    const filteredMovies = movies.filter((movie) => {
        let pass = true;

        // 🎭 GENRES
        if (state.genre.length > 0) {
            if (!(movie.genres || []).some((g) => state.genre.includes(g)))
                return false;
        }

        // 📅 YEARS / DECADES
        if (state.decade) {
            if (state.years.length > 0) {
                // specific years selected
                pass = pass && state.years.includes(movie.year);
            } else {
                // whole decade
                pass =
                    pass &&
                    movie.year >= state.decade &&
                    movie.year < state.decade + 10;
            }
        }

        // 🔍 SEARCH
        if (
            state.search &&
            !movie.title.toLowerCase().includes(state.search.toLowerCase())
        )
            return false;

        return pass;
    });

    return (
        <div className="layout">
            <h1 className="text-2xl font-bold mb-4">Movie Catalogue</h1>

            {/* Filters include genre + search + new decade slider */}
            <Filters
                genres={genres}
                years={years}
                state={state}
                setState={setState}
            />

            {/* Grid of movies */}
            <Grid movies={filteredMovies} limit={state.limit} />

            {/* Load more */}
            {state.limit < filteredMovies.length && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() =>
                            setState({ ...state, limit: state.limit + 30 })
                        }
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded shadow hover:bg-indigo-700 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
