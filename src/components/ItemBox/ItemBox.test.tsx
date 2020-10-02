import React from 'react';
import { mount } from 'enzyme';
import Rating from 'components/Rating';
import { Item, ItemType } from 'types/items';
import ItemBox from './ItemBox';

describe('ItemBox component', () => {
    const ITEM = {
        id: '123',
        title: 'Test Item',
        imageUrl: 'url.png',
        voteAverage: '8.6',
        overView: 'This is an overview.',
        itemCategory: ItemType.SHOW
    } as Item;

    test('renders ItemBox', () => {
        const wrapper = mount(<ItemBox item={ITEM} />);
        expect(wrapper.find(ItemBox).isEmptyRender()).toBe(false);
    });

    test('renders image inside ItemBox component', () => {
        const wrapper = mount(<ItemBox item={ITEM} />);
        expect(wrapper.find(ItemBox).find('img').props().src).toBe(ITEM.imageUrl);
    });

    test('renders Rating component inside ItemBox component', () => {
        const wrapper = mount(<ItemBox item={ITEM} />);
        expect(wrapper.find(ItemBox).find(Rating).getElement().props.rating).toBe(ITEM.voteAverage);
    });

    test('renders item title inside ItemBox component', () => {
        const wrapper = mount(<ItemBox item={ITEM} />);
        expect(wrapper.find(ItemBox).find('.item-box__title').text()).toBe(ITEM.title);
    });
})
