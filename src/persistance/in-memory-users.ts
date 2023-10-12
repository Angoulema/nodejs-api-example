interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export default class Users {
  users: User[];

  constructor() {
    this.users = [
      {
        id: 'random',
        login: 'Hanna',
        password: 'goose111',
        age: 15,
        isDeleted: false
      },
      {
        id: 'random1',
        login: 'Halina',
        password: 'goose111',
        age: 13,
        isDeleted: false
      }
    ]
  }

  public getUser(id: string): User | undefined {
    return this.users
      .filter(({ isDeleted }) => !isDeleted)
      .find((user) => user.id === id);
  }

  public getAllUsers(): User[] {
    const result = this.users.filter(({ isDeleted }) => !isDeleted);
    return result;
  }

  public getUsers(searchString: string, limit: number): User[] {
    // searching for users by username part
    const usersByRequest = this.users.filter(({ login }) => login.toLowerCase().startsWith(searchString.toLowerCase()));
    const quantity = usersByRequest.length;
    if (quantity <= limit) {
      return usersByRequest;
    } else {
      return usersByRequest.slice(0, limit);
    }
  }

  public addUser(user: User): User {
    this.users.push(user);
    return user;
  }

  public updateUser(user: User): User {
    const ind = this.users.findIndex(({ id }) => id === user.id);
    this.users[ind] = user;
    return this.users[ind];
  }

  public softDeleteUser(id: string): boolean {
    const ind = this.users.findIndex((user) => user.id === id);
    if (ind >= 0) {
      this.users[ind] = {
        ...this.users[ind],
        isDeleted: true
      }
      return true;
    }
    return false;
  }
}
