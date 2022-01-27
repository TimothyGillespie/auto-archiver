import {Controller, Get, Inject, Query} from '@nestjs/common';
import {
    YOUTUBE_OAUTH_API_TOKEN, YoutubeOauthApiInterface
} from "../../../../libs/nest-youtube-api/src/lib/services/youtube-oauth-api/youtube-oauth-api.interface";

@Controller('oauth')
export class AppController {

    constructor(
        @Inject(YOUTUBE_OAUTH_API_TOKEN) private youtubeApi: YoutubeOauthApiInterface,
    ) {}


    @Get('close')
    oauthEndpoint(@Query('code') code) {
        return this.youtubeApi.getAndSaveToken(code)
    }

    @Get('getUrl')
    getUrl() {
        return this.youtubeApi.generateOAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/youtube.readonly']
        });
    }
}
