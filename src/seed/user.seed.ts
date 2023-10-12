import { faker } from "@faker-js/faker";
import User from "../entities/User";

function generateRandomUser(): Pick<User, "login" | "password" | "age" | "isDeleted"> {
  return {
    login: faker.internet.userName(),
    password: faker.internet.password(),
    age: Math.round(Math.random() * 125 + 4),
    isDeleted: false
  }
}

export function generateUsers(num: number): Pick<User, "login" | "password" | "age" | "isDeleted">[] {
  const users: Pick<User, "login" | "password" | "age" | "isDeleted">[] = [];
  Array.from({ length: num}).forEach((_item) => users.push(generateRandomUser()));
  return users;
}
