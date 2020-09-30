import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { getMoviesFromSearch, getShowsFromSearch, getTopTenMovies, getTopTenShows } from '../../services/ItemService';
import { AppContextProps, Item } from '../../types/items';
import ItemBox from '../ItemBox';

const ItemList: React.FC = () => {
    console.log("RENDER - Item list")
    const { selectedTab, searchQuery } = useContext(AppContext) as AppContextProps;
    const [renderItems, setRenderItems] = useState<Item[]>([]);

        useEffect(() => {
            const isSearchQueryInvalid = searchQuery.length <= 3;
            if (isSearchQueryInvalid) {
                console.log("PROMJENA FILMOVA - <= 3");
                if (selectedTab === "movies")
                    (async () => {
                        setRenderItems(await getTopTenMovies());
                    })();
    
                else
                    (async () => {
                        setRenderItems(await getTopTenShows());
                    })();
            }
            else {
                console.log("PROMJENA FILMOVA - Duzina veca od 3");
                if (selectedTab === "movies")
                    (async () => {
                        setRenderItems(await getMoviesFromSearch(searchQuery));
                    })();
                else
                    (async () => {
                        setRenderItems(await getShowsFromSearch(searchQuery));
                    })();
            }
        }, [selectedTab, searchQuery]);

    return (
        renderItems.length !== 0 
            ? <div>{renderItems.map((item, index) => < ItemBox item={item} key={index} />)}</div>
            : <div>No items found!</div>
    )
}

export default ItemList;