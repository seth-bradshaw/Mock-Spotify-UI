import React, { createContext, useEffect, useState } from "react";
import { safeParse } from "../../utils";
import Cookies from "js-cookie";
import initPlaybackSDK from "./initPlaybackSDK";
import PlaybackContainer from "./PlaybackContainer";

export const PlaybackContext = createContext({});

type PlaybackEventCallback = {
  device_id: string;
};
type AnyObj = { [key: string]: any };

const initPlayer: AnyObj = {};

const track: AnyObj = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
  uri: "",
};

export default function PlaybackContextProvider({ children }: AnyObj) {
  //test if we need useState or not
  const [player, setPlayer] = useState<AnyObj>({});
  const [ready, setReady] = useState<Boolean>(false);

  useEffect(() => {
    const token = safeParse(Cookies.get("spotify_access_token"))?.access_token;

    initPlaybackSDK(() => {
      /* @ts-ignore */
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: (token: string) => void) => cb(token),
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener(
        "ready",
        async ({ device_id }: PlaybackEventCallback) => {
          setReady(true);
          //save device_id to redux
          console.log('whatever')
        }
      );

      player.addListener(
        "not_ready",
        ({ device_id }: PlaybackEventCallback) => {
          setReady(false);

        }
      );

      player.addListener("player_state_changed", (state: AnyObj) => {
        console.log("state on change", { state });
        if (!state) {
          setReady(false);
        }
      });

      player.connect();

      player
        .setName("squirtify")
        .then(() => console.log("Device name changed!"));
    });
    console.log('inside of useEffect')
  }, []);
  console.log('outside of useEffect')
  return (
    <PlaybackContext.Provider value={{ player, ready}}>
      <PlaybackContainer>{children}</PlaybackContainer>
    </PlaybackContext.Provider>
  );
}
