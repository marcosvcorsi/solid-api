import IUsersRepository from '../../repositories/IUsersReposity';
import ICreateUserDTO from './CreateUserDTO';
import User from '../../entities/User';

export default class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User({ email, name, password });

    await this.usersRepository.save(user);
  }
}
