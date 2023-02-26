import { useEffect, useState } from "react";

const useDebounce = (value, delayTime) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayTime);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delayTime]);

  return debouncedValue;
};

export default useDebounce;
