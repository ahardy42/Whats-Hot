import React from 'react';
import NavBar from './NavBar';
import renderer from 'react-test-renderer';

describe('navbar render test', () => {
    it('renders the navbar in landing page view', () => {
        const tree = renderer.create(
            <NavBar isMapView={false}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})