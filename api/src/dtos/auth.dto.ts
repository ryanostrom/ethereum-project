import { IsString, IsEmail } from 'class-validator';

export class AuthDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
