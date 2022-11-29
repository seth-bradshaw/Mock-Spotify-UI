/* @ts-nocheck tslint:disable */
import React, {useState, useEffect} from 'react'
import { transferDevice, playTrack, pauseTrack, skipToNext, skipToPrevious, changeVolume } from '../../services'
import Cookies from 'js-cookie'
import {safeParse} from '../../utils'
import initPlaybackSDK from './tempFile'

type PlaybackEventCallback = {
    device_id:string;
}
type AnyObj = {[key:string]: any}

const initPlayer:AnyObj = {}

const track: AnyObj = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ],
    uri: ''
}

// ? Should we make this Context when building actual UI? Requires props being passed down multiple components, seems like a good use case
// TODO make this a lot more components. This is pretty bloated atm
export default function SpotifyPlayback() {
    const [isPlaying, setPlaying] = useState(false);
    const [isReady, setReady] = useState(false);
    const [deviceActive, setDeviceActive] = useState(false);
    const [player, setPlayer] = useState(initPlayer);
    const [current_track, setTrack] = useState<AnyObj>(track);
    const [deviceId, setDeviceId] = useState('');
    const [volume, setVolume] = useState(0);

    const transfer = async (id: string) => {
        await transferDevice(id);
        setDeviceActive(true);
    }

    const resume = async (device_id: string) => {
        if (!deviceActive) {
            await transfer(device_id);
        }
        const play = ({
            spotify_uri,
            playerInstance: {
              _options: {
                getOAuthToken
              }
            }
        }: AnyObj) => {
            getOAuthToken(() => playTrack({ device_id, tracks: [spotify_uri]}));
        };
        play({
            playerInstance: player,
            spotify_uri: current_track.uri,
        });
    }

    const pause = async (device_id: string) => {
        const pauseSong = ({
            playerInstance: {
              _options: {
                getOAuthToken
              }
            }
        }: AnyObj) => {
            getOAuthToken(() => pauseTrack(device_id));
        };
        pauseSong({
            playerInstance: player,
            spotify_uri: current_track.uri,
        });
    }

    const adjustVolume = (volume_percent: number) => {
        player.setVolume(volume_percent).then(() => {
            setVolume(volume_percent * 100)
        }).catch((err: any) => console.log(err))
    }

    useEffect(() => {
        const token = safeParse(Cookies.get('spotify_access_token'))?.access_token

        initPlaybackSDK(() => {
            /* @ts-ignore */
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: (cb:(token:string) => void) => cb(token),
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', async ({ device_id }: PlaybackEventCallback) => {
                setReady(true);
                setDeviceId(device_id)
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }: PlaybackEventCallback) => {
                isReady && setReady(false);
                setDeviceId(device_id);
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( (state:AnyObj) => {
                console.log('state on change', { state });
                if (!state) {
                    setReady(false)
                    return;
                }
                // TODO add logic to ensure this only updates if needed. These are causing unnecessary rerenders.
                setTrack(state.track_window.current_track);
                setPlaying(!state.paused);
            }));

            player.connect();
            player.getVolume().then((volume: number) => setVolume(volume * 100));
            player.setName("The bestest Spotify Exp").then(() => console.log('Device name changed!'))
        })

        // TODO move player init to another file returning player. Thinking we pass a map with key = evtListener, value call back. Or should we add evtListeners in useEffect?
        // const script = document.createElement("script");
        // script.src = "https://sdk.scdn.co/spotify-player.js";
        // script.async = true;

        // document.body.appendChild(script);
        // // ? do we want token as a dep in useEffect? After logging in and coming back to page playback doesn't work till you refresh at times. Think it's because we aren't sending player a valid token in init page load.
        // /* @ts-ignore */
        // window.onSpotifyWebPlaybackSDKReady = () => {
        //     /* @ts-ignore */
        //     const player = new window.Spotify.Player({
        //         name: 'Web Playback SDK',
        //         getOAuthToken: (cb:(token:string) => void) => cb(token),
        //         volume: 0.5
        //     });

        //     setPlayer(player);

        //     player.addListener('ready', async ({ device_id }: PlaybackEventCallback) => {
        //         setReady(true);
        //         setDeviceId(device_id)
        //         console.log('Ready with Device ID', device_id);
        //     });

        //     player.addListener('not_ready', ({ device_id }: PlaybackEventCallback) => {
        //         isReady && setReady(false);
        //         setDeviceId(device_id);
        //         console.log('Device ID has gone offline', device_id);
        //     });

        //     player.addListener('player_state_changed', ( (state:AnyObj) => {
        //         console.log('state on change', { state });
        //         if (!state) {
        //             setReady(false)
        //             return;
        //         }
        //         // TODO add logic to ensure this only updates if needed. These are causing unnecessary rerenders.
        //         setTrack(state.track_window.current_track);
        //         setPlaying(!state.paused);
        //     }));

        //     player.connect();
        //     player.getVolume().then((volume: number) => setVolume(volume * 100));
        //     player.setName("The bestest Spotify Exp").then(() => console.log('Device name changed!'))
        // };
    }, [])
    return (
        <>
            { 
                !deviceActive || !isReady ? (
                    <p>This device is not active. Click Play to activate device and resume recent track.</p>
                ) : null
            }
            <div className="container">
                <div className="main-wrapper">
                    <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
                    <div className="now-playing__side">
                        <div className="now-playing__name">{current_track.name}</div>
                        <div className="now-playing__artist">{current_track.artists[0].name}</div>

                        <button className="btn-spotify" onClick={() => skipToPrevious()} >
                            &lt;&lt;
                        </button>

                        <button className="btn-spotify" onClick={() => isPlaying ? pause(deviceId) : resume(deviceId)} >
                            { isPlaying ? "Pause" : "Play" }
                        </button>
                        <div className="temp-volume-container">
                            <button onClick={() => adjustVolume((volume - 10) / 100)}>-</button>
                            <p>{volume}</p>
                            <button onClick={() => adjustVolume((volume + 10) / 100)}>+</button>
                        </div>
                        <button className="btn-spotify" onClick={() => skipToNext()} >
                            &gt;&gt;
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
