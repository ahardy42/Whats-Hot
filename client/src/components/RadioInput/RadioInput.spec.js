import React from 'react';
import renderer from 'react-test-renderer';
import RadioInput from './RadioInput';
import {ReactComponent as BeerMug} from '../../pages/Landing/icons/icons8-beer-mug.svg'
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('the snapshot test', () => {
    it('renders a radio input', () => {
        const tree = renderer.create(
            <RadioInput
                id="test-radio"
                value="test"
                name="test-radio"
                handleCheck={jest.fn()}
                isChecked={true}
            >
                <BeerMug />
            </RadioInput>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('radio button unit test', () => {
    afterEach(() => {
        cleanup()
    });
    let isChecked = false;
    const mockClick = jest.fn(() => isChecked = !isChecked);
    it('renders a radio button', () => {
        const {container} = render(<RadioInput id="test" value="test" name="test" isChecked={isChecked} handleCheck={mockClick}><BeerMug/></RadioInput>)
        const input = container.querySelector('input');
        expect(input).toHaveAttribute('type', 'radio');
    });
    it('renders a label based on children', () => {
        const child = "some text";
        const {container} = render(<RadioInput id="test" value="test" name="test" isChecked={isChecked} handleCheck={mockClick}>{child}</RadioInput>);
        const label = container.querySelector('label');
        expect(label.textContent).toEqual(child)
    });
})