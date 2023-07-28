import GridWrapper from '../../../common/GridWrapper'
import CardWithDescription, { ImageSize } from '../ViewLayout/CardWithDescription'
import { useNavigate } from 'react-router'

type Props = {
    playlists: Array<any>
}

export default function PlaylistsContainer({playlists}: Props) {
  const navigate = useNavigate();
  
  const handleNavigate = (url: string) => {
    navigate(`/home/${url}`);
  }

  return playlists && (
    <GridWrapper className='bg-spotify-gray-900 p-4 rounded-lg bg-opacity-75'>
      {
        playlists.map((playlist) => playlist && (
          <CardWithDescription
            imgSize={ImageSize.md}
            imgSrc={playlist.images.at(0).url}
            label={playlist.name}
            description={playlist.description}
            handleRedirect={() => handleNavigate(`playlist/${playlist.id}`)}
            spotify_uri={playlist.uri}
          />
        ))
      }
    </GridWrapper>
  )
}