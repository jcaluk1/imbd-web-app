import { Item } from "types/items";

const YOUTUBE_API_KEY = "AIzaSyAe41lnahGp8J2EE7duPtiJ71a1r_5GANs";
const YOUTUBE_SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=QUERY&type=video&videoType=any&key=${YOUTUBE_API_KEY}`;

export const getYoutubeVideoId = (item: Item): Promise<string> | null => {
    const searchQuery = `${item.title} trailer`.replace(/\s/gi, "%20");
    const searchURL = YOUTUBE_SEARCH_URL.replace("QUERY", searchQuery);
    return fetch(searchURL)
        .then(res => res.json())
        .then(data => data.items.length > 0 ? data.items[0].id.videoId : null);
}