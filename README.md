# Weather API with NestJS and SQLite Cache

This project is a simple weather API built using [NestJS](https://nestjs.com/) that fetches weather data from a third-party service and caches the results using an SQLite database for optimal performance.

## Features

- **Weather Data**: Get current weather information by city and date.
- **SQLite Cache**: Caches weather data for a configurable time to reduce unnecessary API calls.
- **REST API**: Exposes a simple and easy-to-use RESTful interface.
- **Configurable Cache Timeout**: You can set the cache expiration time.

## Installation

1) Clone the repository:

   ```bash
   git clone https://github.com/ouroboroser/weather-app.git
   cd ./weather-app

2) Install dependencies:

    ```bash
    $ npm install
    ````

## Environment Variables
Create .env file in the root of project with:
- **CACHE_PATH** - path to your sqlite database
- **EXTERNAL_API** - third-party service
- **REQUEST_TTL** - api limint for requests (by default 10 seconds)
- **REQUEST_LIMIT** - api limint for requests (by default 5 calls)

## Running the app

```bash
# watch mode
$ npm run start:dev
```

## Testing the app

```bash
$ npm run test
```

## Additional explanation
- Rate Limiting: In this case, the limits are set globally because there is only one root in the application;
- Cache: The weather data is updated every hour, so I cache the time left at the end of the hour;

## License

Nest is [MIT licensed](LICENSE).
