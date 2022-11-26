// TODO update this with env file to determine base URL
const mockSpotifyBaseURL = 'http://localhost:8080';

const authURL = `${mockSpotifyBaseURL}/auth`;

export const LOGIN = `${authURL}/userLogin`;
// * requires param refresh_token
export const REFRESH_TOKEN = `${authURL}/refresh-token`;