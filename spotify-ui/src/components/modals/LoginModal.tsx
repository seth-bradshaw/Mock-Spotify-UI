import { loginWithSpotify } from '../../services';
import ModalWrapper from './ModalWrapper';

type Props = {}

export default function LoginModal({}: Props) {
  return (
    <ModalWrapper title="Log in with Spotify" className="p-3">
      <hr className="mt-2"></hr>
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-full w-96 text-white text-lg text-center p-6 flex flex-col gap-10">
          <p>Welcome to Groover! Please login through Spotify and grant the necessary permissions. You will be redirected to Spotify temporarily.</p>
          <button className="p-2 rounded-full bg-spotify-green-400 w-full font-extrabold" onClick={loginWithSpotify}>Log in</button>
          <p className="text-sm">This app uses Spotify's public API, however it's not owned, supported, or endorsed by Spotify.</p>
        </div>
      </div>
    </ModalWrapper>
  )
}