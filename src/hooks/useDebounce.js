// hooks/useDebounce.js
import { useState, useEffect } from 'react';

const useDebounce = (callback, delay) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Clear the timer on cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  const debouncedCallback = (...args) => {
    // Clear existing timer
    clearTimeout(timer);
    
    // Create a new timer
    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);

    // Update the timer
    setTimer(newTimer);
  };

  return debouncedCallback;
};

export default useDebounce;
