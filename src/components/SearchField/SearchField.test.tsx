import React from 'react';
import { mount } from 'enzyme';
import SearchField from './SearchField';

describe('SearchField component', () => {
    const PLACEHOLDER_TEXT = "Search movies or shows";

    test('renders SearchField', () => {
        const wrapper = mount(<SearchField/>);
        expect(wrapper.find(SearchField).isEmptyRender()).toBe(false);
    });

    test('renders placeholder', () => {
        const wrapper = mount(<SearchField/>);
        expect(wrapper.find("input").getElement().props.placeholder).toBe(PLACEHOLDER_TEXT);
    });
})
