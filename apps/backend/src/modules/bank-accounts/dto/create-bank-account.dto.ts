import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BankAccountTypes } from '../entities/BankAccountTypes';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountTypes)
  type: BankAccountTypes;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
