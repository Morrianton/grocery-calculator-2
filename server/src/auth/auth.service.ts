import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user: any = await this.usersService.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(pass, user.passwordHash);
    if (ok) {
      const { passwordHash, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user._id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(email: string, password: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new UnauthorizedException('User exists');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(email, hash);
    return { id: user._id, email: user.email };
  }
}
