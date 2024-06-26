import { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const interval = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(interval);
  }, [delay]);
};

export default useInterval;
