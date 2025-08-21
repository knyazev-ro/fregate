
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

# Примеры экспорта и импорта XLSX
Они располагаются в папке ./data-example

# Данные для входа
           'email' => "test@t.ru",
            'password' => 123,

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
## Интерфейс
![1](https://i.imgur.com/CRPT2VM.png)
![2](https://i.imgur.com/6Mb4AP3.png)
![3](https://i.imgur.com/WYxTdf2.png)
![4](https://i.imgur.com/NR9vZ0z.png)
![5](https://i.imgur.com/D0EwaZV.png)
![6](https://i.imgur.com/zr5Gksn.png)
![6](https://i.imgur.com/CzDicgu.png)
![7](https://i.imgur.com/fUCF3p6.png)
![8](https://i.imgur.com/EN5e74W.png)
![9](https://i.imgur.com/SdisifJ.png)
![10](https://i.imgur.com/Npohrdm.png)
![11](https://i.imgur.com/56NZXEn.png)




## База данных
![База данных](https://i.imgur.com/E2L7a8C.png)
