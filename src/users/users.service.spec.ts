import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpType, User } from './entity/users.entity';
import { UsersService } from './users.service';

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('유저 생성', () => {
    const createAccountArgs = {
      login_id: 'admin',
      first_name: 'a',
      last_name: 'b',
      signup_type: SignUpType['Local'],
    };

    it('존재하는 id 생성 불가.', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        login_id: '',
        first_name: '',
        last_name: '',
        signup_type: SignUpType['Local'],
      });

      const result = await service.createUser(createAccountArgs);
      expect(result).toMatchObject({
        ok: false,
        error: '이미 존재하는 id 입니다',
      });
    });

    it('id 생성', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        login_id: '',
        first_name: '',
        last_name: '',
        signup_type: SignUpType['Local'],
      });

      const result = await service.createUser(createAccountArgs);
      expect(result).toMatchObject({
        ok: false,
        error: '이미 존재하는 id 입니다',
      });
    });
  });
});
