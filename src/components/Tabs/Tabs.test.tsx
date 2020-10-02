import React from 'react';
import { mount } from 'enzyme';
import Tabs from './Tabs';

describe('Tabs component', () => {
    const MOVIES_TAB_TITLE = "Movies";

    test('renders tabs', () => {
        const wrapper = mount(<Tabs/>)
        expect(wrapper.find(Tabs).isEmptyRender()).toBe(false);
    });

    test('has two tabs', () => {
        const wrapper = mount(<Tabs/>)
        expect(wrapper.find(Tabs).find(".tabs__item").length).toBe(2);
    });

    test('renders Movie tabs first', () => {
        const wrapper = mount(<Tabs/>)
        expect(wrapper.find(Tabs).find(".tabs__item").first().text()).toBe(MOVIES_TAB_TITLE);
    });
})
