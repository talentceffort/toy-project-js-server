import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from 'src/common/common-type';
import { SignUpType, User } from './entities/users.entity';
import { UsersService } from './users.service';

const mockRepository = jest.fn(() => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(),
}));

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

    it('id 가 이미 존재하는 경우일 때.', async () => {
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

    it('중복되는 id가 없을 때 올바르게 유저가 생성되는지?', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);

      const result = await service.createUser(createAccountArgs);
      expect(result).toMatchObject({
        ok: true,
      });
    });
  });

  describe('유저 조회', () => {
    const userInfo = {
      id: 1,
      login_id: 'test@gmail.com',
      first_name: 'a',
      last_name: 'b',
      signup_type: SignUpType['Local'],
    };

    it('유저가 회원 가입한 id 또는 email 로 유저 조회 성공', async () => {
      const createQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce({
          id: 1,
          login_id: 'test@gmail.com',
          first_name: 'a',
          last_name: 'b',
          signup_type: SignUpType['Local'],
        }),
      };

      jest
        .spyOn(usersRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      const result = await service.getUserBydUserId('test@gmail.com');

      expect(result).toMatchObject(userInfo);
    });

    it('유저가 회원 가입한 id 또는 email 로 유저 정보 조회 실패', async () => {
      const createQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(undefined),
      };

      jest
        .spyOn(usersRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      const result = await service.getUserBydUserId('test2@gmail.com');

      expect(result).toBe(undefined);
    });
  });
});
