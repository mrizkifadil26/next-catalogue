"use client";

import React from "react";
import { AutoSizer, Grid } from "react-virtualized";
import Card from "./Card";

export default function VirtualizedGrid({ movies, cardWidth = 220, cardHeight = 380 }) {
  return (
    <div className="w-full h-[80vh]">
      <AutoSizer>
        {({ width, height }) => {
          const columnCount = Math.max(Math.floor(width / cardWidth), 1);
          const rowCount = Math.ceil(movies.length / columnCount);

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={cardWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={cardHeight}
              width={width}
              cellRenderer={({ columnIndex, rowIndex, key, style }) => {
                const index = rowIndex * columnCount + columnIndex;
                if (index >= movies.length) return null;

                return (
                  <div key={key} style={style} className="p-2">
                    <Card movie={movies[index]} />
                  </div>
                );
              }}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
}
