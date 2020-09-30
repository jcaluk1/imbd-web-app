import React, { SyntheticEvent, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { RouteComponentProps, useHistory } from "react-router-dom";
import { getSingleMovie, getSingleShow } from '../../services/ItemService';
import { getYoutubeVideoId } from '../../services/YoutubeService';
import { ItemDetailsRouteParams } from '../../types/details';
import { Item } from '../../types/items';

// Data for video player
type OptionsAutoplay = 0 | 1 | undefined;
const options = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1 as OptionsAutoplay,
    },
  };

const Details: React.FC<RouteComponentProps<ItemDetailsRouteParams>> = (props) => {
    const [selectedItem, setSelectedItem] = useState<Item>();
    const [videoId, setVideoId] = useState<string | null>();

    const { id, item } = props.match.params;
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            let fetchedItem;
            if (item === "movie")
                fetchedItem = await getSingleMovie(id);
            else
                fetchedItem = await getSingleShow(id);

            const video_id = await getYoutubeVideoId(fetchedItem);
            setVideoId(video_id);
            console.log(fetchedItem)
            setSelectedItem(fetchedItem);
        };
        fetchData();
    }, []);
    
    console.log("VIDEO ID", videoId);
    const _onReady = (e: any):void =>  e.target.pauseVideo();
    const renderMedia = videoId ? <YouTube videoId={videoId} opts={options} onReady={_onReady} /> : <img src={selectedItem?.imageUrl} alt="itemImage" />;

    return (
        <div>
            <button onClick={() => history.goBack()}>Back</button>
            <br />
            {renderMedia}
            <div>Tittle: {selectedItem?.title}</div>
            <div>Rating: {selectedItem?.voteAverage}</div>
            <div>Overview: {selectedItem?.overView}</div>
        </div>
    )
}

export default Details;
