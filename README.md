# Raynet Clients

A React and TypeScript web application for browsing companies from the Raynet API. The application provides a searchable company list, category badges, and a detail panel for viewing an individual company. It is built with Vite and uses TanStack Query for API data fetching and caching.

## Requirements

- Node.js and npm
- A Raynet API URL and bearer token

## Environment variables

Create a local `.env` file from the provided example:

```powershell
Copy-Item .env.example .env
```

Then update `.env` with the API configuration:

```env
VITE_API_URL=https://app.raynet.cz/api/v2/
VITE_API_TOKEN=your-bearer-token
```

`VITE_API_URL` is the base URL used for API requests. `VITE_API_TOKEN` is sent as a bearer token in the `Authorization` header. The `.env` file is ignored by Git, so keep real credentials there and do not commit them.

## Install dependencies

```powershell
npm install
```

## Run locally

Start the Vite development server:

```powershell
npm run dev
```

Open the URL shown in the terminal, usually `http://localhost:5173`. The companies page is available at `/klienti`.

## Build and preview

Create a production build:

```powershell
npm run build
```

The generated files are placed in `dist/`. To serve the production build locally:

```powershell
npm run preview
```

The preview server also needs the environment variables configured when the application is built.

## Tests and code quality

Run the test suite once:

```powershell
npm test
```

Run tests in watch mode during development:

```powershell
npm run test:watch
```

Run ESLint:

```powershell
npm run lint
```

Format the project with Prettier:

```powershell
npm run format
```
