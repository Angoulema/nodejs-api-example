import User from '../entities/User';
import { Demo } from '../persistance/demo-repository';

export default class UserService {
  private userRepository: Demo;
  constructor() { 
    this.userRepository = new Demo();
  }

  public async getUser(id: string) {
    const user = await this.userRepository.getUser(id);
    return user;
  }

  public async getUsers(loginPart?: string, limit?: number) {
    let users: User[];
    if (loginPart || limit) {
      users = await this.userRepository.getUsersBySubstr(loginPart, limit);
    } else {
      users = await this.userRepository.getUsers();
    }
    
    return users.length ? users : null;
  }

  public async postUser(user: Pick<User, 'login' | 'password' | 'age'>) {
    const result = await this.userRepository.addUser({ ...user, isDeleted: false });
    return result;
  }

  public async deleteUser(id: string) {
    const result = await this.userRepository.deleteUser(id);
    return result;
  }

  public async updateUser(id: string, user: Partial<User>) {
    const result = await this.userRepository.changeUser(id, user);
    return result;
  }
}
