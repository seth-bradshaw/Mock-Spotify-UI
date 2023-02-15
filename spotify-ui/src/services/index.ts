import Cookies from "js-cookie";
import axios from "axios";
import {
  REFRESH_TOKEN,
  LOGIN,
  CURRENT_PLAYBACK_STATE_URL,
  GET_PLAYBACK_DEVICES,
  TRANSFER_DEVICE,
  SKIP_NEXT,
  SKIP_PREVIOUS,
  CHANGE_VOLUME,
  USER_QUEUE,
  SEARCH_URL,
  PROFILE_URL,
  PLAYLIST_URL,
  RESUME_PLAYER,
  PAUSE_PLAYER
} from "../constants/endpoints";
import getAuthHeader from "./getAuthHeader";
import { safeParse } from "../utils";
import { SavedTracksRes } from "./trackRes.types";
import getOptionalParams from "../utils/getOptionalParams";

export const loginWithSpotify = () => {
  window.location.href = LOGIN;
};

export const refreshSpotifyToken = async () => {
  const accessToken = safeParse(Cookies.get("spotify_access_token") ?? "");
  const refresh_token = accessToken?.refresh_token ?? "";

  // * api saves cookies to document for us
  await axios
    .get(`${REFRESH_TOKEN}?refresh_token=${refresh_token}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
  
};

export const getCurrentPlaybackState = async (market: string = "US") => {
  //potential refactor to not reuse
  const headers = getAuthHeader()
  
  const response = await axios
    .get(`${CURRENT_PLAYBACK_STATE_URL}?market=${market}`, {
      headers
    })
    .then(({ data }) => data)
    .catch((err) => err);

  return response;
};

export const getPlaybackDevices = async () => {
  const headers = getAuthHeader();

  const response = await axios
    .get(GET_PLAYBACK_DEVICES, {headers})
    .then(({data}) => data)
    .catch((err) => err);

  return response;
}

export const transferDevice = async (deviceId: string) => {
  const headers = getAuthHeader();
  const body = { device_ids: [deviceId] };

  const response = await axios
    .post(TRANSFER_DEVICE, body, { headers })
    .then(({ data }) => data)
    .catch(err => err)

  return response;
}

export const resumePlayer = async ({ device_id, body}: { device_id?: string; body?: any;}) => {
  const headers = getAuthHeader();
  const params = Boolean(device_id) ? `?device_id=${device_id}` : ''

  const response = await axios
    .post(`${RESUME_PLAYER + params}`, body, { headers } )
    .then(({ data }) => data)
    .catch(err => err)

  return response;
}

export const pausePlayer = async (device_id?: string) => {
  const headers = getAuthHeader();
  const params = Boolean(device_id) ? `?device_id=${device_id}` : ''

  const response = await axios
    .post(`${PAUSE_PLAYER + params}`, {}, { headers } )
    .then(({ data }) => data)
    .catch(err => err)

  return response;
}

export const skipToNext = async (device_id?: string) => {
  const headers = getAuthHeader();
  const params = Boolean(device_id) ? `?device_id=${device_id}` : ''

  const response = await axios
    .post(`${SKIP_NEXT + params}`, {}, { headers } )
    .then(({ data }) => data)
    .catch(err => err)

  return response;
}

export const skipToPrevious = async (device_id?: string) => {
  const headers = getAuthHeader();
  const params = Boolean(device_id) ? `?device_id=${device_id}` : ''

  const response = await axios
    .post(`${SKIP_PREVIOUS + params}`, {}, { headers } )
    .then(({ data }) => data)
    .catch(err => err)

  return response;
}

export const changeVolume = async ({ volume_percent, device_id }: {volume_percent: number; device_id?: string}) => {
  const headers = getAuthHeader();
  const params = `?volume_percent=${volume_percent}${Boolean(device_id) ? `&device_id=${device_id}` : ''}`;

  const response = await axios.post(`${CHANGE_VOLUME}${params}`, {}, { headers })
    .then(({ data }) => data)
    .catch(err => err)
  
  return response;
}

export const addItemsToQueue = async (items: Array<string>) => {
  const headers = getAuthHeader();
  const url = `${USER_QUEUE}`;

  const response = await axios.post(url, { items }, { headers })
    .then(({ data }) => data)
    .catch(err => err)

  return response;
}

export const getUserQueue = async () => {
  const headers = getAuthHeader();

  const response = await axios.get(`${USER_QUEUE}`, { headers })
    .then(({ data }) => data)
    .catch(err => err)

  return response;
}

export const searchQuery = async (query:string) => {
  const headers = getAuthHeader()
  const response = await axios.get(`${SEARCH_URL}?search=${query}`, { headers })
  .then(res => res.data)
  .catch(err => err)

  return response
}

export const getCurrentUserPlaylists = async () => {
  const headers = getAuthHeader();

  const response = await axios.get(`${PROFILE_URL}/playlists`, { headers })
    .then(res => res.data)
    .catch(err => err)

  return response;
}

export const getPlaylistImages = async (playlist_id: string) => {
  const headers = getAuthHeader();

  const response = await axios.get(`${PLAYLIST_URL}/playlist/images?playlist_id=${playlist_id}`, { headers })
    .then(res => res.data)
    .catch(err => err)

  return response;
}

export const getPlaylistItems = async (playlist_id: string) => {
  const headers = getAuthHeader();

  const response = await axios.get(`${PLAYLIST_URL}/playlist/items?playlist_id=${playlist_id}`, { headers })
    .then(res => res.data)
    .catch(err => err)

  return response;
}

export const getCurrentUserProfile = async () => {
  const headers = getAuthHeader();

  const response = await axios.get(`${PROFILE_URL}/profile`, { headers })
    .then(res => res.data)
    .catch(err => err)

  return response;
}

export enum TopItemsType {
  Artists = 'artists',
  Tracks = 'tracks'
}

// * type is enum: 'artists' or 'tracks'
export const getCurrentUserTopItems = async (type: TopItemsType) => {
  const headers = getAuthHeader();

  const response = await axios.get(`${PROFILE_URL}/profile/top?type=${type}`, { headers })
    .then(res => res.data)
    .catch(err => err)

  return response;
}

enum SavedTracksParams {
  Limit = 'limit', // * res body size
  Market = 'market',
  Offset = 'offset' // * starting index of res items
}

type SavedTrackParam = {
  [SavedTracksParams.Limit]?: number;
  [SavedTracksParams.Market]?: string;
  [SavedTracksParams.Offset]?: number;
}

export const getUserSavedTracks = async (params:Array<SavedTrackParam>): Promise<SavedTracksRes> => {
  const headers = getAuthHeader();

  const paramsToUse = getOptionalParams(params);

  const response = await axios.get(`${PROFILE_URL}/followed/tracks${paramsToUse}`, { headers })
    .then(res => res.data)
    .catch(err => err);

  return response;
}

export const getUserFollowedArtists = async (limit: number, after: string = '') => {
  const headers = getAuthHeader();
  
  const params = getOptionalParams([{ limit}, { after }])

  const response = await axios.get(`${PROFILE_URL}/followed/artists?${params}`, { headers })
    .then(res => res.data)
    .catch(err => err);

  return response;
}
