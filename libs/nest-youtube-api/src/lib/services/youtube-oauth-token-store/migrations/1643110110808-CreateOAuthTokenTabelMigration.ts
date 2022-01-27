import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOAuthTokenTabelMigration1643110110808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'o_auth_token',
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
            },{
                name: 'latestAccessToken',
                type: 'varchar'
            },{
                name: 'refreshToken',
                type: 'varchar'
            },{
                name: 'scopes',
                type: 'text'
            },{
                name: 'tokenType',
                type: 'varchar'
            },{
                name: 'expiryDateTime',
                type: 'datetime'
            }, {
                name: 'createdAt',
                type: 'timestamp',
                default: 'now()'
            }, {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'now()'
            }, {
                name: 'deletedAt',
                type: 'timestamp'
            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('o_auth_token')
    }

}
