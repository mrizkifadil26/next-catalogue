"use client";

const groupedLanguages = {
    "Europe": [
        "Catalan", "Czech", "Danish", "Dutch", "English", "Finnish", "French", "German",
        "Greek", "Hungarian", "Icelandic", "Irish", "Italian", "Latvian", "Norwegian",
        "Polish", "Portuguese", "Romanian", "Russian", "Serbian", "Serbo-Croatian", "Slovak", "Spanish", "Swedish"
    ],
    "Asia": [
        "Arabic", "Hindi", "Indonesian", "Japanese", "Kazakh", "Korean", "Malay", "Malayalam",
        "Mandarin", "Persian", "Sundanese", "Tagalog", "Telugu", "Thai", "Turkish", "Urdu", "Vietnamese"
    ],
    "Africa": ["Igbo", "Wolof"],
    "Other / Unknown": ["No Language"]
};


export default function LanguageFilter({ languages, state, setState, compact = false }) {
    const toggleLanguage = (lang) => {
        setState({
            ...state,
            language: state.language === lang ? null : lang,
        });
    };

    // Compact layout adjustments
    const gapClass = compact ? "gap-1.5" : "gap-2";
    const pxClass = compact ? "px-2.5" : "px-3";
    const pyClass = compact ? "py-0.5" : "py-1.5";
    const mtClass = compact ? "mt-1" : "mt-2";

    return (
        <div className="flex flex-col space-y-4"> {/* space between groups */}
            {Object.entries(groupedLanguages).map(([group, langs]) => (
                <div key={group} className="flex flex-col space-y-2"> {/* space between header and pills / between pill rows */}
                    <h4 className="text-gray-400 text-xs font-semibold">{group}</h4>
                    <div className={`flex flex-wrap ${gapClass}`}>
                        {langs.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => toggleLanguage(lang)}
                                className={`rounded-full text-xs font-medium border transition cursor-pointer ${pxClass} ${pyClass} ${state.language === lang
                                    ? "border-indigo-500 text-indigo-300 bg-indigo-600/30"
                                    : "border-gray-700 text-gray-400 bg-gray-800 hover:border-indigo-500 hover:text-indigo-300"
                                    }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
