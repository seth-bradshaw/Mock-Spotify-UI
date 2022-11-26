import Cookies from 'js-cookie'
import safeParse from '../utils/safeParse'

const getAuthHeader = () => {
    const parsedToken = safeParse(Cookies.get('spotify_access_token'), {})
    const headers =  {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        'Authorization': `${parsedToken?.token_type} ${parsedToken?.access_token}`
      }
  return headers
}

export default getAuthHeader