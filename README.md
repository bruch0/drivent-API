# drivent-back
Back-end for Driven.t, an event management solution.

## About
Driven.t is a web browser application with which you can manage every single aspect of your event.

## How to run
1. Clone this repository
2. Install all dependencies
```bash
npm i
```
3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env` file using the `.env.example` file
5. Run all migrations
```bash
npm run migration:run
```
6. Run the back-end in a development environment:
```bash
npm run dev
```
7. Or build it and run it in production environment:
```bash
npm run build
npm start
```

## npm scripts to make life easier
- `dev`: runs the back-end in development mode, watching file changes (with `npm run dev`). ESLint errors will stop the back-end from running
- `build`: generates the JavaScript version for this project (with `npm run build`). ESLint errors will stop the bundle from being created
- `migration:generate`: generates new migrations from typescript in a single step (with `npm run migration:generate -- -n MigrationName`)
- `migration:run`: runs all pending migrations (with `npm run migration:run`)
- `eslint:fix`: runs eslint fixing everything eslint can automatically fix
- `seed`: runs database seed files in `src/seeders` to populate database automatically (with `npm run seed`). Will prompt which seed files should run
