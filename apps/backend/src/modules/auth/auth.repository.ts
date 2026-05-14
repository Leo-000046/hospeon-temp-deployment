import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';

export class AuthRepository {
  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id, deletedAt: null },
    });
  }
}

export const authRepository = new AuthRepository();
