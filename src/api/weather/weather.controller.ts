import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeatherRequestDto } from './dto/weather-request.dto';
import { WeatherFinalResultResponseDto } from './dto/weather-final-result-response.dto';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiOperation({ summary: 'Get weather' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: WeatherFinalResultResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  async getWeather(
    @Body() body: WeatherRequestDto,
  ): Promise<WeatherFinalResultResponseDto> {
    const weather = await this.weatherService.getWeather(body);

    return {
      city: body.city,
      date: body.date,
      ...weather,
    };
  }
}
