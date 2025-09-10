"use client";

import { FixedSizeGrid as Grid } from "react-window";
import Card from "./Card";

export default function VirtualizedGrid({
    movies,
    columnCount = 5,
    rowHeight = 350,
}) {
    const columnWidth = 200; // width of each card
    const rowCount = Math.ceil(movies.length / columnCount);

    return (
        <div className="w-full overflow-auto">
            <Grid
                columnCount={columnCount}
                columnWidth={columnWidth}
                height={800} // viewport height
                rowCount={rowCount}
                rowHeight={rowHeight}
                width={columnCount * columnWidth}
            >
                {({ columnIndex, rowIndex, style }) => {
                    const movieIndex = rowIndex * columnCount + columnIndex;
                    if (movieIndex >= movies.length) return null;
                    const movie = movies[movieIndex];
                    return (
                        <div style={style} className="p-2">
                            <Card movie={movie} />
                        </div>
                    );
                }}
            </Grid>
        </div>
    );
}
