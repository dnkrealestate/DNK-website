"use client";

import { useEffect, useRef, useState } from "react";

// Measures the available space and works out how many columns + what row
// height let `itemCount` cards fill it edge-to-edge with no scrolling — a
// simple 2D bin-pack rather than a single shrinking column, so ~50 people
// fit comfortably as a grid instead of 50 razor-thin stacked rows.
export function useAutoFitGrid(
  itemCount,
  { minRow = 30, maxRow = 60, targetAspect = 3.2 } = {}
) {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ cols: 2, rows: 1, rowHeight: maxRow });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || itemCount === 0) return;

    const compute = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      if (!width || !height) return;

      // Solve for the column count that keeps cells close to `targetAspect`
      // (width:height) while packing all items into the available area.
      // Always at least 2 columns, even with only a handful of entries.
      let cols = Math.round(Math.sqrt((itemCount * width) / (height * targetAspect)));
      cols = Math.max(2, cols);

      const rows = Math.ceil(itemCount / cols);
      const rowHeight = Math.max(minRow, Math.min(maxRow, height / rows));

      setDims((prev) =>
        prev.cols === cols && prev.rows === rows && prev.rowHeight === rowHeight
          ? prev
          : { cols, rows, rowHeight }
      );
    };

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(el);
    return () => observer.disconnect();
  }, [itemCount, minRow, maxRow, targetAspect]);

  return { containerRef, ...dims };
}
