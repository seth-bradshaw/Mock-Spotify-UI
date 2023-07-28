import { useContext } from "react"
import { LibraryContext } from "./LibraryContext";

// TODO change type once we flesh out playback context type
const useLibraryContext = ():{[key:string]:any} => {
    const context = useContext(LibraryContext)
    return context;
}

export default useLibraryContext