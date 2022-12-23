import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getCurrentUserPlaylists, getPlaylistImages, getPlaylistItems } from '../../../services';
import { AnyObj } from '../../playback/context/types';

type Props = {}

export default function Playlist({}: Props) {
    // ? should this be in redux, then we fetch items and add it to playlist? questions questions...
    const [playlist, setPlaylist] = useState<AnyObj>({
        "collaborative": false,
        "description": "Spotify Wrapped presents the songs that you loved most this year.",
        "external_urls": {
            "spotify": "https://open.spotify.com/playlist/37i9dQZF1F0sijgNaJdgit"
        },
        "href": "https://api.spotify.com/v1/playlists/37i9dQZF1F0sijgNaJdgit",
        "id": "37i9dQZF1F0sijgNaJdgit",
        "images": [
            {
                "height": null,
                "url": "https://wrapped-images.spotifycdn.com/image/yts-2022/large/your-top-songs-2022_large_en.jpg",
                "width": null
            }
        ],
        "name": "Your Top Songs 2022",
        "owner": {
            "display_name": "Spotify",
            "external_urls": {
                "spotify": "https://open.spotify.com/user/spotify"
            },
            "href": "https://api.spotify.com/v1/users/spotify",
            "id": "spotify",
            "type": "user",
            "uri": "spotify:user:spotify"
        },
        "primary_color": null,
        "public": false,
        "snapshot_id": "MTY2OTkwODk2MiwwMDAwMDAwMDBiNjFiY2QxNTNkMTdkZjM2MDAwYmUyNjE3M2RmODE5",
        "tracks": {
            "href": "https://api.spotify.com/v1/playlists/37i9dQZF1F0sijgNaJdgit/tracks",
            "total": 101
        },
        "type": "playlist",
        "uri": "spotify:playlist:37i9dQZF1F0sijgNaJdgit"
    });
    const params = useParams();

    useEffect(() => {
        const getPlaylist = async () => {
            // const playlists = await getCurrentUserPlaylists();
            // console.log('playlists', { playlists })
            const items = await getPlaylistItems(params.playlistid ?? '');
            setPlaylist({...playlist, items});
        }
        getPlaylist()

    }, [])

  return (
    <div className="h-full mb-5 text-xl text-white mt-24">
        <div className="flex w-full">
            <img src={playlist.images[0].url} className="w-24 h-24 object-scale-down"></img>
            <h3>{playlist.name}</h3>
        </div>
        <div>
            {
                Boolean(playlist?.items?.items) && (
                    playlist.items.items.map((item: any, idx:number) => (
                        <div className="h-20 w-full flex gap-3 items-center">
                            <div className="text-sm">{ idx + 1}</div>
                            <div className='flex h-full items-center gap-3'>
                                <img src={item.track.album.images[2].url} className="w-8 h-8"></img>
                                <div className="flex flex-col justify-center h-full">
                                    <h5 className="text-white text-lg">{item.track.name}</h5>
                                    <p className="text-spotify-gray-300 text-xs">{item.track.artists[0].name}</p>
                                </div>
                            </div>
                            
                        </div>
                    ))
                )
            }
        </div>
    </div>
  )
}