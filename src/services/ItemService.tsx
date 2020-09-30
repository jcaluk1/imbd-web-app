import { Item } from "../types/items";
import cover from "../assets/img/cover.jpg"

let API_KEY = "81de4c5022853d01e5bd3b9267ffca8b"; // this should go to .env file
const TOP_10_MOVIES_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`;
const TOP_10_SHOWS_URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=1`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/ITEM?api_key=${API_KEY}&query=QUERY&page=1&include_adult=false`;

const getFormattedItem = (rawItem:any):Item => {
    return {
        id: rawItem.id,
        title: rawItem.title || rawItem.name,
        imageUrl: rawItem.poster_path ? `http://image.tmdb.org/t/p/original${rawItem.poster_path}` : cover,
        voteAverage: rawItem.vote_average
    }
};

const getItemsFromAPI = (url:string, topTen:boolean):Promise<Item[]> => {
    return fetch(url)
    .then(res => res.json())
    .then(data => {
        const numberOfItems = topTen ? 10 : data.results.size;
        return data.results.slice(0,numberOfItems).map( (item: any): Item => getFormattedItem(item) )});
}

let topTenMovies:Promise<Item[]>;   // we will fetch them from api only the first time because they are always the same
let topTenShows:Promise<Item[]>;

let topMoviesAreLoaded = false;
let topShowsAreLoaded = false;

export const getTopTenMovies = ():Promise<Item[]> => {
    if (topMoviesAreLoaded)
        return topTenMovies;
    topMoviesAreLoaded = true;
    topTenMovies = getItemsFromAPI(TOP_10_MOVIES_URL, true);
    return topTenMovies;
}

export const getTopTenShows = ():Promise<Item[]> => {
    if (topShowsAreLoaded)
        return topTenShows;
    topShowsAreLoaded = true;
    topTenShows = getItemsFromAPI(TOP_10_SHOWS_URL, true);
    return topTenShows;
}

export const getMoviesFromSearch = (searchQuery: string): Promise<Item[]> => {
    const url = SEARCH_URL.replace("ITEM","movie").replace("QUERY",searchQuery);
    return getItemsFromAPI(url, false);
}

export const getShowsFromSearch = (searchQuery: string): Promise<Item[]> => {
    const url = SEARCH_URL.replace("ITEM","tv").replace("QUERY",searchQuery);
    return getItemsFromAPI(url, false);
}