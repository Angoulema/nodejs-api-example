import User from '../entities/User';
import connection from './data-source';

export class Demo {
  constructor() { }

  public async getUser(userId: string): Promise<User | null> {
    return await connection.getRepository(User).findOneBy({ id: userId });
  }

  public async getUsers(): Promise<User[]> {
    return await connection.getRepository(User).find();
  }

  public async getUsersBySubstr(substr: string = '', limit: number = 100): Promise<User[]> {
    return await connection.getRepository(User)
      .createQueryBuilder('users')
      .where('users.login like :str', { str: `%${substr}%` })
      .orderBy('users.login', 'ASC')
      .take(limit)
      .getMany();
  }

  public async addUser(user: Partial<User>): Promise<User> {
    const repo = connection.getRepository(User);
    return await repo.save(user);
  }

  public async changeUser(userId: string, partialUser: Partial<User>) {
    const repo = connection.getRepository(User);
    await repo.update({ id: userId}, partialUser)
    const updatedUser = await repo.findOneBy({ id: userId});
    return updatedUser;
  }

  public async deleteUser(userId: string) {
    const repo = connection.getRepository(User);
    const userToUpdate = await repo.findOneBy({ id: userId });
    if (!userToUpdate) return false; // later: throw specific error
    await repo.softDelete({ id: userId });
    return true;
  }
}

// let repository: Demo | null = null;
// export const getRepository = async(): Promise<Demo> => {
//   if (repository) {
//     return repository;
//   }

//   connection.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     });
//   repository = new Demo();
//   return repository;
// };
