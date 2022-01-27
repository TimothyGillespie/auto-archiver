import {GenerateAuthUrlOpts} from "google-auth-library/build/src/auth/oauth2client";
import {Credentials} from "google-auth-library";
import {TokenData} from "@auto-archiver/nest-youtube-api";

export const YOUTUBE_OAUTH_API_TOKEN = 'YOUTUBE_OAUTH_API_TOKEN';

export interface YoutubeOauthApiInterface {
    generateOAuthUrl(config: GenerateAuthUrlOpts): string;
    getToken(code: string): Promise<Credentials>;
    getAndSaveToken(code: string): Promise<Omit<TokenData<unknown>, 'id'>>;
    getPlaylistItems(id: number, playlistId: string): Promise<any>;
}
