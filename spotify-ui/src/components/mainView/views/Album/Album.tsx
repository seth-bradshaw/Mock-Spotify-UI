import React, { useEffect } from 'react'
import { isEmpty } from 'ramda'
import { useNavigate, useParams } from 'react-router';
import fetchAlbumDetails from '../../../../store/slices/album/fetchAlbumDetails';
import { useDispatch, useSelector } from '../../../../store/hooks';
import { getActiveAlbum } from '../../../../store/slices/album/album.selectors';
import ViewWrapper from '../ViewLayout/ViewWrapper';
import HeaderSection from '../ViewLayout/HeaderSection';
import { extractId, resumePlayer } from '../../../../services';
import Section from '../ViewLayout/Section';
import CardRow from '../ViewLayout/CardRow';
import TrackCard from '../ViewLayout/TrackCard';
import ActionBar from '../ViewLayout/ActionBar';
import fetchAlbumTracks from '../../../../store/slices/album/fetchAlbumTracks';


type Props = {
    artists: Array<any>
    releaseYear: string
    totalTracks: number
}

const Subheader = ({ artists, releaseYear, totalTracks }) => {
    const navigate = useNavigate();

    const openArtistDetails = (id: string) => {
        navigate(`/home/artist/${id}`);
    }

    return (
        <div className="flex gap-2 text-white text-lg">
            {
                artists.map((artist, idx) => {
                    return (
                        <>
                            <span className="font-bold">
                                <a onClick={() => openArtistDetails(artist.id)} className="hover:underline">{artist.name}</a>
                            </span>
                            {
                                artists.length - 1 > idx ?
                                ' • ' :
                                ''
                            } 
                        </>
                    )
                })
            }
            {' • '}
            <span>
                <p>{releaseYear}</p>
            </span>
            {' • '}
            <span>
                <p>{`${totalTracks} song${totalTracks > 1 ? 's' : ''}`}</p>
            </span>
        </div>
    )
}

export default function Album({}) {
    const dispatch = useDispatch();
    const { albumid = "" } = useParams();
    const album = useSelector(getActiveAlbum);

    useEffect(() => {
        dispatch(fetchAlbumDetails(albumid));
    }, [albumid]);

    const playAlbum = async () => {
        await resumePlayer({ context_uri: album.uri });
    }

    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString(undefined, options);
    }

    const fetchMoreTracks = () => {
        dispatch(fetchAlbumTracks({ paramsObj: { offset: album.tracks.offset ?? 0, limit: 50 }, album_id: album.id }))
    }

    return (
        <ViewWrapper isLoading={isEmpty(album)}>
            <HeaderSection
                header={album.name}
                subheader={<Subheader artists={album.artists} releaseYear={album.release_date?.slice(0,4)} totalTracks={album.tracks?.total}></Subheader>}
                label={album.album_type?.slice(0,1)?.toUpperCase() + album.album_type?.slice(1)}
                imgSrc={album.images?.at(0)?.url}
            />
            <div className="h-full py-2 px-4 pt-0">
                <ActionBar handleClickPlay={playAlbum}></ActionBar>
                <Section>
                    <CardRow className="flex-col mb-4">
                        {album?.tracks?.items?.map((track) => (
                        <TrackCard
                            spotify_uri={track.uri}
                            imgSrc={album.images.at(0).url}
                            trackTitle={track.name}
                            duration={track.duration_ms}
                            explicit={track.explicit}
                            artists={track.artists}
                        />
                        ))}
                    </CardRow>
                    {album.tracks?.offset < album.tracks?.total && (
                        <div className="flex w-full items-center justify-center py-5">
                        <button
                            className="p-2 text-white bg-spotify-gray-300 rounded-lg"
                            onClick={fetchMoreTracks}
                        >
                            View more
                        </button>
                        </div>
                    )}
                    <div className="w-full text-white text-sm pl-4">
                        <p className="text-lg mb-2">{formatDate(album.release_date)}</p>
                        {
                            album.copyrights?.map((copyright) => {
                                return (
                                    <p>{copyright.text}</p>
                                )
                            })
                        }
                    </div>
                </Section>
            </div>

        </ViewWrapper>
    )
}