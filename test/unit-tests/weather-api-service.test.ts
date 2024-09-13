import { mock } from 'jest-mock-extended';

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '../../src/config/config.service';
import { WeatherAPIService } from '../../src/http-requester/weather-api.service';

describe('WeatherAPIService', () => {
  const httpService = mock<HttpService>();
  const configService = mock<ConfigService>();

  let service: WeatherAPIService;

  beforeEach(() => {
    service = new WeatherAPIService(httpService, configService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`should get data from external api`, async () => {
    const city = 'london';
    const date = '2023-03-06T19:41:52.704Z';

    httpService.axiosRef.post = jest
      .fn()
      .mockResolvedValue({ data: { celcius: 10, fahrenheit: 10 } });

    // when
    const result = await service.getWeather(city, date);

    expect(result).toEqual({
      celcius: 10,
      fahrenheit: 10,
    });
  });

  it(`should get data from external api and add fahrenheit automatically`, async () => {
    const city = 'london';
    const date = '2023-03-06T19:41:52.704Z';

    httpService.axiosRef.post = jest
      .fn()
      .mockResolvedValue({ data: { celcius: 10 } });

    // when
    const result = await service.getWeather(city, date);

    expect(result).toEqual({
      celcius: 10,
      fahrenheit: 50,
    });
  });

  it(`should get data from external api and add celcius automatically`, async () => {
    const city = 'london';
    const date = '2023-03-06T19:41:52.704Z';

    httpService.axiosRef.post = jest
      .fn()
      .mockResolvedValue({ data: { fahrenheit: 50 } });

    // when
    const result = await service.getWeather(city, date);

    expect(result).toEqual({
      celcius: 10,
      fahrenheit: 50,
    });
  });

  it(`should throw error when service is unavailable`, async () => {
    const city = 'london';
    const date = '2023-03-06T19:41:52.704Z';

    httpService.axiosRef.post = jest
      .fn()
      .mockRejectedValue('Something went wrong');

    // when
    await expect(async () => {
      await service.getWeather(city, date);
    }).rejects.toThrow('Service is offline, retry later');
  });
});
