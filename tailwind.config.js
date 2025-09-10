// tailwind.config.js
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        {
            pattern: /(bg|text|border|ring)-(red|orange|yellow|green|blue|indigo|purple|pink|gray|slate|rose|violet|cyan|teal|amber|fuchsia)-(400|300)/,
        },
    ],
    theme: {
        extend: {},
    },
};
