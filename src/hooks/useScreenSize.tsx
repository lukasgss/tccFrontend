import { useLayoutEffect, useState } from "react";

export default function useMapSize(mapSize?: number) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const defaultMapSize = mapSize ?? 500;

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth > 600 ? defaultMapSize : window.innerWidth * 0.85;
      const height = window.innerHeight > 600 ? defaultMapSize : window.innerHeight * 0.85;
      setSize({ width, height });
    }
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
