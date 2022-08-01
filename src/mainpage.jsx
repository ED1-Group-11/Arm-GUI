import React from 'react';
import ArmVideo from './ArmVideo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Home from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';

const SERVER_URL = 'https://localhost:8080';
const SERVER_WS_URL = 'ws://localhost:8081';

const config = {
    iceServers: [{urls: SERVER_WS_URL}]
};

const MainPage = () => {

    const [mode, setTheme] = React.useState('light');

    const theme = React.useMemo(() => {
        return createTheme({
            palette: {
                mode: mode,
            }
        });
    }, [mode]);


    const [serverConfig, setServerConfig] = React.useState({});
    const serverConnection = React.useRef();
    
    const [color, setColor] = React.useState('red');
    const [shape, setShape] = React.useState('square');

    React.useEffect(() => {
        //serverConnection.current = new RTCPeerConnection(config);

    }, []);

    async function callChangeSettingsAPI() {
        fetch(SERVER_URL + '/api/change-settings', {
            method: 'PUT', 
            body: JSON.stringify({
                color,
                shape
            }), 
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(res => {
            console.log('setting server config', res);
            setServerConfig(res);
        })
        .catch(e => console.log('api error:', e));
    }

    function changeArmSettings() {
        if (serverConfig.color !== color || serverConfig.shape !== shape) {
            callChangeSettingsAPI();
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{flexGrow: 1}}>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton onClick={_ => window.location.reload(false)}>
                            <Home sx={{mr: 4}} />
                        </IconButton>
                        <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                            ED1 Group 11
                        </Typography>
                        <Switch onChange={e => e.target.checked ? setTheme('dark') : setTheme('light')}/>
                    </Toolbar>
                </AppBar>
            </Box>
            <ArmVideo/>
            <Grid container>
                <Grid item xs={4}/>
                <Grid item xs={4} sx={{marginTop: '5vh'}}>
                    <TextField label='color' value={color} onChange={e => setColor(e.target.value)} select>
                        <MenuItem value='blue'>Blue</MenuItem>
                        <MenuItem value='green'>Green</MenuItem>
                        <MenuItem value='red'>Red</MenuItem>
                    </TextField>
                    <TextField sx={{ml: 2}} label='shape' value={shape} onChange={e => setShape(e.target.value)} select>
                        <MenuItem value='circle'>Circle</MenuItem>
                        <MenuItem value='square'>Square</MenuItem>
                        <MenuItem value='triangle'>Triangle</MenuItem>
                    </TextField>
                    <Button onClick={changeArmSettings} sx={{ml: 2, height: '4em'}} variant='outlined'>
                        Change Settings
                    </Button>
                </Grid>
            </Grid>
            <Grid container sx={{marginTop: '2em'}}>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Button variant='outlined' sx={{height: '4em', width: '3em'}}>
                        Left
                    </Button>
                    <Button variant='outlined' sx={{height: '4em', width: '3em'}}>
                        Up
                    </Button>
                    <Button variant='outlined' sx={{height: '4em', width: '3em'}}>
                        Right
                    </Button>
                    <Button variant='outlined' sx={{height: '4em', width: '3em'}}>
                        Down
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default MainPage;