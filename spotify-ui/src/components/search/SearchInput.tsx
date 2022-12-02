import React, {useState, useRef} from 'react'
import { getCurrentUserPlaylists, searchQuery, bulkAddItemsToQueue, playTrack, getPlaylistItems } from '../../services'
import { addTrackToQueue } from '../../services'
export default function SearchInput() {
    const [search, setSearch] = useState("")
    const [tracks, setTracks] = useState([])
    const [playlists, setPlaylists] = useState([]);
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
  
    const getPlaylists = async () => {
      const response = await getCurrentUserPlaylists();
      setPlaylists(response.items);
    }

    const addPlaylistToQueue = async (id: string) => {
      const tracks = await getPlaylistItems(id);
      await bulkAddItemsToQueue(tracks.items);
      // await playTrack({ body: { context_uri: uri } })
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
    <button onClick={getPlaylists}>Get Playlists</button>
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

    {
        playlists.map((playlist:any) => {
          return (
            <div>
              <img src={playlist.images[0].url} />
              <h1 onClick={() => addPlaylistToQueue(playlist.id)} key={playlist.id}>{playlist.name}</h1>
            </div>
          )
        })
    }
    </>
  )
}
