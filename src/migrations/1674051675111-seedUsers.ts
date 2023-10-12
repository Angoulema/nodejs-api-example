// import { MigrationInterface, QueryRunner } from "typeorm";
// import User from "../entities/User";
// import connection from "../persistance/data-source";
// import { generateUsers } from "../seed/user.seed";

// export class seedUsers1674051675111 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         const users = generateUsers(10);
//         await connection.getRepository(User).save(users);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await connection.getRepository(User).clear();
//     }

// }
