import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Le nom d’utilisateur est obligatoire.' })
  @IsString({ message: 'Le nom d’utilisateur doit être une chaîne.' })
  username: string;

  @IsNotEmpty({ message: 'L’email est obligatoire.' })
  @IsEmail({}, { message: 'Veuillez entrer un email valide.' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Le status doit être une chaîne.' })
  status?: string;
}