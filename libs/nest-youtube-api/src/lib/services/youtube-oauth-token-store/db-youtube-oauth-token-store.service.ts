import { Injectable } from '@nestjs/common';
import {TokenData, YoutubeOauthTokenStoreInterface} from "./youtube-oauth-token-store.interface";
import {
    Column,
    Connection,
    ConnectionOptions,
    createConnection,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";

@Injectable()
export class DbYoutubeOauthTokenStoreService implements YoutubeOauthTokenStoreInterface<number> {

    private connection: Connection;

    constructor(private typeOrmConfig: TypeOrmServiceConfig) {
    }

    async init(): Promise<void>{
        const adjustedConfig = {
            ...this.typeOrmConfig,
            entities: [OAuthToken],
            migrations: ['migrations/*.ts']
        } as ConnectionOptions;

        this.connection = await createConnection(adjustedConfig);
        return;
    }

    async getTokenData(id: number): Promise<OAuthToken> {
        const entityManager = this.connection.manager;
        return await entityManager.findOneOrFail(OAuthToken, id);
    }

    async patchTokenData(id: number, tokenData: Partial<OAuthToken>): Promise<void> {
        const entityManager = this.connection.manager;
        await entityManager.update(OAuthToken, id, tokenData);
    }

    async createTokenData(tokenData: Omit<TokenData<number>, 'id'>): Promise<OAuthToken> {
        const entityManager = this.connection.manager;
        const newOauthToken = entityManager.create(OAuthToken, tokenData);
        return await entityManager.save(newOauthToken);
    }
}

@Entity()
export class OAuthToken implements TokenData<number>{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    latestAccessToken: string;

    @Column()
    refreshToken: string;

    @Column("simple-array")
    scopes: string[];

    @Column()
    tokenType: 'Bearer';

    @Column()
    expiryDateTime: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

}

export type TypeOrmServiceConfig = Omit<ConnectionOptions, 'entities' | 'migrations'>;
