import Cookies from "js-cookie";
import axios from "axios";
import {
  REFRESH_TOKEN,
  LOGIN,
  CURRENT_PLAYBACK_STATE_URL,
  GET_PLAYBACK_DEVICES,
  TRANSFER_DEVICE,
  PLAY_TRACK,
  PAUSE_TRACK,
  SKIP_NEXT,
  SKIP_PREVIOUS,
  CHANGE_VOLUME,
  USER_QUEUE
} from "../constants/endpoints";
import getAuthHeader from "./getAuthHeader";

export const loginWithSpotify = () => {
  window.location.href = LOGIN;
};

export const refreshSpotifyToken = async () => {
  const accessToken = JSON.parse(Cookies.get("spotify_access_token") ?? "");
  const refresh_token = accessToken?.refresh_token ?? "";

  const response = await axios
    .get(`${REFRESH_TOKEN}?refresh_token=${refresh_token}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);

  return response;
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
  const response = await axios
    .post(TRANSFER_DEVICE, { device_ids: [deviceId] }, { headers })
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

export const playTrack = async ({ device_id, tracks}: { device_id?: string; tracks?: Array<string>;}) => {
  const headers = getAuthHeader();
  const params = Boolean(device_id) ? `?device_id=${device_id}` : ''
  const body = Boolean(tracks) ? { tracks } : {}
  const url = `${PLAY_TRACK + params}`;
  const response = await axios
    .post(url, body, { headers } )
    .then(({ data }) => {
      console.log('played song', { data, device_id, tracks, url });
      return data;
    })
    .catch(err => {
      console.log('err playing track', { err })
      return err;
    })

  return response;
}

export const pauseTrack = async (device_id?: string) => {
  const headers = getAuthHeader();
  const params = Boolean(device_id) ? `?device_id=${device_id}` : ''
  const url = `${PAUSE_TRACK + params}`;
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

export const addTrackToQueue = async ({ uri, device_id }: {uri: string; device_id?: string;}) => {
  const headers = getAuthHeader();
  const params = `?uri=${uri}${Boolean(device_id) ? `&device_id=${device_id}` : ''}`;
  const url = `${USER_QUEUE}${params}`;

  const response = await axios.post(url, {}, { headers })
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