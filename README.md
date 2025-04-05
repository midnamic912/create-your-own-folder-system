# Create Your Own Folder System
 
 A Folder system to play around.
 
 Built with React, Vite and love.
 
 <img width="1690" alt="image" src="https://github.com/user-attachments/assets/3d49b04b-1929-416c-9644-4902e8849195" />

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Docker (for container deployment)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Access the application:
   Open your browser and navigate to `http://localhost:5173`.

## Production Build

1. Build the production version:

```bash
npm run build
```

2. Start the production server:

```bash
npm run preview
```

3. Access the application:
   Open your browser and navigate to `http://localhost:4173`.

## Container Deployment

1. Build the Docker image:

```bash
docker build -t silvergate-assessment .
```

2. Run the container:

```bash
docker run -d -p 8080:80 --name silvergate-assessment silvergate-assessment
```

3. Access the application:
   Open your browser and navigate to `http://localhost:8080`.

## Testing

Run the tests:

```bash
npm run test
```

## Linting

Run the linter:

```bash
npm run lint
```
