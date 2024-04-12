import { StatusCodes } from 'http-status-codes';
import { User, UserDocument } from '../model/user.model';
import { ResponseStatus, ServiceResponse } from '../common/models/serviceResponse';
import { logger } from '../server';
import { CreateUserDto, FindManyUserFilter, UpdateUserDto } from './interface/user.interface';

export class UserService {
  
  constructor() {}

  async findMany(filter: FindManyUserFilter): Promise<ServiceResponse<UserDocument[] | null>> {
    try {
      const users = await User.find(filter);
      if (!users) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Users found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<UserDocument[]>(ResponseStatus.Success, '', users, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error finding all users: $${error.message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(userId: string): Promise<ServiceResponse<UserDocument | null>> {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<UserDocument>(ResponseStatus.Success, '', user, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error finding user: $${error.message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: CreateUserDto): Promise<ServiceResponse<UserDocument | null>> {
    try {
      const user = await User.create(data);
      return new ServiceResponse<UserDocument>(ResponseStatus.Success, '', user, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error creating user: $${error.message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<ServiceResponse<UserDocument | null>> {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      if (!updatedUser) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<UserDocument>(ResponseStatus.Success, '', updatedUser, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error updating user: $${error.message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<ServiceResponse<UserDocument | null>> {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<UserDocument>(ResponseStatus.Success, '', null, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error deleting user: $${error.message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
