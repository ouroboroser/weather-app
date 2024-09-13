import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { WeatherRequestDto } from '../../src/api/weather/dto/weather-request.dto';

describe('WeatherDtos', () => {
  it('should throw error when city is empty string', async function () {
    // given
    const weatherRequest: WeatherRequestDto = {
      city: '',
      date: '2022-01-01',
    };

    // when
    const afterDto = plainToInstance(WeatherRequestDto, weatherRequest);
    const errors = await validate(afterDto);

    // then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toEqual({
      minLength: 'city must be longer than or equal to 1 characters',
    });
  });

  it.each(['', '01-01-2022', 'wrong'])(
    'should throw error when date in incorrect format',
    async function (date) {
      // given
      const weatherRequest: WeatherRequestDto = {
        city: 'london',
        date,
      };

      // when
      const afterDto = plainToInstance(WeatherRequestDto, weatherRequest);
      const errors = await validate(afterDto);

      // then
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toEqual({
        isDateString: 'date must be a valid ISO 8601 date string',
      });
    },
  );

  it('should accept dto when it is correct', async function () {
    // given
    const weatherRequest: WeatherRequestDto = {
      city: 'london',
      date: '2022-01-01',
    };

    // when
    const afterDto = plainToInstance(WeatherRequestDto, weatherRequest);
    const errors = await validate(afterDto);

    // then
    expect(errors).toHaveLength(0);
  });
});
