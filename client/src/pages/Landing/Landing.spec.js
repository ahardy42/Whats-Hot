import React from 'react';
import RadioInput from '../../components/RadioInput/RadioInput';
import {ReactComponent as BeerMug} from './icons/icons8-beer-mug.svg';
import { render, cleanup, fireEvent } from '@testing-library/react';
import {getByTestId} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import Landing from './Landing';

describe('unit test suit for landing page', () => {
    afterEach(cleanup);
    it('redirects to map view if isMapView prop', () => {
        const {container} = render(<Landing isMapView={true} />);
        expect(container.className).toBe("");
    });
    it('renders a landing page if isMapView prop is false', () => {
        const {container} = render(<Landing isMapView={false} />);
        expect(container.firstChild.className).toBe("row landing");
    });
    it('renders amenity radio buttons', () => {
        const mockSetAmenity = jest.fn((id) => id);
        const {getByTestId, container} = render(<Landing isMapView={false} setAmenity={mockSetAmenity} />);
        const restaurantRadio = getByTestId('restaurant');
        const barRadio = getByTestId('bar');
        const shopRadio = getByTestId('shop');
        expect(container).toContainElement(restaurantRadio);
        expect(container).toContainElement(barRadio);
        expect(container).toContainElement(shopRadio);
    });
    it('renders a button which submits the amenity choice and sets isMapView to true', () => {
        
    });
    it('renders a checked radio button when the button is clicked', () => {

    });
})