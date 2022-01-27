import {Controller, Get, Inject, Param} from "@nestjs/common";
import {
    YOUTUBE_OAUTH_API_TOKEN,
    YoutubeOauthApiInterface
} from "../../../../libs/nest-youtube-api/src/lib/services/youtube-oauth-api/youtube-oauth-api.interface";

@Controller('data')
export class DataController {
    constructor(
        @Inject(YOUTUBE_OAUTH_API_TOKEN) private youtubeApi: YoutubeOauthApiInterface,
    ) {}

    @Get(':id/playlistItems')
    async getPlaylist(@Param('id') string): Promise<any> {
        return this.youtubeApi.getPlaylistItems(3, 'WL');
    }
}
