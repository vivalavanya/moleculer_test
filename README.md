# Moleculer test

Решение написано с ипользованием cli.
В рамках данного проекта имеем два микросервиса

1. Погода. Получение погоды по названию города с возможностью получения разницы между двух городов.
2. Отправка сообщений. Отправляем сообщение на почту пользователю

### Микросервис №1 - Погода.

Данные о погоде возвращаются в метрической системе (В цельсиях)
- `GET 0.0.0.0:3000/api/weather/getWeather?city={city_name}` - получение погоды по названию города
    - city_name - Название города

- `GET 0.0.0.0:3000/api/weather/getDiff?first={first_city_name}&second={second_city_name}&email={notification_email}` - получение разницы температуры между двух горадов
    - first_city_name - Название первого города
    - second_city_name - Название второго города
    - notification_email - email на который будет отправлено уведомление, если разница в температуре >= 10 градусам

В случае если разница в погоде более или равна 10, вызывается второй микросервис - "Отправка сообщений"

### Микросервис №2 - Отправка сообщений.

Микросервис реализован с использованием сторонний библиотеки nodemailer
Запрос на отправку уведомлений происходит через POST где тело запроса передается в формате RAW
`POST 0.0.0.0:3000/api/email/send`

###### Обязательные поля

```
{
    "to": "string", // email на которое будет выслано письмо
    "subject": "string", // Тема письма
    "text": "string" // Текст сообщения
}
```

## Запуск через Docker

Для запуска через докер в файле docker-compose.env необходимо указать переменные

## Примичание

Микросервис №2 тестировался с smtp yandex

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose
