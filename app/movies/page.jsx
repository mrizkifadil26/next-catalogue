"use client";

import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import Grid from "../components/Grid";

export default function TVPage() {
    const [movies, setMovies] = useState([]);

    const [state, setState] = useState({
        genre: [],
        decade: null,
        years: [],
        search: "",
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
                    pass && movie.year >= state.decade && movie.year < state.decade + 10;
            }
        }

        // SEARCH
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

            {/* Filters */}
            <Filters
                genres={genres}
                years={years}
                state={state}
                setState={setState}
            />

            {/* Virtualized Grid */}
            <Grid
                movies={filteredMovies}
                limit={20}
            />
        </div>
    );
}
