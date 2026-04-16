import { APP_RESET, APP_SHOW, APP_HIDE, SET_STATE } from '../../actions/types';
import { STATE_SPLASH, STATE_CHARACTERS, STATE_CREATE, STATE_SPAWN } from '../../util/States';

const isNUI = typeof window.invokeNative !== 'undefined';
const browserPreviewStates = {
	splash: STATE_SPLASH,
	characters: STATE_CHARACTERS,
	create: STATE_CREATE,
	spawn: STATE_SPAWN,
};
const browserPreviewState = !isNUI
	? browserPreviewStates[new URLSearchParams(window.location.search).get('screen')] || STATE_CREATE
	: STATE_SPLASH;

export const initialState = {
	hidden: !isNUI ? false : true,
	state: browserPreviewState,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case APP_SHOW:
			return { ...state, hidden: false };
		case APP_HIDE:
			return { ...state, hidden: true };
		case SET_STATE:
			return { ...state, state: action.payload.state };
		case APP_RESET:
			return {
				...initialState,
				hidden: false,
			};
		default:
			return state;
	}
};

export default appReducer;
