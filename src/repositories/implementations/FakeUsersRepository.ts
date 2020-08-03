import IUsersRepository from '../IUsersReposity';
import User from '../../entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
