

# Laravel + Vue + Vite + Primevue TodoList Project

This guide provides the commands to set up and run a Laravel project integrated with Vue using Vite.

## Prerequisites

Ensure the following are installed on your system:

- PHP >= 8.1
- Composer
- Node.js >= 16
- npm or yarn
- A database server (MySQL, PostgreSQL, etc.)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Mohamed-Ragaeyy/todo_list.git
cd todo_list
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Configure Environment
```bash
cp .env.example .env
```
- Update the `.env` file with your database and other environment-specific configurations.

### 4. Generate Application Key
```bash
php artisan key:generate
```

### 5. Install JavaScript Dependencies
```bash
npm install
# or use yarn
yarn install
```

### 6. Build Frontend Assets (Development Mode)
```bash
npm run dev
# or for yarn
yarn dev
```

### 7. Run Database Migrations
```bash
php artisan migrate
```

### 8. Seed the Database
To populate the database with example data (e.g., categories), run:
```bash
php artisan db:seed
```

### 9. Start the Local Development Server
```bash
php artisan serve
```

---

## Build for Production

To build the application for production:
```bash
npm run build
# or for yarn
yarn build
```

---

## Additional Commands

- Clear application caches:
  ```bash
  php artisan cache:clear
  php artisan config:clear
  php artisan route:clear
  php artisan view:clear
  ```

- Link storage:
  ```bash
  php artisan storage:link
  ```

---

You're all set! 🎉 Open [http://localhost:8000](http://localhost:8000) in your browser to view the application.
