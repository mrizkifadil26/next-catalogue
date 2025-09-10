"use client";

export default function SearchBox({ state, setState }) {
    return (
        <div className="relative mb-5">
            <input
                type="text"
                placeholder="🔍 Search by title..."
                value={state.search || ""}
                onChange={(e) => setState({ ...state, search: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800/60 px-4 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
            />
        </div>
    );
}
