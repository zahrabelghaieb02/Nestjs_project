import { Controller, Get, Param, Post, Body, Query, Headers, Put, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
@Controller('users')
export class UsersController {
  private nbID: number = 4;
  private users = [
    { id: 1, username: 'Zahra', email: 'Zahra@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ];

  // 1. GET /users?status=active
  @Get()
  getAllUsers(@Query('status') status?: string) {
    if (status) {
      return this.users.filter(user => user.status === status);
    }
    return this.users;
  }

  // 2. GET /users/:id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // 3. POST /users + header Authorization
 @Post()
addUser(
  @Body() data: CreateUserDto,
  @Headers('Authorization') auth: string,
) {
  this.nbID++;
  const newUser = {
    id: this.nbID,
    username: data.username,
    email: data.email,
    status: data.status ?? 'active',
  };
  this.users.push(newUser);
  console.log('Authorization:', auth);
  return newUser;
}

@Put(':id')
updateUser(
  @Param('id', ParseIntPipe) id: number,
  @Body() data: CreateUserDto,
) {
  const user = this.users.find(user => user.id === id);
  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }
  user.username = data.username ?? user.username;
  user.email = data.email ?? user.email;
  user.status = data.status ?? user.status;
  return user;
}

  // 5. DELETE /users/:id
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(index, 1);
    return { message: `User ${id} deleted` };
  }

  // 6. GET /users/active/:status → seulement si status = 'active'
  @Get('active/:status')
  getActiveUsers(@Param('status') status: string) {
    if (status !== 'active') {
      return { message: 'Use /users/active/active to see active users' };
    }
    return this.users.filter(user => user.status === 'active');
  }
}