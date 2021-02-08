import { HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from 'src/common/common-type';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

const mockRepository = jest.fn(() => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(),
}));

const mockUserService = jest.fn(() => ({
  getUserBydUserId: jest.fn(),
}));

const mockJwtService = jest.fn(() => ({
  getUserBydUserId: jest.fn(),
}));

const mockHttpService = jest.fn(() => ({
  get: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let usersRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: UsersService,
          useValue: mockUserService(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService(),
        },
        {
          provide: HttpService,
          useValue: mockHttpService(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
