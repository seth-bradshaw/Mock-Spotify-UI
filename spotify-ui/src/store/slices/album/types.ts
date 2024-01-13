export type Album = any

export type SavedAlbums = {
    albums: Array<Album>;
    offset: number;
    limit: number;
    total: number;
}

export type AlbumState = {
    savedAlbums:SavedAlbums 
    activeAlbum: Album 
    status: string;
    error: string | null | { message?: string };
}