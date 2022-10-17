import MainPage from '../src/MainPage';
import { fireEvent, render } from '@testing-library/react';
import MockRTCPeerConnection from './MockRTCPeerConnection';
import { act } from 'react-dom/test-utils';

describe('Manual control test', () => {

    function renderMainPage() {
        return render(<MainPage />);
    }

    beforeEach(() => {
        global.RTCPeerConnection = MockRTCPeerConnection;
        global.fetch = jest.fn(() => Promise.resolve({
            json: function(){}
        }));
        window.confirm = jest.fn(() => true);
    });

    test('Manual control buttons exist', () => {
        const { getByTestId } = renderMainPage();

        expect(() => getByTestId('arm-down')).not.toThrowError();
        expect(() => getByTestId('arm-up')).not.toThrowError();
        expect(() => getByTestId('arm-left')).not.toThrowError();
        expect(() => getByTestId('arm-right')).not.toThrowError();
    });

    test('sanity check for api calls', () => {
        const { getByTestId } = renderMainPage();
        expect(fetch.mock.calls.length).toBe(1);
    });

    test('arm up should trigger api call', () => {
        const { getByTestId } = renderMainPage();
        const armButton = getByTestId('arm-up');
        act(() => {
            armButton.click();
        });
        expect(window.confirm.mock.calls.length).toBe(1);
        expect(fetch.mock.calls.length).toBe(2);
    });

    test('arm down should trigger api call', () => {
        const { getByTestId } = renderMainPage();
        const armButton = getByTestId('arm-down');
        act(() => {
            armButton.click();
        });
        expect(window.confirm.mock.calls.length).toBe(1);
        expect(fetch.mock.calls.length).toBe(2);
    });

    test('arm left should trigger api call', () => {
        const { getByTestId } = renderMainPage();
        const armButton = getByTestId('arm-left');
        act(() => {
            armButton.click();
        });
        expect(window.confirm.mock.calls.length).toBe(1);
        expect(fetch.mock.calls.length).toBe(2);
    });

    test('arm right should trigger api call', () => {
        const { getByTestId } = renderMainPage();
        const armButton = getByTestId('arm-right');
        act(() => {
            armButton.click();
        });
        expect(window.confirm.mock.calls.length).toBe(1);
        expect(fetch.mock.calls.length).toBe(2);
    });
});