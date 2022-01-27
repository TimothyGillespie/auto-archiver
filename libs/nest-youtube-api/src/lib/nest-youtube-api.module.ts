import {DynamicModule, Module} from '@nestjs/common';
import {
    YOUTUBE_OAUTH_CLIENT_CONFIG_TOKEN, YoutubeOauthClientConfigInterface
} from "./services/youtube-oauth-client-config/youtube-oauth-client-config.interface";
import {
    StaticYoutubeOauthClientConfigService
} from "./services/youtube-oauth-client-config/static-youtube-oauth-client-config.service";
import {
    YOUTUBE_OAUTH_TOKEN_STORE_TOKEN, YoutubeOauthTokenStoreInterface
} from "./services/youtube-oauth-token-store/youtube-oauth-token-store.interface";
import {
    DbYoutubeOauthTokenStoreService, TypeOrmServiceConfig
} from "./services/youtube-oauth-token-store/db-youtube-oauth-token-store.service";
import {YOUTUBE_OAUTH_API_TOKEN} from "./services/youtube-oauth-api/youtube-oauth-api.interface";
import {YoutubeOauthApiService} from "./services/youtube-oauth-api/youtube-oauth-api.service";

@Module({
    controllers: [],
    providers: [],
    exports: [],
})
export class NestYoutubeApiModule {

    static forRoot(config: YoutubeOAuthApiConfiguration): DynamicModule {
        const clientConfig = new StaticYoutubeOauthClientConfigService(config.clientId, config.clientSecret);
        const tokenStore = new DbYoutubeOauthTokenStoreService(config.typeOrmConfig);

        return {
            module: NestYoutubeApiModule,
            providers: [
                {
                    provide: YOUTUBE_OAUTH_CLIENT_CONFIG_TOKEN,
                    useValue: clientConfig,
                },
                {
                    provide: YOUTUBE_OAUTH_TOKEN_STORE_TOKEN,
                    useFactory: async () => {
                        await tokenStore.init();
                        return tokenStore;
                    }
                },
                {
                    provide: YOUTUBE_OAUTH_API_TOKEN,
                    useFactory: (
                        client: YoutubeOauthClientConfigInterface,
                        store: YoutubeOauthTokenStoreInterface<any>
                    ) =>
                        new YoutubeOauthApiService(client, store),
                    inject: [YOUTUBE_OAUTH_CLIENT_CONFIG_TOKEN ,YOUTUBE_OAUTH_TOKEN_STORE_TOKEN]
                }
            ],
            exports: [YOUTUBE_OAUTH_CLIENT_CONFIG_TOKEN, YOUTUBE_OAUTH_TOKEN_STORE_TOKEN, YOUTUBE_OAUTH_API_TOKEN],
        }
    }

}

export interface YoutubeOAuthApiConfiguration {
    clientId: string;
    clientSecret: string;
    typeOrmConfig: TypeOrmServiceConfig,
}
