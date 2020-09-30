import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { getSingleMovie, getSingleShow } from 'services/ItemService';
import { getYoutubeVideoId } from 'services/YoutubeService';
import { ItemDetailsRouteParams } from 'types/details';
import { Item } from 'types/items';
import { ReactComponent as BackIcon } from 'assets/img/leftArrow.svg';
import Rating from 'components/Rating';

import './Details.scss';

// Data for video player
type OptionsAutoplay = 0 | 1 | undefined;
const options = {
    playerVars: {
        autoplay: 0 as OptionsAutoplay,
    },
};

const Details: React.FC<RouteComponentProps<ItemDetailsRouteParams>> = (props) => {
    const [selectedItem, setSelectedItem] = useState<Item>();
    const [videoId, setVideoId] = useState<string | null>();

    const { id, item: itemCategory } = props.match.params;
    const history = useHistory();

    const fetchDetails = async () => {
        let fetchedItem;
        if (itemCategory === "movie")
            fetchedItem = await getSingleMovie(id);
        else
            fetchedItem = await getSingleShow(id);

        const youtubeVideoId = await getYoutubeVideoId(fetchedItem);
        setVideoId(youtubeVideoId);
        console.log(fetchedItem)
        setSelectedItem(fetchedItem);
    };

    useEffect(() => {
        fetchDetails();
    }, []);


    console.log("VIDEO ID", videoId);
    const _onReady = (e: any): void => e.target.pauseVideo();
    const renderMedia = videoId ? <YouTube className="item-media" videoId={videoId} opts={options} onReady={_onReady} /> : <img className="item-media" src={selectedItem?.imageUrl} alt="itemImage" />;

    return (
        <div className="details">
            <button className="back-button" onClick={() => history.goBack()}><BackIcon className="back-button__icon" />Back</button>
            <div className="details__media">
                {renderMedia}
                <Rating className="details__rating" rating={selectedItem?.voteAverage} />
            </div>
            <div className="details__info">
                    <div>{selectedItem?.title}</div>
                    <div><span className="details__info__header">Overview: </span>{selectedItem?.overView}</div>
                </div>
        </div>
    )
}

export default Details;
