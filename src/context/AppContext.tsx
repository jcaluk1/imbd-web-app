import React, { createContext, useState } from 'react';
import { AppContextProps } from 'types/items';

export const AppContext = createContext<Partial<AppContextProps>>({});

const AppContextProvider: React.FC = (props) => {
    const [selectedTab, setSelectedTab] = useState<string>("movies");
    const [searchQuery, setSearchQuery] = useState<string>("");
   
    console.log("-------------")
    console.log("RENDER - AppContext");
    
    return (
        <AppContext.Provider value={{ selectedTab, searchQuery, setSelectedTab, setSearchQuery}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;