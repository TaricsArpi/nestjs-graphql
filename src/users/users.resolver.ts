import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  users(): User[] {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  user(@Args('id') id: string): User | null {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { nullable: true })
  userByEmail(@Args('email') email: string): User | null {
    return this.usersService.findByEmail(email);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): User {
    return this.usersService.createUser(createUserInput);
  }

  // This is a placeholder for federation - we'll implement it later
  @ResolveField(() => [String], { nullable: true })
  orderIds(@Parent() user: User) {
    // In a real app, we would call the Orders service here
    return ['order-1', 'order-2']; // Placeholder data
  }
}