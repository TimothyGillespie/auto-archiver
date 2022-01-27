import { Test, TestingModule } from '@nestjs/testing';
import { DbYoutubeOauthTokenStoreService } from './db-youtube-oauth-token-store.service';

describe('YoutubeOauthTokenStoreService', () => {
    let service: DbYoutubeOauthTokenStoreService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DbYoutubeOauthTokenStoreService],
        }).compile();

        service = module.get<DbYoutubeOauthTokenStoreService>(
            DbYoutubeOauthTokenStoreService
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
