
export type Item = {
    id: string,
    title: string,
    imageUrl: string,
    voteAverage?:string
};

export type ItemDetails = {
    id: string,
    title: string,
    image: string,
    overview: string;
    
};

export type MovieContextProps = {
    selectedTab: string,
    search: string,
    renderItems: Item[],
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>,
    setSearch: React.Dispatch<React.SetStateAction<string>>
  }


export type AppContextProps = {
    selectedTab: string,
    searchQuery: string,
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

