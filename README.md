
# Laravel + Inertia + React (TSX) ИНТЕРНЕТ-ФРЕГАТ

## Требования
Перед началом убедитесь, что у вас установлено:
- [PHP ^8.4](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js ^23](https://nodejs.org/) и [npm](https://www.npmjs.com/)
- MySQL

## Установка
1. Клонируйте репозиторий:
   ```bash
   git clone <этот репо>
   cd <репо>

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
   php artisan storage:link
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
<blockquote class="imgur-embed-pub" lang="en" data-id="a/MLdWYoA"  ><a href="//imgur.com/a/MLdWYoA">Int freg</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

<blockquote class="imgur-embed-pub" lang="en" data-id="a/ksuS1j5"  ><a href="//imgur.com/a/ksuS1j5">db</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>