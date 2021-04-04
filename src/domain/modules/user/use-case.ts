import { Inject, Injectable } from '@nestjs/common';
import { CryptUtilContract, UserRepositoryContract } from '@/contracts';
import { RepositoryDIToken, UtilDIToken } from '../shared';
import { User, UserRole } from './entity';
import {
  EmailTakenException,
  InvalidCredentialGivenException,
} from './exception';

@Injectable()
export class UserUseCase {
  constructor(
    @Inject(RepositoryDIToken.UserRepositoryContract)
    private userRepo: UserRepositoryContract,

    @Inject(UtilDIToken.CryptUtilContract)
    private cryptUtil: CryptUtilContract,
  ) {}

  async register(props: RegisterProps): Promise<User> {
    const { email, password, name } = props;
    const otherUser = await this.userRepo.getDetailByEmail(email);

    if (otherUser) {
      throw new EmailTakenException();
    }

    const newUser = await this.userRepo.create({
      name,
      email,
      password: await this.cryptUtil.hash(password),
      role: UserRole.AUTHOR,
    });

    return newUser;
  }

  async login(props: LoginProps): Promise<User> {
    const { email, password } = props;
    const user = await this.userRepo.getDetailByEmail(email);

    if (!user) {
      throw new InvalidCredentialGivenException();
    }

    const isPasswordValid = await this.cryptUtil.validate(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialGivenException();
    }

    return user;
  }

  async getMe(id: string): Promise<User | undefined> {
    const user = await this.userRepo.getDetail(id);

    return user;
  }
}

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}
