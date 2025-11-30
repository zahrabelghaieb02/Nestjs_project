// src/users/users.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Headers,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly USERService: UsersService) {}

  // → Création en base
  @Post('/add')
  create(@Body() data: any) {
    return this.USERService.create(data.email, data.password);
  }

  // → LA ROUTE QUI AFFICHE TOUS LES USERS DE LA VRAIE BASE
@Get('/all')
async findAll() {
  return await this.USERService.findAll();   // ← c’est ÇA qu’il faut
}
   // 📧 ENDPOINT 4 : GET /users/email/:email - Obtenir un utilisateur par email
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.USERService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
  // ===================================================================
  // Les routes de démo (tableau en mémoire) – elles marchent aussi
  // ===================================================================
  private nbID = 4;
  private users = [
    { id: 1, username: 'Zahra', email: 'Zahra@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ];

  @Get()
  getAllUsers(@Query('status') status?: string) {
    if (status) return this.users.filter(u => u.status === status);
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  @Post()
  addUser(@Body() data: CreateUserDto, @Headers('Authorization') auth: string) {
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
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: CreateUserDto) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    user.username = data.username ?? user.username;
    user.email = data.email ?? user.email;
    user.status = data.status ?? user.status;
    return user;
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`User with id ${id} not found`);
    this.users.splice(index, 1);
    return { message: `User ${id} deleted` };
  }

  @Get('active/:status')
  getActiveUsers(@Param('status') status: string) {
    if (status !== 'active') {
      return { message: 'Use /users/active/active to see active users' };
    }
    return this.users.filter(u => u.status === 'active');
  }
}