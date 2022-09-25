import MainPage from '../src/MainPage';
import { fireEvent, render } from '@testing-library/react';

describe('MainPage', () => {
    
    const MOCK_COLOR = 'blue';
    const MOCK_SHAPE = 'triangle';

    function renderMainPage() {
        return render(<MainPage />);
    }

    test('Theme switcher exist', () => {
        const { getByTestId } = renderMainPage();
        expect(() => getByTestId('theme-switch')).not.toThrowError();
    });

    test('Theme switcher switched theme', () => {
        const { getByTestId } = renderMainPage();
        const themeSwitch = getByTestId('theme-switch');

        themeSwitch.click();
        fireEvent.change(themeSwitch, { target: { checked: true }});

        expect(themeSwitch).toHaveProperty('checked', true);
    });

    test('Shape selector exist', () => {
        const { getByTestId } = renderMainPage();
        expect(() => getByTestId('shape-selector')).not.toThrowError();
    });

    test('Shape selector works', () => {
        const { getByTestId } = renderMainPage();
        const shapeSelector = getByTestId('shape-selector').querySelector('input');

        fireEvent.change(shapeSelector, { target: { value: MOCK_SHAPE }});
        expect(shapeSelector).toHaveProperty('value', MOCK_SHAPE);
    });

    test('Color selector exist', () => {
        const { getByTestId } = renderMainPage();
        expect(() => getByTestId('color-selector')).not.toThrowError();
    });

    test('Color selector works', () => {
        const { getByTestId } = renderMainPage();
        const colorSelector = getByTestId('color-selector').querySelector('input');

        fireEvent.change(colorSelector, { target: { value: MOCK_COLOR }});
        expect(colorSelector).toHaveProperty('value', MOCK_COLOR);
    });
});