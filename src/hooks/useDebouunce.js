import {useEffect, useState} from 'react';

export function useDebounce(value) {
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
      console.log("Debounce started");
      const timedId = setTimeout(() => {
        console.log("Debounce fineshed");
        setDebouncedSearch(value);
      }, 500);
  
      return () => {clearTimeout(timedId)
        console.log("clean-up -> clear timer");
      }
    }, [value])

  return debouncedSearch;
}
