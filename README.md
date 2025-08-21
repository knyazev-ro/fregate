Окей 👍 Давай сделаем универсальный `README.md` для твоего Laravel + Inertia + React (TSX) проекта. Такой, чтобы коллеги могли просто скопировать шаги и всё завелось.

Я добавлю туда установку зависимостей, конфиги, миграции, запуск дев-сервера и сборку.

---

````markdown
# Laravel + Inertia + React (TSX)

## Требования
Перед началом убедитесь, что у вас установлено:
- [PHP ^8.4](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js ^23](https://nodejs.org/) и [npm](https://www.npmjs.com/)
- [MySQL / PostgreSQL] (или другой драйвер, который используется в проекте)
- [Git](https://git-scm.com/)

## Установка
1. Клонируйте репозиторий:
   ```bash
   git clone <этот репо>
   cd <репо>
````

2. Установите PHP-зависимости:

   ```bash
   composer install
   ```

3. Установите JS-зависимости:

   ```bash
   npm install
   ```

4. Скопируйте файл окружения:

   ```bash
   cp .env.example .env
   ```

5. Сгенерируйте ключ приложения:

   ```bash
   php artisan key:generate
   ```

6. Настройте подключение к базе данных в файле `.env`. (Если необходимо, пока что достаточно скопировать .env.example в .env)

7. Выполните миграции и сидеры:

   ```bash
   php artisan migrate:fresh --seed
   ```

## Запуск проекта

### Backend (Laravel)

Запустите встроенный сервер Laravel:

```bash
php artisan serve
```

По умолчанию проект будет доступен по адресу:

```
http://127.0.0.1:8000
```

### Frontend (Vite)

В отдельном терминале запустите Vite:

```bash
npm run dev
```

После этого фронтенд будет подхватываться автоматически.

## Сборка для продакшена

Для сборки фронтенда:

```bash
npm run build
```

Для оптимизации Laravel:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Полезные команды

* Запуск тестов:

  ```bash
  php artisan test
  ```
* Очистка кэшей:

  ```bash
  php artisan optimize:clear
  ```
* Линтинг/форматирование фронтенда:

  ```bash
  npm run lint
  npm run format
  ```

---
