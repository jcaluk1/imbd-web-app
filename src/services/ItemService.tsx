import { Item, ItemType } from "types/items";
import cover from "assets/img/cover.jpg";

let API_KEY = "81de4c5022853d01e5bd3b9267ffca8b"; // this should go to .env file
const TOP_10_MOVIES_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`;
const TOP_10_SHOWS_URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=1`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/ITEM?api_key=${API_KEY}&query=QUERY&page=1&include_adult=false`;

const MOVIE_DETAIL_URL = `https://api.themoviedb.org/3/movie/ID?api_key=${API_KEY}`;
const SHOW_DETAIL_URL = `https://api.themoviedb.org/3/tv/ID?api_key=${API_KEY}`;

const getFormattedItem = (rawItem: any): Item => {
    const itemCategory: ItemType = (rawItem.title) ? ItemType.MOVIE : ItemType.SHOW;
    return {
        id: rawItem.id,
        title: rawItem.title || rawItem.name,
        imageUrl: rawItem.poster_path ? `https://image.tmdb.org/t/p/original${rawItem.poster_path}` : cover,
        voteAverage: rawItem.vote_average,
        overView: rawItem.overview,
        itemCategory: itemCategory
    }
};

const getItemsFromAPI = (url: string, topTen: boolean): Promise<Item[]> => {
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            const numberOfItems = topTen ? 10 : data.results.length;
            return data.results.slice(0, numberOfItems).map((item: any): Item => getFormattedItem(item))
        });
}

const getSingleItemFromApi = (url: string): Promise<Item> => {
    return fetch(url)
        .then(res => res.json())
        .then(data => { return getFormattedItem(data) });
}

let topTenMovies: Promise<Item[]>;   //fetch them from api only the first time because they are always the same
let topTenShows: Promise<Item[]>;

let topMoviesAreLoaded = false;
let topShowsAreLoaded = false;

export const getTopTenMovies = (): Promise<Item[]> => {
    if (topMoviesAreLoaded)
        return topTenMovies;
    topMoviesAreLoaded = true;
    topTenMovies = getItemsFromAPI(TOP_10_MOVIES_URL, true);
    return topTenMovies;
}

export const getTopTenShows = (): Promise<Item[]> => {
    if (topShowsAreLoaded)
        return topTenShows;
    topShowsAreLoaded = true;
    topTenShows = getItemsFromAPI(TOP_10_SHOWS_URL, true);
    return topTenShows;
}

export const getMoviesFromSearch = (searchQuery: string): Promise<Item[]> => {
    const url = SEARCH_URL.replace("ITEM", "movie").replace("QUERY", searchQuery);
    return getItemsFromAPI(url, false);
}

export const getShowsFromSearch = (searchQuery: string): Promise<Item[]> => {
    const url = SEARCH_URL.replace("ITEM", "tv").replace("QUERY", searchQuery);
    return getItemsFromAPI(url, false);
}

export const getSingleMovie = (movieId: string): Promise<Item> => {
    const url = MOVIE_DETAIL_URL.replace("ID", movieId);
    return getSingleItemFromApi(url);
}

export const getSingleShow = (showID: string): Promise<Item> => {
    const url = SHOW_DETAIL_URL.replace("ID", showID);
    return getSingleItemFromApi(url);
}
