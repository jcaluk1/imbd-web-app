export enum ItemType {
    SHOW = "tv",
    MOVIE = "movie"
}

export type Item = {
    id: string,
    title: string,
    imageUrl: string,
    voteAverage?:string,
    overView?:string,
    itemType?:ItemType
};



export type AppContextProps = {
    selectedTab: string,
    searchQuery: string,
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

