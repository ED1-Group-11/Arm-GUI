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

const THEME = 'theme';

const MainPage = () => {

    const [mode, setTheme] = React.useState(() => {
        const savedTheme = localStorage.getItem(THEME);
        return savedTheme || 'light';
    });

    const theme = React.useMemo(() => {
        return createTheme({
            palette: {
                mode: mode,
            }
        });
    }, [mode]);

    const [color, setColor] = React.useState('red');
    const [shape, setShape] = React.useState('square');

    React.useEffect(() => {
        fetch('/api/current-settings')
        .then(res => res.json())
        .then(res => {
            setColor(res.color);
            setShape(res.shape);
        })
        .catch(e => {
            console.log('Error getting current settings: ', e);
        });
    }, []);

    function callChangeSettingsAPI() {
        fetch('/api/change-settings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                color,
                shape
            }),
        })
        .then(res => res.json())
        .then(res => {
            console.log('setting server config', res);
        })
        .catch(e => console.log('Error changing settings:', e));
    }

    const [isManual, setIsManual] = React.useState(false);

    // confirms the user wants to start manual contorl
    // true == wants to start to start manual control
    // false == does not want to start manual control
    function handleStartManual() {
        const res = window.confirm("You are about to enter manual mode. Are you sure?");
        if (res) {
            setIsManual(true);
        }
        return res;
    }

    function handleDownClick() {
        if (!isManual && !handleStartManual()) {
            return;
        }

        fetch('/api/arm-down', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ units: 1 }),
        })
        .then(res => res.json())
        .then(res => {
            console.log("Moved down: ", res)
        })
        .catch(e => console.log('Error: ', e));
    }

    function handleUpClick() {
        if (!isManual && !handleStartManual()) {
            return;
        }

        fetch('/api/arm-up', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ units: 1 }),
        })
        .then(res => res.json())
        .then(res => {
            consle.log("Moved up: ", res)
        })
        .catch(e => console.log('Error: ', e));
    }

    function handleLeftClick() {
        if (!isManual && !handleStartManual()) {
            return;
        }

        fetch('/api/arm-left', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ units: 1 }),
        })
        .then(res => res.json())
        .then(res => {

        })
        .catch(e => console.log('Error: ', e));
    }

    function handleRightClick() {
        if (!isManual && !handleStartManual()) {
            return;
        }

        console.log("Moving right")

        fetch('/api/arm-right', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ units: 1 }),
        })
        .then(res => res.json())
        .then(res => {
            console.log("Right movement: ", res)
        })
        .catch(e => console.log('Error: ', e));
    }

    function handleChangeTheme(e) {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem(THEME, newTheme);
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
                        <Switch checked={mode !== 'light'} onChange={handleChangeTheme} data-testid='theme-switch' />
                    </Toolbar>
                </AppBar>
            </Box>
            <ArmVideo/>
            <Grid container>
                <Grid item xs={4}/>
                <Grid item xs={4} sx={{marginTop: '5vh'}}>
                    <TextField label='color' value={color} onChange={e => setColor(e.target.value)} select data-testid='color-selector'>
                        <MenuItem value='blue'>Blue</MenuItem>
                        <MenuItem value='green'>Green</MenuItem>
                        <MenuItem value='red'>Red</MenuItem>
                        <MenuItem value='yellow'>Yellow</MenuItem>
                    </TextField>
                    <TextField sx={{ml: 2}} label='shape' value={shape} onChange={e => setShape(e.target.value)} select data-testid='shape-selector'>
                        <MenuItem value='pentagon'>Pentagon</MenuItem>
                        <MenuItem value='square'>Square</MenuItem>
                        <MenuItem value='hexagon'>Hexagon</MenuItem>
                        <MenuItem value='heptagon'>Heptagon</MenuItem>
                        <MenuItem value='octagon'>Octagon</MenuItem>
                        <MenuItem value='triangle'>Triangle</MenuItem>
                    </TextField>
                    <Button onClick={callChangeSettingsAPI} sx={{ml: 2, height: '4em'}} variant='outlined'>
                        Change Settings
                    </Button>
                </Grid>
            </Grid>
            <Grid container sx={{marginTop: '2em'}} style={{marginBottom: '100px'}}>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Grid item>
                        <Button />
                        <Button data-testid='arm-up' onClick={handleUpClick} variant='outlined' sx={{height: '4em', width: '3em'}}>
                            Up
                        </Button>
                    </Grid>
                    <Button data-testid='arm-left' onClick={handleLeftClick} variant='outlined' sx={{height: '4em', width: '3em'}}>
                        Left
                    </Button>
                    <Button data-testid='arm-down' onClick={handleDownClick} variant='outlined' sx={{height: '4em', width: '3em'}}>
                        Down
                    </Button>
                    <Button data-testid='arm-right' onClick={handleRightClick} variant='outlined' sx={{height: '4em', width: '3em'}}>
                        Right
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default MainPage;