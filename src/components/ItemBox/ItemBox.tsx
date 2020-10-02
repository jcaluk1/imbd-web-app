import Rating from 'components/Rating';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { DETAILS } from 'routes/routeNames';
import { Item } from 'types/items';

import './ItemBox.scss';

type ItemBoxProps = {
    item: Item
};

const ItemBox = React.memo<ItemBoxProps>(
    ({ item }) => {
        const history = useHistory();

        const goToDetails = (): void => {
            history.push(DETAILS.replace(":id", item.id).replace(":item", item.itemCategory || "movie"));
        }

        return (
            <div className="item-box" onClick={goToDetails}>
                <div className="item-box__poster">
                    <img src={item.imageUrl} alt="itemImage" />
                    <Rating className="item-box__poster__rating" rating={item.voteAverage} />
                </div>
                <p className="item-box__title">{item.title}</p>
            </div>
        )
    }, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);

export default ItemBox;
