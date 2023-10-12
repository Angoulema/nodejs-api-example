import { initApp } from './app';
import UsersController from './controllers/users';
import User from './entities/User';
import connection from './persistance/data-source';
import { generateUsers } from './seed/user.seed';
import { putSeedData } from './utils/put-seed-data-to-table';

const port = process.env.PORT || 8080;

const seedUsers = async () => {
  const users = generateUsers(10);
  await putSeedData<User>('users', users);
  console.log('Users seeded');
};

(async () => {
  try {
    await connection.initialize();
    console.log("Data Source has been initialized");
  } catch (err) {
    console.error("Error during Data Source initialization", err);
    process.exit(1);
  }
  // seed db. Comment out for prod
  await seedUsers();

  const usersController = new UsersController();
  const app = initApp(usersController);
  
  const server = app.listen(port, () => {
    console.log(`Service is running on port ${port}`);
  })
})();
