import Cookies from 'js-cookie';
import axios from 'axios';
import { 
  REFRESH_TOKEN,
  LOGIN
} from '../constants/endpoints';

export const loginWithSpotify = () => {
  window.location.href = LOGIN;
}

export const refreshSpotifyToken = async () => {
  const accessToken = JSON.parse(Cookies.get('spotify_access_token') ?? '');
  const refresh_token = accessToken?.refresh_token ?? '';

  const response = await axios.get(`${REFRESH_TOKEN}?refresh_token=${refresh_token}`, {    
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      }
    }
  )
  .then(({ data }) => data)
  .catch(err => err);

  return response;
}