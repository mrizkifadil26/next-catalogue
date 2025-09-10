"use client";

import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import Grid from "../components/Grid";

export default function TVPage() {
    const [movies, setMovies] = useState([]);
    const [state, setState] = useState({
        genre: [],
        year: null,
        search: "",
        limit: 30
    });

    useEffect(() => {
        fetch("/data/movies.json")
            .then(res => res.json())
            .then(data => setMovies(data.movies));
    }, []);

    const genres = Array.from(new Set(movies.flatMap(m => m.genres))).sort();
    const years = Array.from(new Set(movies.map(m => m.year))).sort((a, b) => b - a);

    const filteredMovies = movies.filter((movie) => {
        // GENRES: only filter if at least one genre is selected
        if (state.genre.length > 0) {
            // Ensure movie.genres exists
            if (!(movie.genres || []).some((g) => state.genre.includes(g))) return false;
        }

        // YEAR: filter only if a year is selected
        if (state.year && movie.year !== state.year) return false;

        // SEARCH: filter only if search has text
        if (state.search && !movie.title.toLowerCase().includes(state.search.toLowerCase())) return false;

        return true;
    });


    return (
        <div className="layout">
            <h1>Movie Catalogue</h1>
            <Filters genres={genres} years={years} state={state} setState={setState} />
            <Grid movies={filteredMovies} limit={state.limit} />
            {state.limit < filteredMovies.length && (
                <button onClick={() => setState({ ...state, limit: state.limit + 30 })}>
                    Load More
                </button>
            )}
        </div>
    );
}
