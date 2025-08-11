import { useEffect, useRef, useState } from "react";

export function useMeasureElementWidth(deps: unknown[] = []) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { measureRef, width };
}
