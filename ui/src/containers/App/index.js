import '@babel/polyfill';
import React from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, GlobalStyles, ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Loader from '../Loader';
import Splash from '../Splash';
import Characters from '../Characters';
import Create from '../Create';
import Spawn from '../Spawn';

import { STATE_CHARACTERS, STATE_CREATE, STATE_SPAWN } from '../../util/States';

library.add(fab, fas);

export default () => {
	const hidden = useSelector((state) => state.app.hidden);
	const appState = useSelector((state) => state.app.state);
	const loading = useSelector((state) => state.loader.loading);

	const muiTheme = createTheme({
		typography: {
			fontFamily: ['Oswald'],
		},
		palette: {
			primary: {
				main: '#208692',
				light: '#4db8c4',
				dark: '#0e5a62',
				contrastText: '#ffffff',
			},
			secondary: {
				main: '#121025',
				light: '#1c1a30',
				dark: '#0a0914',
				contrastText: '#ffffff',
			},
			error: {
				main: '#6e1616',
				light: '#a13434',
				dark: '#430b0b',
			},
			success: {
				main: '#52984a',
				light: '#60eb50',
				dark: '#244a20',
			},
			warning: {
				main: '#f09348',
				light: '#f2b583',
				dark: '#b05d1a',
			},
			info: {
				main: '#247ba5',
				light: '#247ba5',
				dark: '#175878',
			},
			text: {
				main: '#ffffff',
				alt: '#cecece',
				info: '#919191',
				light: '#ffffff',
				dark: '#000000',
			},
			border: {
				main: '#e0e0e008',
				light: '#ffffff',
				dark: '#26292d',
				input: 'rgba(255, 255, 255, 0.23)',
				divider: 'rgba(255, 255, 255, 0.12)',
			},
			mode: 'dark',
		},
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						background: 'rgba(18, 16, 37, 0.97)',
						backgroundImage: 'none',
						border: '1px solid rgba(32,134,146,0.2)',
						boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
					},
				},
			},
			MuiMenuItem: {
				styleOverrides: {
					root: {
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 14,
						color: 'rgba(255,255,255,0.8)',
						'&:hover': { background: 'rgba(32,134,146,0.1)' },
						'&.Mui-selected': {
							background: 'rgba(32,134,146,0.2)',
							color: '#208692',
							'&:hover': { background: 'rgba(32,134,146,0.25)' },
						},
					},
				},
			},
			MuiAutocomplete: {
				styleOverrides: {
					paper: {
						background: 'rgba(18, 16, 37, 0.97)',
						backgroundImage: 'none',
						border: '1px solid rgba(32,134,146,0.2)',
						boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
					},
					option: {
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 14,
						color: 'rgba(255,255,255,0.8)',
						'&[aria-selected="true"]': {
							background: 'rgba(32,134,146,0.2) !important',
							color: '#208692',
						},
						'&.Mui-focused': { background: 'rgba(32,134,146,0.1)' },
					},
					listbox: {
						padding: '4px 0',
						'&::-webkit-scrollbar': { width: 4 },
						'&::-webkit-scrollbar-thumb': { background: 'rgba(32,134,146,0.3)', borderRadius: 2 },
						'&::-webkit-scrollbar-track': { background: 'transparent' },
					},
				},
			},
			MuiPickersPopper: {
				styleOverrides: {
					paper: {
						background: 'rgba(18, 16, 37, 0.97)',
						backgroundImage: 'none',
						border: '1px solid rgba(32,134,146,0.2)',
						boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
					},
				},
			},
			MuiDateCalendar: {
				styleOverrides: {
					root: {
						background: 'transparent',
						color: '#ffffff',
						fontFamily: "'Rajdhani', sans-serif",
					},
				},
			},
			MuiYearCalendar: {
				styleOverrides: {
					root: {
						'&::-webkit-scrollbar': { width: '4px' },
						'&::-webkit-scrollbar-track': { background: 'transparent' },
						'&::-webkit-scrollbar-thumb': { background: 'rgba(32,134,146,0.3)', borderRadius: '2px' },
						'&::-webkit-scrollbar-thumb:hover': { background: 'rgba(32,134,146,0.55)' },
					},
				},
			},
			MuiPickersCalendarHeader: {
				styleOverrides: {
					label: {
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 15,
						fontWeight: 700,
						color: '#ffffff',
						letterSpacing: '0.05em',
					},
					switchViewButton: { color: 'rgba(32,134,146,0.7)' },
				},
			},
			MuiPickersYear: {
				styleOverrides: {
					yearButton: {
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 14,
						fontWeight: 600,
						color: 'rgba(255,255,255,0.6)',
						'&:hover': { background: 'rgba(32,134,146,0.12)' },
						'&.Mui-selected': {
							background: '#208692 !important',
							color: '#ffffff',
						},
					},
				},
			},
			MuiPickersMonth: {
				styleOverrides: {
					monthButton: {
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 14,
						fontWeight: 600,
						color: 'rgba(255,255,255,0.6)',
						'&:hover': { background: 'rgba(32,134,146,0.12)' },
						'&.Mui-selected': {
							background: '#208692 !important',
							color: '#ffffff',
						},
					},
				},
			},
			MuiPickersDay: {
				styleOverrides: {
					root: {
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 13,
						fontWeight: 600,
						color: 'rgba(255,255,255,0.7)',
						background: 'transparent',
						'&:hover': { background: 'rgba(32,134,146,0.12)' },
						'&.Mui-selected': {
							background: '#208692 !important',
							color: '#ffffff',
						},
						'&.MuiPickersDay-today': {
							border: '1px solid rgba(32,134,146,0.5)',
							background: 'transparent',
						},
					},
				},
			},
			MuiDayCalendar: {
				styleOverrides: {
					weekDayLabel: {
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 12,
						fontWeight: 700,
						color: 'rgba(32,134,146,0.6)',
					},
				},
			},
			MuiIconButton: {
				styleOverrides: {
					root: {
						color: 'rgba(32,134,146,0.7)',
						'&:hover': { background: 'rgba(32,134,146,0.1)' },
					},
				},
			},
		},
	});

	let display;

	switch (appState) {
		case STATE_CHARACTERS:
			display = <Characters />;
			break;
		case STATE_CREATE:
			display = <Create />;
			break;
		case STATE_SPAWN:
			display = <Spawn />;
			break;
		default:
			display = <Splash />;
			break;
	}

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={muiTheme}>
				<CssBaseline />
				<GlobalStyles styles={{
					'*::-webkit-scrollbar': { width: '4px', height: '4px' },
					'*::-webkit-scrollbar-track': { background: 'transparent' },
					'*::-webkit-scrollbar-thumb': { background: 'rgba(32,134,146,0.3)', borderRadius: '2px' },
					'*::-webkit-scrollbar-thumb:hover': { background: 'rgba(32,134,146,0.55)' },
					'*::-webkit-scrollbar-corner': { background: 'transparent' },
					'*': { scrollbarWidth: 'thin', scrollbarColor: 'rgba(32,134,146,0.3) transparent' },
				}} />
				{!hidden && <div className="App">{loading ? <Loader /> : display}</div>}
			</ThemeProvider>
		</StyledEngineProvider>
	);
};
