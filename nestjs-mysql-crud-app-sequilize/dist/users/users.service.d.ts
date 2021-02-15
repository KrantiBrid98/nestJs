import { User } from './user.entity';
export declare class UsersService {
    private catsRepository;
    constructor(catsRepository: typeof User);
    findAll(): Promise<User[]>;
}
