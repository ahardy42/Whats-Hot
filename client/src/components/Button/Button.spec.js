import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('button render test suite', () => {
    afterEach(() => {
        cleanup();
    })
    // unit test
    it('renders a button', () => {
        const {container} = render(<Button>Hey!</Button>);
        const theButton = container.firstChild;
        expect(theButton).toContainElement(theButton);
    });
    it('renders attributes based on props', () => {
        const {container} = render(<Button type="button" extraClass="dude">Hey!</Button>);
        const theButton = container.firstChild;
        expect(theButton.textContent).toEqual('Hey!');
        expect(theButton.className).toBe('btn dude');
    });
    it('responds to clicks', () => {
        const func = jest.fn(() => 'clicked')
        const {container} = render(<Button type="button" extraClass="dude" handleClick={func}>Hey!</Button>);
        const theButton = container.firstChild;
        fireEvent.click(theButton);
        expect(func).toHaveBeenCalledTimes(1);
    })
    // snapshot test
    it('renders correctly', () => {
        const tree = renderer.create(<Button>Hey!</Button>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
