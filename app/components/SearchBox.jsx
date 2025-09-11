"use client";

export default function SearchBox({ state, setState }) {
    const handleClear = () => setState({ ...state, search: "" });

    return (
        <div className="relative mb-5">
            <input
                type="text"
                placeholder="🔍 Search by title..."
                value={state.search || ""}
                onChange={(e) => setState({ ...state, search: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800/60 px-4 py-2 pr-10 text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
            />
            {state.search && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-gray-700/50 hover:bg-gray-600/70 text-white rounded-full cursor-pointer text-lg"
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
}
