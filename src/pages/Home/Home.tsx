import React from 'react';
import ItemList from '../../components/ItemList';
import Tabs from '../../components/Tabs';
import SearchField from '../../components/SearchField';

const Home: React.FC = () => {  
    console.log("RENDER - Home")
    return (
        <>
            <Tabs/>
            <SearchField/>
            <ItemList/>
       </>
    )
}

export default Home;