 import { useState,useEffect } from 'react';
 import { useDebounce } from './useDebouunce';

export function useLocalStorage() {
    const [searchText, setSearchText] = useState(() => {
        const savedText = localStorage.getItem('searchText');
        return savedText ? savedText : "";
    });
    const debouncedSearch = useDebounce(searchText);

    useEffect(() => {
        if (debouncedSearch) {
            localStorage.setItem('searchText', debouncedSearch);
        }
        console.log(`${debouncedSearch} is set to localstorage`);
    }, [debouncedSearch]);


    return {searchText, setSearchText, debouncedSearch};
}

