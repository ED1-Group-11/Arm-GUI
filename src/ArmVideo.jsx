import React from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const ArmVideo = () => {
    React.useEffect(() => {
        const peer = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.stunprotocol.org' }]
        });

        peer.ontrack = function(track) {
            console.log('Track changed');
            document.getElementById('stream').srcObject = track.streams[0];
        }

        peer.onnegotiationneeded = async function() {
            console.log('Negotiated needed')
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
            <Grid item xs={4} />
            <Grid flex item xs={4} align="center">
                <h1>Live View</h1>
                <video id='stream' autoPlay>

                </video>
            </Grid>
        </Grid>
    );
}

export default ArmVideo;