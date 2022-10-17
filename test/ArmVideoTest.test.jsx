import ArmVideo from "../src/ArmVideo";
import { fireEvent, render } from '@testing-library/react';
import MockRTCPeerConnection from './MockRTCPeerConnection';

describe('ArmVideo', () => {

    function renderArmVideo() {
        return render(<ArmVideo />);
    }

    beforeEach(() => {
        global.RTCPeerConnection = MockRTCPeerConnection;
        global.fetch = jest.fn(() => Promise.resolve({
            json: function(){}
        }));
    });

    test('video stream exist', () => {
        const { getByTestId } = renderArmVideo();
        expect(() => getByTestId('video-stream')).not.toThrowError();
    });

    test('video wrapper exist', () => {
        const { getByTestId } = renderArmVideo();
        expect(() => getByTestId('video-wrapper')).not.toThrowError();
    });
});