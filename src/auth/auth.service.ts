import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async signUp(authCredential: AuthCredentialDto): Promise<void> {
        return this.userRepository.signUp(authCredential);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
        const username = await this.userRepository.validateUserPassword(authCredentialDto);
        if(username) {
            throw new UnauthorizedException('Invalid credential');
        }
        return username;
    }
}
