import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";
import { Service } from "typedi";
import { IsAuth } from "../middlewares/auth.middleware.js";
import { CreateUserInput } from "../dtos/input/user.input.js";

@Service()
@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
    private userService = new UserService();

    @Mutation(() => UserModel)
    async createUser(
        @Arg('data', () => CreateUserInput) data: CreateUserInput
    ): Promise<UserModel> {
        return this.userService.createUser(data);
    }

    @Query(() => UserModel)
    async getUser(
        @Arg('id', () => String) id: string 
    ): Promise<UserModel> {
        return this.userService.findUser(id);
    }
}