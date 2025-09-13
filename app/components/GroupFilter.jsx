"use client";

export default function GroupsFilter({ groups, state, setState, compact = false }) {
    const toggleGroup = (g) => {
        setState({
            ...state,
            group: state.group === g ? null : g,
        });
    };

    // Compact layout adjustments
    const gapClass = compact ? "gap-1.5" : "gap-2";
    const pxClass = compact ? "px-2.5" : "px-3";
    const pyClass = compact ? "py-1" : "py-1.5";

    return (
        <div className={`flex flex-wrap ${gapClass}`}>
            {groups.map((group) => {
                const isActive = state.group == group;
                return (
                    <button
                        key={group}
                        onClick={() => toggleGroup(group)}
                        className={`rounded-full text-xs font-medium border transition cursor-pointer ${pxClass} ${pyClass} ${isActive
                            ? "border-pink-500 text-pink-300 bg-pink-600/30"
                            : "border-gray-700 text-gray-400 bg-gray-800 hover:border-pink-500 hover:text-pink-300"
                            }`}
                    >
                        {toTitleCase(group)}
                    </button>
                );
            })}
        </div>
    );
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
}
