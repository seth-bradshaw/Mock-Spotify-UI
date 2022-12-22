import { ReactElement, useEffect } from 'react'
import { WebPlaybackTrack } from '../context/types'
import { Artists } from '../context/types';
import { AnyObj } from '../context/types';

interface Props {
  track?: WebPlaybackTrack;
}

const MOCK_TRACK = {
  "id": "2GnE8rMDgfWBwGmwrUbCsQ",
  "uri": "spotify:track:2GnE8rMDgfWBwGmwrUbCsQ",
  "type": "track",
  "uid": "2c3c3afce3edabde089e",
  "linked_from": {
      "uri": null,
      "id": null
  },
  "media_type": "audio",
  "track_type": "audio",
  "name": "Caged Bird",
  "duration_ms": 239927,
  "artists": [
      {
          "name": "J. Cole",
          "uri": "spotify:artist:6l3HvQ5sa6mXTsMTB19rO5",
          "url": "https://api.spotify.com/v1/artists/6l3HvQ5sa6mXTsMTB19rO5"
      },
      {
          "name": "Dreamville",
          "uri": "spotify:artist:1iNqsUDUraNWrj00bqssQG",
          "url": "https://api.spotify.com/v1/artists/1iNqsUDUraNWrj00bqssQG"
      },
      {
          "name": "Omen",
          "uri": "spotify:artist:5j1BNsC9xeWGfBVCzzg6fc",
          "url": "https://api.spotify.com/v1/artists/5j1BNsC9xeWGfBVCzzg6fc"
      }
  ],
  "album": {
      "name": "Revenge Of The Dreamers II",
      "uri": "spotify:album:0h7Rqxud5GknQMMoLHNx80",
      "images": [
          {
              "url": "https://i.scdn.co/image/ab67616d00001e0200dba11c081404c7d6913906",
              "height": 300,
              "width": 300,
              "size": "UNKNOWN"
          },
          {
              "url": "https://i.scdn.co/image/ab67616d0000485100dba11c081404c7d6913906",
              "height": 64,
              "width": 64,
              "size": "SMALL"
          },
          {
              "url": "https://i.scdn.co/image/ab67616d0000b27300dba11c081404c7d6913906",
              "height": 640,
              "width": 640,
              "size": "LARGE"
          }
      ]
  },
  "is_playable": true
}

export default function ItemDetails({track}: Props): ReactElement {
  const CreateListOfArtists = () => {
    if (!track) return null;

    return (
      <div id="artist-item-details-container" className="min-w-fit truncate">
        {
          track?.artists?.map((curr: Artists, idx: number) => {
            return <a>{`${idx === track?.artists.length - 1 ? curr.name : curr.name + ', '}`}</a>;
          })
        }
      </div>
    )
  }

  useEffect(() => {
    console.log('useEffect called in ItemDetails')
    
    if (!track) return;

    const wrapper = document.querySelector('#item-details-container');
    if (!wrapper) return;

    const {left, right} = wrapper?.getBoundingClientRect();
    const width = right - left;
    const pTrack = document.querySelector("#track-item-details-container");
    const pTrackRect = pTrack?.getBoundingClientRect();
    const pArtist = document.querySelector("#artist-item-details-container");
    const pArtistRect = pArtist?.getBoundingClientRect();
    console.log({pTrackRect, pArtistRect})

    if (!pTrackRect) return;
    if (!pArtistRect) return;

    const pTrackWidth = pTrackRect.right - pTrackRect.left;
    const pArtistWidth = pArtistRect.right - pArtistRect.left;
    console.log({pTrackWidth, pArtistWidth, width});

    conditionallyAddAnimation(width, [{node: pTrack, width: pTrackWidth}, {node: pArtist, width: pArtistWidth}]);
  }, [track])

  // const handleMouseOverEventHandler = (event: MouseEvent) => {
  //  onsole.log('handleMouseOverEventHandler', event);
  // }

  const conditionallyAddAnimation = (width: number, elementsToAddTo: Array<AnyObj>) => {
    console.log('conditionallyAddAnimation called in ItemDetails');

    const filtered = elementsToAddTo.filter((element) => element.width > width);
    console.log({filtered})

    filtered.forEach((element) => {
      addAnimationToElement(element.node)
    })
  }

  const addAnimationToElement = (element: AnyObj) => {
    console.log('addAnimationToElement called in ItemDetails', {element})

    document.querySelectorAll('#p-item-details-container').forEach((element) => {
      element.classList.add('hover:animate-none', 'animate-scroll-text-linear')
      console.log({element})
    })
  }

  return (
    // TODO: do expandable album details after routing and sidenav
      // a tags redirect to artist page
    <div id="item-details-container" className="h-full text-left flex flex-col p-1 justify-center ml-[6px] overflow-hidden relative z-10">
      <p id="p-item-details-container" className="text-small text-white hover:underline overflow-x-visible z-10" onClick={(e) => {
        e.preventDefault();
      }}>
          <a id="track-item-details-container" className="truncate z-10">{"'Tis a test of ze anime"}</a>
      </p>
      <div id="p-item-details-container" className="text-[11px] text-spotify-gray-300 hover:underline overflow-x-visible z-10" onClick={(e) => {
        e.preventDefault();
      }}>
        <CreateListOfArtists />
      </div>
      <div className="z-20 blur block h-16 w-2 -right-2 absolute bg-spotify-gray-800">
        S
      </div>
    </div>
  )
}
