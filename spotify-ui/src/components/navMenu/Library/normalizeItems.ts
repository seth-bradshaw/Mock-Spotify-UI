type LibraryItems = {
    artists: any
    albums: any
    playlists: any
}

const normalizeAlbums = (albums = []) => {
    const normalized = albums.map(({album}) => {
        return {
            id: album.id,
            imageUrl: album.images.at(0).url,
            name: album.name,
            description: album.artists.at(0).name,
            href:`album/${album.id}`
        }
    })
    return normalized
}

const normalizeArtists = (artists = []) => {
    const normalized = artists.map((artist) => {
        return {
            id: artist.id,
            imageUrl: artist.images.at(0).url,
            name: artist.name,
            description: '',
            href: `artist/${artist.id}`
        }
    })
    return normalized
}

const normalizePlaylists = (playlists = []) => {
    const normalized = playlists.map((playlist) => {
        return {
            id: playlist.id,
            imageUrl: playlist.images.at(0).url,
            name: playlist.name,
            description: playlist.type.slice(0,1).toUpperCase() + playlist.type.slice(1) + ' • ' + playlist.owner.display_name,
            href: `playlist/${playlist.id}`
        }
    })
    return normalized
}

const normalizeMap = {
    playlists: normalizePlaylists,
    albums: normalizeAlbums,
    artists: normalizeArtists,
}

export default function normalizeItems (items: LibraryItems) {
    const normalized = Object.keys(items).reduce((acc, key: string) => {
        acc[key] = normalizeMap[key](items[key])
        return acc
    }, {})

    return normalized
}