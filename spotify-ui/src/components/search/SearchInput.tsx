import React, {useState, useEffect, useRef} from 'react'
import { searchQuery } from '../../services'
import { addTrackToQueue } from '../../services'
export default function SearchInput() {
    const [search, setSearch] = useState("")
    const [tracks, setTracks] = useState([])
    const searchRef = useRef()

    const maybeSearchResults = (current:string, ) => {
        setTimeout(async () => {
            if(current === searchRef.current){
                console.log('boom executed =>')
              const yabba = await searchQuery(search)
              setTracks(yabba)
              console.log('tracks', yabba)
            }
            else{
                console.log('search', searchRef.current)
                console.log('current', current)
                console.log('no boom')
            }
        }, 919)
    }
    const concatTracks = async (trackuri:string) => {
        await addTrackToQueue({ uri:trackuri })
    }
   

    const handleChange = (e:any) => {
        setSearch(e.target.value)
        searchRef.current = e.target.value
        maybeSearchResults(e.target.value)
    }
    const onSubmit = async (e:any) => {
        e.preventDefault()
       await searchQuery(search)
    }
  return (
    <>
    <form onSubmit={onSubmit}>
    
    <input
    onChange ={handleChange}
    value={search}
    />
    <button type="submit">Surch</button>
    </form>
    {
        tracks.map((track:any) => {
          return <h1 onClick={() => concatTracks(track.uri)} key={track.id}>{track.name}</h1>
        })
    }
    </>
  )
}
