import { useContext } from "react"
import {PlaybackContext} from "./PlaybackContext"



const usePlaybackContext = ():{[key:string]:any} => {
    const context = useContext(PlaybackContext)
    return context
}

export default usePlaybackContext