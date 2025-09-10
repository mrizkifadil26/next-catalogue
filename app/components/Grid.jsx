import Card from "./Card";

export default function Grid({ movies, limit }) {
    return (
        <div
            className="
        grid gap-6
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5
        2xl:grid-cols-6
      "
        >
            {movies.slice(0, limit).map((m) => (
                <Card key={m.slug} movie={m} />
            ))}
        </div>
    );
}
