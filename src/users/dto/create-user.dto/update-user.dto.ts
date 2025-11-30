import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// 🔄 PartialType rend tous les champs du CreateUserDto optionnels
// Si CreateUserDto a { email: string, password: string }
// UpdateUserDto aura { email?: string, password?: string }
export class UpdateUserDto extends PartialType(CreateUserDto) {}