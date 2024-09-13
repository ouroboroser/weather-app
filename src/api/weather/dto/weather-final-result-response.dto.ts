import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, MinLength } from 'class-validator';

export class WeatherFinalResultResponseDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  city: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsNumber()
  celcius: number;

  @ApiProperty()
  @IsNumber()
  fahrenheit: number;
}
