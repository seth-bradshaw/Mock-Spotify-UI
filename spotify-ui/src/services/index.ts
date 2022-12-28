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
import { SavedTracksRes } from "../store/slices/track/track";

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
    .then(({ data }) => {
      console.log('device transfer data', { data });
      return data;
    })
    .catch(err => {
      console.log('err transferring device', { err });
      return err;
    })

  return response;
}

export const resumePlayer = async ({ device_id, body}: { device_id?: string; body?: any;}) => {
  const headers = getAuthHeader();
  const params = Boolean(device_id) ? `?device_id=${device_id}` : ''
  const url = `${RESUME_PLAYER + params}`;
  const response = await axios
    .post(url, body, { headers } )
    .then(({ data }) => {
      console.log('played song', { data, device_id, url });
      return data;
    })
    .catch(err => {
      console.log('err playing track', { err })
      return err;
    })

  return response;
}

export const pausePlayer = async (device_id?: string) => {
  const headers = getAuthHeader();
  const params = Boolean(device_id) ? `?device_id=${device_id}` : ''
  const url = `${PAUSE_PLAYER + params}`;
  const response = await axios
    .post(url, {}, { headers } )
    .then(({ data }) => {
      console.log('paused song', { data, device_id, url })
      return data;
    })
    .catch(err => {
      console.log('err playing track', { err })
      return err;
    })

  return response;
}

export const skipToNext = async (device_id?: string) => {
  const headers = getAuthHeader();
  const params = Boolean(device_id) ? `?device_id=${device_id}` : ''
  const url = `${SKIP_NEXT + params}`;
  const response = await axios
    .post(url, {}, { headers } )
    .then(({ data }) => {
      console.log('skip next song', { data, device_id, url })
      return data;
    })
    .catch(err => {
      console.log('err skip next', { err })
      return err;
    })

  return response;
}

export const skipToPrevious = async (device_id?: string) => {
  const headers = getAuthHeader();
  const params = Boolean(device_id) ? `?device_id=${device_id}` : ''
  const url = `${SKIP_PREVIOUS + params}`;
  const response = await axios
    .post(url, {}, { headers } )
    .then(({ data }) => {
      console.log('skip previous song', { data, device_id, url })
      return data;
    })
    .catch(err => {
      console.log('skip previous track', { err })
      return err;
    })

  return response;
}

export const changeVolume = async ({ volume_percent, device_id }: {volume_percent: number; device_id?: string}) => {
  const headers = getAuthHeader();
  const params = `?volume_percent=${volume_percent}${Boolean(device_id) ? `&device_id=${device_id}` : ''}`;
  const url = `${CHANGE_VOLUME}${params}`;
  console.log('url volume', url)
  const response = await axios.post(url, {}, { headers }).then(({ data }) => {
    console.log('changed volume: ', { data, url })
    return data;
  })
  .catch(err => {
    console.log('error changing volume', { err, url })
    return err
  })
  
  return response;
}

export const addItemsToQueue = async (items: Array<string>) => {
  const headers = getAuthHeader();
  const url = `${USER_QUEUE}`;

  const response = await axios.post(url, { items }, { headers })
    .then(({ data }) => {
      console.log('add to queue', { data, url });
      return data;
    })
    .catch(err => {
      console.log('err adding to queue', { err });
      return err;
    })

  return response;
}

export const getUserQueue = async () => {
  const headers = getAuthHeader();

  const response = await axios.get(`${USER_QUEUE}`, { headers })
    .then(({ data }) => {
      console.log('add to queue', { data });
      return data;
    })
    .catch(err => {
      console.log('err adding to queue', { err });
      return err;
    })

  return response;
}

export const searchQuery = async (fucku:string) => {
  const headers = getAuthHeader()
  const response = await axios.get(`${SEARCH_URL}?search=${fucku}`, { headers })
  .then(res => {
    console.log('res.data.tracks.items', res.data.tracks.items)
     return res.data.tracks.items
    })
  .catch(err => console.log('error from search response', err))
  console.log('response', response)
  return response
}

export const getCurrentUserPlaylists = async () => {
  const headers = getAuthHeader();

  const response = await axios.get(`${PROFILE_URL}/playlists`, { headers })
    .then(res => {
      console.log('current user playlists res', res);
      return res.data;
    })
    .catch(err => console.log('error geting current user playlists', err))

  return response;
}

export const getPlaylistImages = async (playlist_id: string) => {
  const headers = getAuthHeader();

  const response = await axios.get(`${PLAYLIST_URL}/playlist/images?playlist_id=${playlist_id}`, { headers })
    .then(res => {
      console.log('playlist images res', res);
      return res.data;
    })
    .catch(err => console.log('error geting playlist images', err))

  return response;
}

export const getPlaylistItems = async (playlist_id: string) => {
  const headers = getAuthHeader();

  const response = await axios.get(`${PLAYLIST_URL}/playlist/items?playlist_id=${playlist_id}`, { headers })
    .then(res => {
      console.log('playlist images res', res);
      return res.data;
    })
    .catch(err => console.log('error geting playlist images', err))

  return response;
}

export const getCurrentUserProfile = async () => {
  const headers = getAuthHeader();

  const response = await axios.get(`${PROFILE_URL}/profile`, { headers })
    .then(res => {
      console.log('profile respones', { res, headers });
      return res.data;
    })
    .catch(err => {
      console.log('error getting profile', { err });
      return err
    })

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
    .then(res => {
      console.log('profile respones top items', { res, headers });
      return res.data;
    })
    .catch(err => {
      console.log('error getting profile top items', { err });
      return err
    })

  return response;
}

enum SavedTracksParams {
  Limit = 'limit',
  Market = 'market',
  Offset = 'offset'
}

type SavedTrackParam = {
  [SavedTracksParams.Limit]?: number;
  [SavedTracksParams.Market]?: string;
  [SavedTracksParams.Offset]?: number;
}

export const getUserSavedTracks = async (params?:Array<SavedTrackParam>): Promise<SavedTracksRes> => {
  const headers = getAuthHeader();

  const response = await axios.get(`${PROFILE_URL}/tracks`, { headers })
    .then(res => {
      console.log('user saved tracks res ===> ', { res })
      return res.data;
    })
    .catch(err => {
      console.log('error fetching user saved tracks ===> ', { err })
      return err;
    })

  return response;
}
