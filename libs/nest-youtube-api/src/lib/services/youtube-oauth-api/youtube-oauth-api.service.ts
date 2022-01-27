import {Inject, Injectable} from '@nestjs/common';
import {
    TokenData,
    YOUTUBE_OAUTH_CLIENT_CONFIG_TOKEN, YOUTUBE_OAUTH_TOKEN_STORE_TOKEN,
    YoutubeOauthClientConfigInterface, YoutubeOauthTokenStoreInterface
} from "@auto-archiver/nest-youtube-api";
import {Credentials, GenerateAuthUrlOpts, OAuth2Client} from "google-auth-library";
import {YoutubeOauthApiInterface} from "./youtube-oauth-api.interface";
import {google} from "googleapis";
import {BehaviorSubject, first, Observable} from "rxjs";

@Injectable()
export class YoutubeOauthApiService implements YoutubeOauthApiInterface {

    generalOAuthClient: OAuth2Client;

    constructor(
        @Inject(YOUTUBE_OAUTH_CLIENT_CONFIG_TOKEN) private clientConfigService: YoutubeOauthClientConfigInterface,
        @Inject(YOUTUBE_OAUTH_TOKEN_STORE_TOKEN) private tokenStoreService: YoutubeOauthTokenStoreInterface<unknown>,
    ) {
        this.generalOAuthClient = this.generateOAuthClient();
    }

    private generateOAuthClient(): OAuth2Client {
        return new OAuth2Client({
            clientId: this.clientConfigService.getClientId(),
            clientSecret: this.clientConfigService.getClientSecret(),
            redirectUri: 'http://localhost:3333/api/oauth/close',
        });
    }

    private async generateOAuthClientFor(id: unknown): Promise<OAuth2Client> {
        const client = this.generateOAuthClient();
        const tokenData = await this.tokenStoreService.getTokenData(id);
        client.credentials = {
            access_token: tokenData.latestAccessToken,
            refresh_token: tokenData.refreshToken,
            token_type: tokenData.tokenType,
        };
        return client;
    }


    generateOAuthUrl(config: GenerateAuthUrlOpts): string {
        return this.generalOAuthClient.generateAuthUrl(config);
    }

    async getToken(code: string): Promise<Credentials> {
        const response = await this.generalOAuthClient.getToken(code);
        return response.tokens;
    }

    async getAndSaveToken(code: string): Promise<Omit<TokenData<unknown>, 'id'>> {
        const response = await this.generalOAuthClient.getToken(code);
        const credentials = response.tokens;

        const tokenData: Omit<TokenData<unknown>, 'id'> = {
            latestAccessToken: credentials.access_token,
            refreshToken: credentials.refresh_token,
            scopes: credentials.scope?.split(' ') ?? [],
            expiryDateTime: new Date(credentials.expiry_date),
            tokenType: credentials.token_type as 'Bearer',
        };

        return this.tokenStoreService.createTokenData(tokenData);
    }

    async getPlaylistItems(id: number, playlistId: string): Promise<any> {
        const client = await this.generateOAuthClientFor(id);
        const youtube = google.youtube('v3');

        const resultObserver = new Observable<any>((subscriber) => {
            youtube.playlistItems.list({
                auth: client,
                // @ts-ignore
                part: 'id,contentDetails',
                playlistId: playlistId,
            }, function (err, response) {
                subscriber.next(response);
                return;
            });
        });

        return resultObserver
            .pipe(first())
            .toPromise()

    }

}
