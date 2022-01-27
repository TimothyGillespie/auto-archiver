import { Test, TestingModule } from '@nestjs/testing';
import {NestYoutubeApiModule} from "@auto-archiver/nest-youtube-api";
import {
    YOUTUBE_OAUTH_CLIENT_CONFIG_TOKEN,
    YoutubeOauthClientConfigInterface
} from "./youtube-oauth-client-config.interface";

describe('YoutubeOauthClientConfigService', () => {
    let service: YoutubeOauthClientConfigInterface;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [NestYoutubeApiModule.forRoot({
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                typeOrmConfig: {
                    type: 'mariadb',
                }
            })]
        }).compile();

        service = module.get<YoutubeOauthClientConfigInterface>(
            YOUTUBE_OAUTH_CLIENT_CONFIG_TOKEN
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return clientId for getClientId()', () => {
        expect(service.getClientId()).toBe('clientId');
    });

    it('should return clientSecret for getClientSecret()', () => {
        expect(service.getClientSecret()).toBe('clientSecret');
    });

});
