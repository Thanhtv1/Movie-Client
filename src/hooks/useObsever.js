import { useState } from "react";
import { useEffect } from "react";

export default function useObsever(ref, options) {
  const { rootMargin } = options;
  const [observedEntry, setObservedEntry] = useState(null);

  useEffect(() => {
    if (!ref?.current) return;
    const obsever = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          setObservedEntry(entries);
          obsever.unobserve(entries.target);
        }
      },
      { rootMargin },
      { threshold: 0.7 }
    );
    obsever.observe(ref.current);
  }, [ref, rootMargin]);
  return observedEntry;
}
