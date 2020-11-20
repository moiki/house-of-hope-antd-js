import { useState, useEffect } from "react";

export const useScreenObserverHook = (options) => {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);

    if (ref) {
      obs.observe(ref);
    }
    return () => {
      if (ref) {
        obs.unobserve(ref);
      }
    };
  }, [options, ref]);
  return { setRef, visible };
};
