"use client";

import SearchBox from "./SearchBox";
import GenreFilter from "./GenreFilter";
import DecadeSlider from "./DecadeSlider";

export default function Filters({ genres, state, setState }) {
  return (
    <aside className="w-full max-w-7xl mx-auto mb-6">
      <SearchBox state={state} setState={setState} />

      <div className="grid gap-6 md:grid-cols-2">
        <GenreFilter genres={genres} state={state} setState={setState} />
        <DecadeSlider state={state} setState={setState} />
      </div>
    </aside>
  );
}
