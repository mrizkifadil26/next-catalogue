import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";

export default function Grid({ movies = [], limit = 12 }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Reset items whenever movies or limit changes
    useEffect(() => {
        if (movies.length > 0) {
            const initial = movies.slice(0, limit);
            setItems(initial);
        } else {
            setItems([]);
        }
    }, [movies, limit]);

    const fetchMore = async () => {
        if (loading || items.length >= movies.length) return;

        setLoading(true);

        // Simulate network delay (1s)
        setTimeout(() => {
            const nextItems = movies.slice(items.length, items.length + limit);

            // Merge safely without duplicates
            setItems((prev) => {
                const merged = [...prev, ...nextItems];
                return Array.from(new Map(merged.map((m) => [m.slug, m])).values());
            });

            setLoading(false);
        }, 1000);
    };

    return (
        <InfiniteScroll
            dataLength={items.length}
            next={fetchMore}
            hasMore={items.length < movies.length}
            loader={
                <div className="flex items-center justify-center py-6 space-x-3 text-gray-400">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="animate-pulse">Loading more movies...</span>
                </div>
            }
            endMessage={
                <p className="text-center py-6 text-gray-500 italic">
                    🎬 You’ve reached the end!
                </p>
            }
            scrollThreshold={0.9}
            style={{ overflow: "visible" }}
        >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {items.map((m) => (
                    <div key={m.slug} className="group relative">
                        <div className="h-full transform transition-transform duration-300 group-hover:scale-105 z-10">
                            <Card movie={m} />
                        </div>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
}
