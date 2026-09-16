"use client";

import { useEffect, useRef, useState } from "react";

// Defers mounting `children` until the wrapper scrolls near the viewport.
// Used for below-the-fold sections that init a Swiper carousel — each
// Swiper instance does a burst of offsetWidth/getComputedStyle reads on
// mount (forced reflow), so stacking several of them on initial page load
// (as the homepage does) causes unnecessary layout thrashing before the
// user has scrolled anywhere near them.
export default function LazyRender({ children, rootMargin = "300px", minHeight = 400 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return <div ref={ref} style={visible ? undefined : { minHeight }}>{visible ? children : null}</div>;
}
