import React, { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { AppContextProps } from 'types/items';

const Tabs: React.FC = () => {
    const { setSelectedTab } = useContext(AppContext) as AppContextProps;
    console.log("RENDER - Tabs");
    return (
        <>
            <div onClick={() => setSelectedTab("movies")}>Movies</div>
            <div onClick={() => setSelectedTab("shows")}>TV Shows</div>
        </>
    )
}

export default Tabs;