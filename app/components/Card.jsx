function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

// Soft, cinematic colors for genres
const genreColors = {
  Action: "bg-red-600/60",
  Adventure: "bg-orange-500/60",
  Animation: "bg-pink-500/60",
  Comedy: "bg-yellow-500/50",
  Crime: "bg-slate-500/50",
  Documentary: "bg-cyan-500/50",
  Drama: "bg-purple-500/60",
  Family: "bg-green-500/50",
  Fantasy: "bg-indigo-500/60",
  History: "bg-amber-500/50",
  Horror: "bg-rose-500/50",
  Music: "bg-fuchsia-500/50",
  Mystery: "bg-violet-500/50",
  Romance: "bg-pink-400/50",
  "Science Fiction": "bg-teal-500/50",
  Thriller: "bg-gray-500/50",
  War: "bg-red-500/50",
  Western: "bg-yellow-400/50",
};

// Soft dark colors for language and tags
const langColor = "bg-green-800/70"; // soft dark green
const tagColor = "bg-pink-800/70"; // soft dark pink

export default function Card({ movie }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-gray-900/80 border border-gray-800 hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col h-full">
      {/* Poster */}
      <div className="relative w-full h-72 flex-shrink-0">
        <img
          src={
            movie.poster ? `https://image.tmdb.org/t/p/w342${movie.poster}` : ""
          }
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title + Year */}
        <div className="flex-1 flex flex-col justify-center space-y-1">
          <h3 className="font-semibold text-base md:text-lg text-gray-100 line-clamp-2">
            {movie.title}{" "}
            {movie.original_title && movie.original_title !== movie.title && (
              <span className="text-gray-400 text-sm">
                ({movie.original_title})
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-400">{movie.year}</p>
        </div>

        {/* Genres */}
        <div className="flex-grow flex flex-wrap gap-2 mt-2 items-start">
          {(movie.genres || []).map((g) => {
            const color = genreColors[g] || "bg-gray-500/50";
            return (
              <span
                key={g}
                className={`text-xs px-3 py-1 rounded-full text-white ${color}`}
              >
                {toTitleCase(g)}
              </span>
            );
          })}
        </div>

        {/* Language + Tags */}
        <div className="flex-1 flex justify-between mt-4 items-center">
          {movie.language ? (
            <span
              className={`text-xs px-3 py-1 rounded-md text-white ${langColor} cursor-auto`}
            >
              {toTitleCase(movie.language)}
            </span>
          ) : (
            <div className="w-0" />
          )}

          {movie.tags && movie.tags.length > 0 && (
            <div className="flex gap-2">
              {movie.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-3 py-1 rounded-md text-white ${tagColor} cursor-auto`}
                >
                  {toTitleCase(tag)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
