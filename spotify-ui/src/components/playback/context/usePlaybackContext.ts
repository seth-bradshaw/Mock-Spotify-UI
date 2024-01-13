import { useContext } from "react"
import {PlaybackContext} from "./PlaybackContext"

// TODO change type once we flesh out playback context type
const usePlaybackContext = ():{[key:string]:any} => {
    const context = useContext(PlaybackContext)
    return context;
}

export default usePlaybackContext