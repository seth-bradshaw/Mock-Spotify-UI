export type UserState = {
    spotify_profile: any;
    status: string;
    error: null | string | { message: string };
}

export type SpotifyProfile = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Array<String>
    product: string;
    type: string;
    uri: string;
}
type Followers = {
    href: null | string;
    total: number | null;
}
interface ExternalUrls {
    spotify: string;
}

type ExplicitContent = {
    filter_enabled: boolean;
    filter_locked: boolean;
}