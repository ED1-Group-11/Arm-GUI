import React from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ReactPlayer from 'react-player'

const ArmVideo = () => {

    const stream = React.useRef(undefined);
    const [playing, setPlaying] = React.useState(false);

    React.useEffect(() => {
        const peer = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.stunprotocol.org' }]
        });

        peer.ontrack = function(track) {
           stream.current = track.streams[0];
           setPlaying(true);
        }

        peer.onnegotiationneeded = async function() {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            const { data } = await axios.post('/api/stream-video', { sdp: peer.localDescription });
            const description = new RTCSessionDescription(data.sdp);
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