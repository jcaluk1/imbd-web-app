import React from 'react';
import { shallow } from 'enzyme';
import { AppContext } from 'context/AppContext';
import ItemList from './ItemList';

jest.mock('context/AppContext');

const COTEXT_VALUE = {
    selectedTab: 'movies',
    searchQuery: 'test',
    setSelectedTab: jest.fn(),
    setSearchQuery: jest.fn()
};

describe('ItemList component', () => {
    test('renders ItemList with context usage', () => {
        const wrapper = shallow(
            <AppContext.Provider value={COTEXT_VALUE}>
                <ItemList />
            </AppContext.Provider>)
            .dive();
        expect(wrapper.getElement().props.children.length).toBeGreaterThan(0);
    });
})
