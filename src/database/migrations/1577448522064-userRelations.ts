import {MigrationInterface, QueryRunner} from "typeorm";

export class userRelations1577448522064 implements MigrationInterface {
    name = 'userRelations1577448522064'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user_details` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `lastname` varchar(255) NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(20) NOT NULL, `desciption` text NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user_roles` (`rolesId` int NOT NULL, `usersId` int NOT NULL, INDEX `IDX_13380e7efec83468d73fc37938` (`rolesId`), INDEX `IDX_99b019339f52c63ae615358738` (`usersId`), PRIMARY KEY (`rolesId`, `usersId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `detail_id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD UNIQUE INDEX `IDX_9fc134ca20766e165ad650ee74` (`detail_id`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_9fc134ca20766e165ad650ee74` ON `users` (`detail_id`)", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_9fc134ca20766e165ad650ee740` FOREIGN KEY (`detail_id`) REFERENCES `user_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_13380e7efec83468d73fc37938e` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_99b019339f52c63ae6153587380` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_99b019339f52c63ae6153587380`", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_13380e7efec83468d73fc37938e`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_9fc134ca20766e165ad650ee740`", undefined);
        await queryRunner.query("DROP INDEX `REL_9fc134ca20766e165ad650ee74` ON `users`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP INDEX `IDX_9fc134ca20766e165ad650ee74`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `detail_id`", undefined);
        await queryRunner.query("DROP INDEX `IDX_99b019339f52c63ae615358738` ON `user_roles`", undefined);
        await queryRunner.query("DROP INDEX `IDX_13380e7efec83468d73fc37938` ON `user_roles`", undefined);
        await queryRunner.query("DROP TABLE `user_roles`", undefined);
        await queryRunner.query("DROP TABLE `roles`", undefined);
        await queryRunner.query("DROP TABLE `user_details`", undefined);
    }

}
