import React, { useContext } from 'react';
import classNames from 'classnames';
import { AppContext } from 'context/AppContext';
import { AppContextProps } from 'types/items';

import './Tabs.scss';

const Tabs: React.FC = () => {
    const { setSelectedTab, selectedTab } = useContext(AppContext) as AppContextProps;

    const moviesTabClasses = classNames("tabs__item", selectedTab === "movies" && "tabs__item--active");
    const showsTabClasses = classNames("tabs__item", selectedTab === "shows" && "tabs__item--active");

    console.log("RENDER - Tabs");
    return (
        <div className="tabs">
            <div className={moviesTabClasses} onClick={() => setSelectedTab("movies")}>Movies</div>
            <div className={showsTabClasses} onClick={() => setSelectedTab("shows")}>TV Shows</div>
        </div>
    )
}

export default Tabs;