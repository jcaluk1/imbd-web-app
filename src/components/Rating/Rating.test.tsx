import React from 'react';
import { mount } from 'enzyme';
import Rating from './Rating';

describe('Rating component', () => {
    const RATING = '8';
    const CLASS_NAME = 'rating-class';

    test('renders Rating', () => {
        const wrapper = mount(<Rating />);
        expect(wrapper.find(Rating).isEmptyRender()).toBe(false);
    });

    test('applied passed classname', () => {
        const wrapper = mount(<Rating className={CLASS_NAME} />);
        expect(wrapper.find(`.${CLASS_NAME}`).find(Rating).isEmptyRender()).toBe(false);
    });

    test('shows passed rating', () => {
        const wrapper = mount(<Rating rating={RATING} />);
        expect(wrapper.find(Rating).find('.rating__number__current').text()).toBe(RATING);
    });

    test('renders icon', () => {
        const wrapper = mount(<Rating rating={RATING} />);
        expect(wrapper.find('svg').isEmptyRender()).toBe(false);
    });
})

