const initPlaybackSDK = (handleSDKReady: () => void) => {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);
  // @ts-ignore
  window.onSpotifyWebPlaybackSDKReady = handleSDKReady
}

export default initPlaybackSDK