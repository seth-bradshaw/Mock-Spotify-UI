/* @ts-nocheck tslint:disable */
import React, { useState, useEffect } from "react";
import {
  transferDevice,
  resumePlayer,
  pausePlayer,
  skipToNext,
  skipToPrevious,
  changeVolume,
  addItemsToQueue,
  getUserQueue
} from "../../services";
import Cookies from "js-cookie";
import { safeParse } from "../../utils";
import initPlaybackSDK from "./sdk";

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

// ? Should we make this Context when building actual UI? Requires props being passed down multiple components, seems like a good use case
// TODO make this a lot more components. This is pretty bloated atm
export default function SpotifyPlayback() {
  const [isPlaying, setPlaying] = useState(false);
  const [isReady, setReady] = useState(false);
  const [deviceActive, setDeviceActive] = useState(false);
  const [player, setPlayer] = useState(initPlayer);
  const [current_track, setTrack] = useState<AnyObj>(track);
  const [deviceId, setDeviceId] = useState("");
  const [volume, setVolume] = useState(0);
  const [displayVolume, setDisplayVolume] = useState(false);

  const transfer = async (id: string) => {
    await transferDevice(id);
    setDeviceActive(true);
  };

  const resume = async (device_id: string) => {
    if (!deviceActive) {
      await transfer(device_id);
    }
    const play = ({
      spotify_uri,
      playerInstance: {
        _options: { getOAuthToken },
      },
    }: AnyObj) => {
      getOAuthToken(() => resumePlayer({ device_id, body: { tracks: [spotify_uri]} }));
    };
    play({
      playerInstance: player,
      spotify_uri: current_track.uri,
    });
  };

  const pause = async (device_id: string) => {
    const pauseSong = ({
      playerInstance: {
        _options: { getOAuthToken },
      },
    }: AnyObj) => {
      getOAuthToken(() => pausePlayer(device_id));
    };
    pauseSong({
      playerInstance: player,
      spotify_uri: current_track.uri,
    });
  };

  const adjustVolume = async (volume_percent: number) => await changeVolume({ volume_percent, device_id: deviceId });

  const addToQueue = async (uri: string) => await addItemsToQueue([uri])

  const getQueue = async () => await getUserQueue();

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
          setDeviceId(device_id);
          console.log("Ready with Device ID", device_id);
        }
      );

      player.addListener(
        "not_ready",
        ({ device_id }: PlaybackEventCallback) => {
          isReady && setReady(false);
          setDeviceId(device_id);
          console.log("Device ID has gone offline", device_id);
        }
      );

      player.addListener("player_state_changed", (state: AnyObj) => {
        console.log("state on change", { state });
        if (!state) {
          setReady(false);
          return;
        }
        // TODO add logic to ensure this only updates if needed. These are causing unnecessary rerenders.
        setTrack(state.track_window.current_track);
        setPlaying(!state.paused);
      });

      player.connect();
      player.getVolume().then((volume: number) => {
        setVolume(volume * 100);
        setDisplayVolume(true);
      });
      player
        .setName("The bestest Spotify Exp")
        .then(() => console.log("Device name changed!"));
    });

    // TODO move player init to another file returning player. Thinking we pass a map with key = evtListener, value call back. Or should we add evtListeners in useEffect?
  }, []);

  
  return (
    <>
      {!deviceActive || !isReady ? (
        <p>
          This device is not active. Click Play to activate device and resume
          recent track.
        </p>
      ) : null}
      <div className="container">
        <div className="main-wrapper">
          <img
            src={current_track.album.images[0].url}
            className="now-playing__cover"
            alt=""
          />
          <div className="now-playing__side">
            <div className="now-playing__name">{current_track.name}</div>
            <div className="now-playing__artist">
              {current_track.artists[0].name}
            </div>

            <button className="btn-spotify" onClick={() => skipToPrevious()}>
              &lt;&lt;
            </button>

            <button
              className="btn-spotify"
              onClick={() => (isPlaying ? pause(deviceId) : resume(deviceId))}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            {
                displayVolume && (
                    <div className="temp-volume-container">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue={volume}
                        // @ts-ignore
                        onMouseUp={(e) => adjustVolume(e.target.value)}
                    />
                    <p id="rangeValue">{volume}</p>
                    </div>
                )
            }
            <button className="btn-spotify" onClick={() => skipToNext()}>
              &gt;&gt;
            </button>
            <p onClick={() => addToQueue('spotify:track:2GnE8rMDgfWBwGmwrUbCsQ')}>Add Caged Bird to Queue</p>
            <p onClick={() => getQueue()}>get queue</p>
          </div>
        </div>
      </div>
    </>
  );
}
