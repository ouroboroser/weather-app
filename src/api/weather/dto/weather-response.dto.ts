import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class WeatherResponseDto {
  @ApiProperty()
  @IsNumber()
  celcius: number;

  @ApiProperty()
  @IsNumber()
  fahrenheit: number;
}
