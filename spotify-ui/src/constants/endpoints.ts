// TODO update this with env file to determine base URL
const mockSpotifyBaseURL = 'http://localhost:8080';

// * AUTH ENDPOINTS
const authURL = `${mockSpotifyBaseURL}/auth`;

export const LOGIN = `${authURL}/userLogin`;
// * requires param refresh_token
export const REFRESH_TOKEN = `${authURL}/refresh-token`;

// * PLAYBACK ENDPOINTS
const playbackURL = `${mockSpotifyBaseURL}/playback`
export const CURRENT_PLAYBACK_STATE_URL =`${playbackURL}/current-state`
export const GET_PLAYBACK_DEVICES = `${playbackURL}/device-list`
export const TRANSFER_DEVICE = `${playbackURL}/transfer-device`
export const PLAY_TRACK = `${playbackURL}/play-track`
export const PAUSE_TRACK = `${playbackURL}/pause-track`
export const SKIP_NEXT = `${playbackURL}/next`
export const SKIP_PREVIOUS = `${playbackURL}/previous`
export const CHANGE_VOLUME = `${playbackURL}/volume`
export const USER_QUEUE = `${playbackURL}/queue`