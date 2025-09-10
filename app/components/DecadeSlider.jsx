"use client";

import { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";

const MIN = 1900;
const MAX = 2020; // last decade = 2020s
const STEP = 10;
const CURRENT_YEAR = 2025;

export default function DecadeSlider({ state, setState }) {
    const [open, setOpen] = useState(false);

    // local state for smooth dragging
    const [localValue, setLocalValue] = useState([state.decade ?? MIN]);

    useEffect(() => {
        if ((state.decade ?? MIN) !== localValue[0]) {
            setLocalValue([state.decade ?? MIN]);
        }
    }, [state.decade]);

    const handleChange = (vals) => {
        setLocalValue(vals);
    };

    const handleFinalChange = (vals) => {
        setState({
            ...state,
            decade: vals[0],
            years: [], // reset selected years when slider moves
        });
    };

    /*
    const values = [state.decade ?? MIN];

    const handleChange = (vals) => {
        setState({
            ...state,
            decade: vals[0],
            years: [], // reset selected years when slider moves
        });
    };
    */

    const reset = () => {
        setState({ ...state, decade: null, years: [] });
    };

    // Generate decade years, but cap at CURRENT_YEAR
    const years =
        state.decade != null
            ? Array.from({ length: 10 }, (_, i) => state.decade + i).filter(
                (y) => y <= CURRENT_YEAR
            )
            : [];

    const toggleYear = (y) => {
        const newYears = state.years.includes(y)
            ? state.years.filter((yr) => yr !== y)
            : [...state.years, y];
        setState({ ...state, years: newYears });
    };

    return (
        <div className="rounded-lg border border-gray-800 bg-gray-900/40 shadow-md">
            {/* Toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800/60"
            >
                <span>📅 Decade</span>
                <span className="text-xs">{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <div className="p-4">
                    {/* Slider */}
                    <Range
                        values={localValue}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={handleChange}
                        onFinalChange={handleFinalChange} // commit on drag end
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                ref={props.ref}
                                className="h-2 w-full rounded"
                                style={{
                                    background: getTrackBackground({
                                        values: localValue,
                                        colors: ["#4f46e5", "#ec4899"],
                                        min: MIN,
                                        max: MAX,
                                    }),
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props, index, isDragged }) => {
                            const { key, ...restProps } = props; // extract key

                            return (
                                <div {...restProps} key={key} className="relative">
                                    <div
                                        className={`h-6 w-6 rounded-full border-2 shadow-lg flex items-center justify-center transition ${isDragged
                                            ? "border-pink-400 bg-gradient-to-br from-indigo-500 to-pink-500 shadow-pink-500/40"
                                            : "border-gray-400 bg-gray-700"
                                            }`}
                                    >
                                        <div
                                            className={`h-2 w-2 rounded-full ${isDragged ? "bg-white" : "bg-gray-300"
                                                }`}
                                        />
                                    </div>

                                    {isDragged && (
                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-200 bg-gray-800/90 px-2 py-0.5 rounded-full shadow border border-gray-700">
                                            {localValue[index]}s
                                        </div>
                                    )}
                                </div>
                            )
                        }}
                    />

                    {/* Reset */}
                    <button
                        onClick={reset}
                        className="mt-3 text-xs text-pink-400 hover:underline"
                    >
                        Reset
                    </button>

                    {/* Year pills */}
                    {years.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {years.map((y) => {
                                const isActive = state.years.includes(y);
                                return (
                                    <button
                                        key={y}
                                        onClick={() => toggleYear(y)}
                                        className={`px-2 py-1 rounded-full text-xs transition border ${isActive
                                            ? "border-indigo-500 bg-indigo-600/30 text-indigo-200 font-semibold"
                                            : "border-gray-700 bg-gray-800 text-gray-400 hover:border-indigo-500 hover:text-indigo-300"
                                            }`}
                                    >
                                        {y}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
