import { debounce } from 'debounce';
import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from 'context/AppContext';
import { AppContextProps } from 'types/items';

const TIME_DELAY_MS = 1000;

const SearchField: React.FC = () => {
    console.log("RENDER - Search field");
    const {searchQuery, setSearchQuery } = useContext(AppContext) as AppContextProps;
    const [searchedText, setSearchedText] = useState(searchQuery);

    const delayedSetSearch = useCallback<(s: string) => void>(debounce((s: string): void => setSearchQuery(s), TIME_DELAY_MS), []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = e.target.value;
        setSearchedText(inputValue)
        delayedSetSearch(inputValue.trim());
    }

    return (
        <>
            <br />
            <input type='text' value={searchedText} onChange={handleChange} />
            <br />
        </>
    )
}

export default SearchField;


