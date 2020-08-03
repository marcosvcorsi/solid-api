import IUsersRepository from '../../repositories/IUsersReposity';
import ICreateUserDTO from './CreateUserDTO';
import User from '../../entities/User';
import IMailProvider from '../../providers/IMailProvider';

export default class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute({ email, name, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User({ email, name, password });

    await this.usersRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        email,
        name,
      },
      from: {
        email: 'equipe@app.com.br',
        name: 'Equipe',
      },
      subject: 'Cadastro de Usuário',
      body: 'Seja bem vindo',
    });
  }
}
