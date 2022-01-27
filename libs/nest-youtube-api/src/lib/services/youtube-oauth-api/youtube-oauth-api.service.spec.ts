import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeOauthApiService } from './youtube-oauth-api.service';

describe('YoutubeOauthApiService', () => {
  let service: YoutubeOauthApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeOauthApiService],
    }).compile();

    service = module.get<YoutubeOauthApiService>(YoutubeOauthApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
