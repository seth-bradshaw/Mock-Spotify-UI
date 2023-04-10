export type Playlist = any

export type SavedPlaylists = {
    playlists: Array<Playlist>;
    offset: number;
    limit: number;
    total: number;
}

export type PlaylistState = {
    savedPlaylists: SavedPlaylists
    activePlaylist: Playlist
    status: string;
    error: string | null | { message?: string };
}