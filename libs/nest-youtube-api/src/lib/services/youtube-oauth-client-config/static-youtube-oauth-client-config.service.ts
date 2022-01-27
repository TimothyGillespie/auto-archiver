import { Injectable } from '@nestjs/common';
import {YoutubeOauthClientConfigInterface} from "./youtube-oauth-client-config.interface";

@Injectable()
export class StaticYoutubeOauthClientConfigService implements YoutubeOauthClientConfigInterface {

    constructor(private clientId: string, private clientSecret: string) {}


    getClientId(): string {
        return this.clientId;
    }

    getClientSecret(): string {
        return this.clientSecret;
    }

}
