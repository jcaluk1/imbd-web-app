import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DETAILS } from '../../routes/routeNames';
import { Item } from '../../types/items';

type ItemBoxProps = {
    item: Item
}

const ItemBox = React.memo<ItemBoxProps>(
    ({ item }) => {
        console.log("RENDER - Single item ", item.id);
        const history = useHistory();

        const goToDetails = (): void => {
            history.push(DETAILS.replace(":id", item.id).replace(":item", item.itemType || "movie"));
        }

        return (
            <div onClick={goToDetails}>
                <img src={item.imageUrl} alt="itemImage" />
                <h4>{item.title}</h4>
            </div>
        )
    }, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);

export default ItemBox;
