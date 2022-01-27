export const YOUTUBE_OAUTH_CLIENT_CONFIG_TOKEN = 'YOUTUBE_OAUTH_CLIENT_CONFIG_TOKEN';

export interface YoutubeOauthClientConfigInterface {
    getClientId(): string;
    getClientSecret(): string;
}
