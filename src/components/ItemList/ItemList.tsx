import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from 'context/AppContext';
import { getMoviesFromSearch, getShowsFromSearch, getTopTenMovies, getTopTenShows } from 'services/ItemService';
import { AppContextProps, Item } from 'types/items';
import ItemBox from '../ItemBox';

import './ItemList.scss';

const ItemList: React.FC = () => {
    const { selectedTab, searchQuery } = useContext(AppContext) as AppContextProps;
    const [renderItems, setRenderItems] = useState<Item[]>([]);

    useEffect(() => {
        const isSearchQueryInvalid = searchQuery.length <= 3;
        if (isSearchQueryInvalid) {
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
            ? <div className="item-list">{renderItems.map((item, index) => < ItemBox item={item} key={index} />)}</div>
            : <div className="no-data-message">No items found!</div>
    )
}

export default ItemList;