import { Item } from "../types/items";

const API_KEY = "AIzaSyAe41lnahGp8J2EE7duPtiJ71a1r_5GANs";
const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=QUERY&type=video&videoType=any&key=${API_KEY}`;

export const getYoutubeVideoId = (item: Item): Promise<string> | null => {
    const searchQuery = `${item.title} trailer`.replace(/\s/gi, "%20");
    const searchURL = SEARCH_URL.replace("QUERY", searchQuery);
    return fetch(searchURL)
        .then(res => res.json())
        .then(data => {
            console.log("DATA",data);
            console.log("DATA.ITEMS",data.items.length);
            return data.items.length > 0 ? data.items[0].id.videoId : null;
        });
}