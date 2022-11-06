import React from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ReactPlayer from 'react-player'

const ArmVideo = () => {

    const stream = React.useRef(undefined);
    const [playing, setPlaying] = React.useState(false);
    const [lastError, setLastError] = React.useState(null);

    React.useEffect(() => {
        const peer = new RTCPeerConnection({
            iceServers: [{ urls: ["turn:54.89.171.143?transport=tcp"], username: 'user', credential: 'user',}]
        });

        peer.ontrack = function(track) {
           stream.current = track.streams[0];
           setPlaying(true);
        }

        peer.onnegotiationneeded = async function() {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            let data;

            try {
                data = await axios.post('/api/stream-video', { sdp: peer.localDescription });
            }
            catch(e) {
                console.log('Error geting sdp from server: ', e);
                const currentTime = new Date();
                const secondsSinceLastError = lastError ? Math.abs(currentTime - lastError) / 1000 : 9999;
                if (lastError == null || secondsSinceLastError > 5) {
                    alert('Unable to connect to server or video is not streaming');
                    setLastError(currentTime);
                }
                return;
            }

            const description = new RTCSessionDescription(data.data.sdp);

            peer.setRemoteDescription(description).catch(e => console.log(e));
        };

        peer.addTransceiver('video', { direction: "recvonly" });
    }, []);

    return (
        <Grid container>
            <Grid item xs={3} />
            <Grid item xs={5} align="center" data-testid='video-wrapper'>
                <h1>Live View</h1>
                <ReactPlayer url={stream.current} playing={playing} controls={playing} data-testid='video-stream' />
            </Grid>
        </Grid>
    );
}

export default ArmVideo;