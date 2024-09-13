import { WeatherRequestDto } from '../../src/api/weather/dto/weather-request.dto';
import { TestingModule } from '../testing-module';

describe('POST /api/weather', () => {
  const testingModule = TestingModule.new();

  it('should return 200', async () => {
    // given
    const request: WeatherRequestDto = {
      city: 'london',
      date: '2022-01-01',
    };

    // when
    const { body } = await testingModule.api
      .post('/weather')
      .send(request)
      .expect(200);

    // then
    expect(body).toBeDefined();
    expect(body).toEqual({
      city: 'london',
      date: '2022-01-01',
      celcius: 10,
      fahrenheit: 50,
    });
  });
});
