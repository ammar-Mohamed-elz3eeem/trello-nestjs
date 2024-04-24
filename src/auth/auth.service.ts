import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { RedisClientType } from 'redis';
import { LoginUser } from './dto/login-user.dto';
import { compareSync, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AddUser } from './dto/add-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('REDIS_CONNECTION') private redis: RedisClientType,
    @Inject('DATABASE_CONNECTION') private db: Db,
  ) {}

  async authenticateUser(userData: LoginUser) {
    if (!userData.email || !userData.password) {
      throw new Error('Email & password are required fields');
    }
    const isExistingUser = await this.db
      .collection('users')
      .findOne({ email: userData.email });

    if (!isExistingUser) {
      throw new Error("User doesn't exist");
    }

    if (!compareSync(userData.password, isExistingUser.password)) {
      throw new Error('Incorrect password');
    }

    const claim = { id: isExistingUser._id, email: isExistingUser.email };
    const redisKey = uuidv4();

    await this.redis.set(redisKey, JSON.stringify(claim));

    return redisKey;
  }

  async addNewUser(userData: AddUser) {
    const { email, fullName, password, confirmPassword } = userData;

    if (!password || !email) {
      throw new Error('Email & Password is required field');
    }

    if (password !== confirmPassword) {
      throw new Error('password mismatch');
    }

    try {
      const isExistingUser = await this.db
        .collection('users')
        .findOne({ email: userData.email });

      if (isExistingUser) {
        throw new Error('Email is already registered');
      }

      const hashedPassword = await hash(password, 10);

      const user = await this.db
        .collection('users')
        .insertOne({ email, password: hashedPassword, fullName });

      if (!user) {
        throw new Error('Failed to create user');
      }

      const claim = { id: user.insertedId, email };
      const redisKey = uuidv4();

      await this.redis.setEx(redisKey, 60 * 60 * 24 * 7, JSON.stringify(claim));
      return redisKey;
    } catch (error) {
      throw error;
    }
  }

  async logout(token: string) {
    try {
      await this.redis.del(token);
    } catch (error) {
      throw error;
    }
  }

  async me(token: string) {
    try {
      console.log('token', token);
      const redisData = await this.redis.get(token);
      console.log('redisData', redisData);
      const userData = JSON.parse(redisData);
      if (!userData) {
        throw new Error('Unauthorized');
      }
      return userData;
    } catch (error) {
      throw error;
    }
  }
}
