export const YOUTUBE_OAUTH_TOKEN_STORE_TOKEN = 'YOUTUBE_OAUTH_TOKEN_STORE_TOKEN';

export interface YoutubeOauthTokenStoreInterface<T> {
    getTokenData(id: T): Promise<TokenData<T>>;
    patchTokenData(id: T, tokenData: TokenData<T>): Promise<void>;
    createTokenData(tokenData: Omit<TokenData<T>, 'id'>): Promise<TokenData<T>>;
}

export interface TokenData<T> {
    id: T;
    latestAccessToken: string;
    refreshToken: string;
    scopes: string[];
    tokenType: 'Bearer';
    expiryDateTime?: Date;
}
