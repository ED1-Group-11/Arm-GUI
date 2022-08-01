import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import tempImage from './robot_arm.jpg';

const ArmVideo = () => {
    return (
        <Grid container>
            <Grid item xs={4} />
            <Grid flex item xs={4} align="center">
                <h1>Live View</h1>
                <Box sx={{height: '50vh', width: '33vw'}} component='img' src={tempImage} alt='temp image' />
            </Grid>
        </Grid>
    );
}

export default ArmVideo;