import { useContext } from "react"
import { SearchContext } from "./SearchContext";

const useSearchContext = ():{[key:string]:any} => {
    const context = useContext(SearchContext)
    return context;
}

export default useSearchContext 