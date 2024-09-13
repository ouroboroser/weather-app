import { WeatherAPIService } from '../../src/http-requester/weather-api.service';
import { WeatherService } from '../../src/api/weather/weather.service';
import { CacheService } from '../../src/core/cache/cache.service';
import { mock } from 'jest-mock-extended';
import { WeatherRequestDto } from 'src/api/weather/dto/weather-request.dto';

describe('WeatherService', () => {
  const weatherAPIService: WeatherAPIService = mock<WeatherAPIService>();
  const cache: CacheService = mock<CacheService>();

  let service: WeatherService;

  beforeEach(() => {
    service = new WeatherService(weatherAPIService, cache);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call external api when cache is empty', async () => {
    // given
    const request: WeatherRequestDto = {
      city: 'london',
      date: '2022-01-01',
    };

    cache.get = jest.fn().mockReturnValue(undefined);
    weatherAPIService.getWeather = jest
      .fn()
      .mockReturnValue({ celcius: 10, farenheit: 10 });

    // when
    const result = await service.getWeather(request);

    // then
    expect(result).toEqual({ celcius: 10, farenheit: 10 });

    expect(cache.get).toHaveBeenCalledTimes(1);
    expect(weatherAPIService.getWeather).toHaveBeenCalledTimes(1);
    expect(weatherAPIService.getWeather).toHaveBeenCalledWith(
      request.city,
      request.date,
    );
  });

  it(`shouldn't call external api when cache has value`, async () => {
    // given
    const request: WeatherRequestDto = {
      city: 'london',
      date: '2022-01-01',
    };

    cache.get = jest.fn().mockReturnValue({ celcius: 10, farenheit: 10 });

    // when
    const result = await service.getWeather(request);

    // then
    expect(result).toEqual({ celcius: 10, farenheit: 10 });

    expect(cache.get).toHaveBeenCalledTimes(1);
    expect(weatherAPIService.getWeather).toHaveBeenCalledTimes(0);
  });
});
