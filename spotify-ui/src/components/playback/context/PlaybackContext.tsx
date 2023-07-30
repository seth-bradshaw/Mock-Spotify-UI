import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { safeParse } from "../../../utils";
import Cookies from "js-cookie";
import initPlaybackSDK from "../sdk";
import { AnyObj, PlaybackEventCallback } from "./types";
import { useDispatch } from "../../../store/hooks";
import { updateDeviceId } from "../../../store/slices/ui/ui";

export const PlaybackContext = createContext({});

export default function PlaybackContextProvider({ children }: PropsWithChildren) {
  // TODO define Player type
  const [player, setPlayer] = useState<AnyObj>();
  const [ready, setReady] = useState<Boolean>(false);
  const [deviceId, setDeviceId] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    const token = safeParse(Cookies.get("spotify_access_token"))?.access_token;

    initPlaybackSDK(() => {
      /* @ts-ignore */
      const player: Player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: (token: string) => void) => cb(token),
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener(
        "ready",
        ({ device_id }: PlaybackEventCallback) => {
          setReady(true);
          setDeviceId(device_id)
          dispatch(updateDeviceId(device_id))
        }
      );

      player.addListener(
        "not_ready",
        ({ device_id }: PlaybackEventCallback) => {
          setDeviceId(device_id)
          setReady(false);
          dispatch(updateDeviceId(device_id))
        }
      );

      player.connect().then((status: boolean) => console.log(`Status of connection ${status}`));

      player
        .setName("groover")
        .then(() => console.log("Device name changed!"));
    });
  }, []);

  return (
    <PlaybackContext.Provider value={{ player, ready, deviceId }}>
      {children}
    </PlaybackContext.Provider>
  );
}
