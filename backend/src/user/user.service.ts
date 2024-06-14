import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Model } from 'mongoose';

import { IUser, User } from './user.model';
import { RegisterPayload } from 'src/auth/auth.payload';
// import { RegisterPayload } from "modules/auth/payload/register.payload";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<IUser>) {}

  get(id: string): Promise<IUser> {
    return this.model.findById(id).exec();
  }

  getByEmail(email: string): Promise<IUser> {
    return this.model.findOne({ email }).exec();
  }

  getByEmailAndPass(email: string, password: string): Promise<IUser> {
    return this.model
      .findOne({
        email,
        password: crypto.createHmac('sha256', password).digest('hex'),
      })
      .exec();
  }

  // TODO: Register Payload
  async create(payload: RegisterPayload): Promise<IUser> {
    const user = await this.getByEmail(payload.email);
    if (user) {
      throw new NotAcceptableException(
        'The account with the provided email currently exists. Please choose another one.',
      );
    }

    return await new this.model({
      ...payload,
      password: crypto.createHmac('sha256', payload.password).digest('hex'),
      createdAt: new Date(),
    }).save();
  }
}
