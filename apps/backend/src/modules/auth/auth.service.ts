import { authRepository } from './auth.repository';
import { RegisterDto, LoginDto, AuthResponseDto, Role } from '@hospeon/shared';
import { AppError } from '../../utils/app-error';
import { hashPassword, comparePassword } from '../../utils/password.util';
import { generateToken } from '../../utils/jwt.util';

export class AuthService {
  private toAuthUser(user: { id: string; name: string; email: string; role: string }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as Role,
    };
  }

  async register(data: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new AppError(400, 'User with this email already exists');
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    const accessToken = generateToken({ userId: user.id, role: user.role });

    return {
      user: this.toAuthUser(user),
      accessToken,
    };
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const user = await authRepository.findUserByEmail(data.email);
    if (!user) {
      throw new AppError(401, 'Invalid email or password');
    }

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid email or password');
    }

    if (!user.isActive) {
      throw new AppError(403, 'Account has been deactivated');
    }

    const accessToken = generateToken({ userId: user.id, role: user.role });

    return {
      user: this.toAuthUser(user),
      accessToken,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

export const authService = new AuthService();
