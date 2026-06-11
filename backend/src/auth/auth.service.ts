import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

interface CaptchaStore {
  answer: number;
  expiresAt: number;
}

@Injectable()
export class AuthService {
  private captchaStore = new Map<string, CaptchaStore>();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {
    setInterval(() => this.purgeExpiredCaptchas(), 5 * 60 * 1000);
  }

  private purgeExpiredCaptchas() {
    const now = Date.now();
    for (const [token, entry] of this.captchaStore.entries()) {
      if (now > entry.expiresAt) this.captchaStore.delete(token);
    }
  }

  generateCaptcha(): { token: string; question: string } {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const answer = a + b;
    const token = crypto.randomBytes(16).toString('hex');

    this.captchaStore.set(token, {
      answer,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    return { token, question: `¿Cuánto es ${a} + ${b}?` };
  }

  private verifyCaptcha(token: string, answer: string): boolean {
    const entry = this.captchaStore.get(token);
    if (!entry || Date.now() > entry.expiresAt) {
      if (entry) this.captchaStore.delete(token);
      return false;
    }

    const isValid = parseInt(answer, 10) === entry.answer;
    this.captchaStore.delete(token);
    return isValid;
  }

  async login(dto: LoginDto, ip: string, userAgent: string) {
  console.log('\n================ LOGIN =================');
  console.log('EMAIL RECIBIDO:', dto.email);
  console.log('PASSWORD RECIBIDA:', dto.password);
  console.log('CAPTCHA TOKEN:', dto.captchaToken);
  console.log('CAPTCHA ANSWER:', dto.captchaAnswer);

  // 1. Verificar CAPTCHA
  if (!this.verifyCaptcha(dto.captchaToken, dto.captchaAnswer)) {
    console.log('ERROR: CAPTCHA INCORRECTO');

    throw new BadRequestException(
      'Respuesta CAPTCHA incorrecta o expirada',
    );
  }

  console.log('CAPTCHA OK');

  // 2. Buscar usuario
  const user = await this.usersService.findByEmail(dto.email);

  console.log('=================================');

  if (!user) {
    console.log('USUARIO NO EXISTE');

    await this.logAccess(
      null,
      ip,
      userAgent,
      'LOGIN_FAILED',
      `Email no encontrado: ${dto.email}`,
    );

    throw new UnauthorizedException('Credenciales inválidas');
  }

  console.log('USUARIO ENCONTRADO');
  console.log('ID:', user.id);
  console.log('EMAIL BD:', user.email);
  console.log('HASH BD:', user.password);

  // 3. Comparar contraseña
  const passwordValid = await bcrypt.compare(
    dto.password,
    user.password,
  );

  console.log('BCRYPT RESULT:', passwordValid);

  if (!passwordValid) {
    console.log('ERROR: CONTRASEÑA INCORRECTA');

    await this.logAccess(
      user.id,
      ip,
      userAgent,
      'LOGIN_FAILED',
      'Contraseña incorrecta',
    );

    throw new UnauthorizedException('Credenciales inválidas');
  }

  console.log('LOGIN CORRECTO');

  // 4. Generar JWT
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const token = this.jwtService.sign(payload);

  await this.logAccess(
    user.id,
    ip,
    userAgent,
    'LOGIN_SUCCESS',
    null,
  );

  return {
    accessToken: token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

  async logout(userId: number, ip: string, userAgent: string) {
    await this.logAccess(userId, ip, userAgent, 'LOGOUT', null);
    return { message: 'Sesión cerrada exitosamente' };
  }

  private async logAccess(userId: number | null, ip: string, userAgent: string, event: string, detail: string | null) {
    try {
      await this.prisma.accessLog.create({
        data: { userId, ip, userAgent, event, detail },
      });
    } catch (error) {
      console.error('ERROR LOG ACCESS:', error);
    }
  }



  
}