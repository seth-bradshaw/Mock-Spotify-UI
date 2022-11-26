import Cookies from "js-cookie";
import axios from "axios";
import {
  REFRESH_TOKEN,
  LOGIN,
  CURRENT_PLAYBACK_STATE_URL,
  GET_PLAYBACK_DEVICES,
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
    .then(({ data }) => console.log(data))
    .catch((err) => err);
  return response;
};

export const getPlaybackDevices = async () => {
  const headers = getAuthHeader()
  const response = await axios
  .get(GET_PLAYBACK_DEVICES, {headers})
  .then(({data}) => console.log('device_list', data))
  .catch((err) => err);
  return response
}
