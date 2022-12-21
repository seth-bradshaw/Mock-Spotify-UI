import React, { ReactElement } from 'react'
import { createAbstractBuilder } from 'typescript';
import { WebPlaybackTrack } from '../context/types'
import { Artists } from '../context/types';

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
  const createListOfArtists = () => {
    if (!track) return;

    if (track?.artists?.length < 2) {
      return track?.artists[0].name;
    } else {
      return track?.artists?.reduce((acc: string,  curr: Artists, idx: number) => {
        acc += `${idx === track?.artists.length - 1 ? curr.name : curr.name + ', '}`;
        return acc;
      }, '');
    }
  }

  return (
    // TODO: do expandable album details after routing and sidenav
      // a tags redirect to artist page

  // Possibly to do with word-break and overflow
    <div className="h-full text-left flex flex-col p-1 justify-center ml-[6px]">
      <a className="text-small text-white hover:underline" onClick={(e) => {
        e.preventDefault();
      }}>
          {/* <p className="truncate">{track?.name ?? ''}</p>
      </a>
      <a className="text-[11px] text-spotify-gray-300 break-keep text-ellipsis" onClick={(e) => {
        e.preventDefault();
      }}>
        <p className="truncate">{createListOfArtists()}</p> */}
          <p className="truncate">{track?.name ?? ''}</p>
      </a>
      <a className="text-[11px] text-spotify-gray-300 break-keep text-ellipsis hover:underline" onClick={(e) => {
        e.preventDefault();
      }}>
        <p className="truncate">{createListOfArtists()}</p>
      </a>
    </div>
  )
}
