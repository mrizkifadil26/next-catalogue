"use client";

import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const MIN = 1900;
const MAX = 2025;
const STEP = 10;

export default function YearRange({ state, setState }) {
    const [open, setOpen] = useState(false);

    const values = [
        state.minYear ?? MIN,
        state.maxYear ?? MAX
    ];

    const handleChange = (vals) => {
        setState({ ...state, minYear: vals[0], maxYear: vals[1] });
    };

    const resetYears = () => {
        setState({ ...state, minYear: null, maxYear: null });
    };

    const years =
        state.minYear && state.maxYear
            ? Array.from(
                { length: state.maxYear - state.minYear + 1 },
                (_, i) => state.minYear + i
            )
            : [];

    return (
        <div className="rounded-lg border border-gray-800 bg-gray-900/40 shadow-md">
            {/* Toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800/60"
            >
                <span>📅 Year Range</span>
                <span className="text-xs">{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <div className="p-4">
                    <Range
                        values={values}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={handleChange}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                ref={props.ref}
                                className="h-2 w-full rounded bg-gray-700"
                                style={{
                                    background: getTrackBackground({
                                        values,
                                        colors: ["#374151", "#6366F1", "#374151"],
                                        min: MIN,
                                        max: MAX,
                                    }),
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props, index, isDragged }) => (
                            <div
                                {...props}
                                className="relative flex items-center justify-center h-6 w-6 rounded-full bg-pink-500 shadow-lg focus:outline-none"
                            >
                                {/* Label above */}
                                <div className="absolute -top-7 text-xs font-medium text-gray-200 bg-gray-800 px-2 py-0.5 rounded shadow">
                                    {values[index]}
                                </div>

                                {/* Inner bar */}
                                <div
                                    className={`h-3 w-1 ${isDragged ? "bg-indigo-400" : "bg-gray-300"
                                        }`}
                                />
                            </div>
                        )}
                    />

                    {/* Reset button */}
                    <button
                        onClick={resetYears}
                        className="mt-3 text-xs text-pink-400 hover:underline"
                    >
                        Reset
                    </button>

                    {/* Year pills */}
                    {years.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {years.map((y) => (
                                <span
                                    key={y}
                                    className="px-2 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-300"
                                >
                                    {y}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
