import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    async signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}>  {
        return this.authService.signIn(authCredentialDto);
    }
}
