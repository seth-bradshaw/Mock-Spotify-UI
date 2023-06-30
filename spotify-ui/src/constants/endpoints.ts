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
export const RESUME_PLAYER = `${playbackURL}/resume`
export const PAUSE_PLAYER = `${playbackURL}/pause`
export const SKIP_NEXT = `${playbackURL}/next`
export const SKIP_PREVIOUS = `${playbackURL}/previous`
export const CHANGE_VOLUME = `${playbackURL}/volume`
export const USER_QUEUE = `${playbackURL}/queue`

// * SEARCH ENDPOINTS
export const SEARCH_URL = `${mockSpotifyBaseURL}/search/v1/query`

// * PROFILE ENDPOINTS
export const PROFILE_URL = `${mockSpotifyBaseURL}/current_user`

// * PLAYLIST ENDPOINTS
export const PLAYLIST_URL = `${mockSpotifyBaseURL}/playlists`

// * ARTIST ENDPOINTS
export const ARTISTS_URL = `${mockSpotifyBaseURL}/artists`

// * CATEGORY ENDPOINTS
export const CATEGORY_URL = `${mockSpotifyBaseURL}/categories`