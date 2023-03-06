import { MigrationInterface, QueryRunner } from "typeorm";

export class last1678132050370 implements MigrationInterface {
    name = 'last1678132050370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "FK_bad6da95df432b305ba3a3152c2"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME COLUMN "realEstatateId" TO "realEstateId"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "FK_9ea44d2d89def175ed9db8ccf3f" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "FK_9ea44d2d89def175ed9db8ccf3f"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME COLUMN "realEstateId" TO "realEstatateId"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "FK_bad6da95df432b305ba3a3152c2" FOREIGN KEY ("realEstatateId") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
