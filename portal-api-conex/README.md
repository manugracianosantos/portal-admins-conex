# Conex Admin Backend

Backend API for the Conex Administrator Portal built with NestJS, TypeScript, Prisma, and PostgreSQL.

## Features

- **Authentication**: JWT-based authentication with access and refresh tokens
- **Admin Management**: Profile management with photo upload support
- **User Management**: Full CRUD operations for app users
- **Dashboard**: Statistics and analytics with filterable charts
- **Database**: PostgreSQL with Prisma ORM
- **Documentation**: Swagger/OpenAPI documentation
- **Docker**: Containerized deployment with Docker Compose

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: class-validator
- **File Upload**: Multer / Cloudinary
- **Documentation**: Swagger

## Prerequisites

- Node.js 20+
- PostgreSQL 16+
- npm or yarn

## Installation

### Local Development

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd conex-admin-backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file based on `.env.example`:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the `.env` file with your configuration:
\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/conex?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
\`\`\`

5. Run database migrations:
\`\`\`bash
npm run prisma:migrate
\`\`\`

6. Seed the database (optional):
\`\`\`bash
npm run prisma:seed
\`\`\`

This will create:
- Admin user: `admin@conex.com` / `admin123`
- Sample users, feedbacks, and services

7. Start the development server:
\`\`\`bash
npm run start:dev
\`\`\`

The API will be available at `http://localhost:3001`

### Docker Deployment

1. Make sure Docker and Docker Compose are installed

2. Update environment variables in `docker-compose.yml` if needed

3. Build and start the containers:
\`\`\`bash
docker-compose up -d
\`\`\`

4. Run database migrations:
\`\`\`bash
docker-compose exec api npx prisma migrate deploy
\`\`\`

5. Seed the database (optional):
\`\`\`bash
docker-compose exec api npm run prisma:seed
\`\`\`

6. View logs:
\`\`\`bash
docker-compose logs -f api
\`\`\`

7. Stop the containers:
\`\`\`bash
docker-compose down
\`\`\`

## API Documentation

Once the server is running, access the Swagger documentation at:

\`\`\`
http://localhost:3001/api/docs
\`\`\`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new admin
- `POST /auth/login` - Login admin
- `POST /auth/logout` - Logout admin
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current admin profile

### Admin Profile
- `GET /admin/profile` - Get admin profile
- `PUT /admin/profile` - Update admin profile
- `PATCH /admin/password` - Update password
- `POST /admin/photo` - Upload profile photo

### Users
- `GET /users` - List all users (with pagination and search)
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Dashboard
- `GET /dashboard/overview` - Get overview statistics
- `GET /dashboard/average-rating` - Get average app rating
- `GET /dashboard/recent-feedbacks` - Get recent feedbacks
- `GET /dashboard/charts/users` - Get users chart data
- `GET /dashboard/charts/services` - Get services chart data
- `GET /dashboard/charts/feedbacks` - Get feedbacks chart data
- `GET /dashboard/ratings-distribution` - Get ratings distribution

### Upload
- `POST /upload` - Upload file

## Database Schema

### Models

- **Admin**: Administrator accounts
- **RefreshToken**: JWT refresh tokens
- **User**: Application users
- **Feedback**: User feedback and ratings
- **Service**: Services performed in the app

## Scripts

\`\`\`bash
# Development
npm run start:dev          # Start development server with hot reload
npm run start:debug        # Start with debugging

# Production
npm run build              # Build for production
npm run start:prod         # Start production server

# Database
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run migrations
npm run prisma:seed        # Seed database
npm run prisma:studio      # Open Prisma Studio

# Testing
npm run test               # Run tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage

# Linting
npm run lint               # Lint code
npm run format             # Format code with Prettier
\`\`\`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | Secret for access tokens | - |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | - |
| `JWT_EXPIRES_IN` | Access token expiration | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration | `7d` |
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (optional) | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key (optional) | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (optional) | - |
| `UPLOAD_DEST` | Local upload directory | `./uploads` |
| `MAX_FILE_SIZE` | Max file size in bytes | `5242880` (5MB) |

## File Upload

The API supports two upload methods:

1. **Local Storage** (default): Files are stored in the `./uploads` directory
2. **Cloudinary**: Configure Cloudinary credentials in `.env` to use cloud storage

## Security

- Passwords are hashed with bcrypt (10 rounds)
- JWT tokens for authentication
- Refresh tokens stored in database
- Protected routes with JWT guards
- Input validation with class-validator
- CORS configuration

## Project Structure

\`\`\`
src/
├── auth/              # Authentication module
│   ├── dto/          # Data transfer objects
│   ├── guards/       # Auth guards
│   └── strategies/   # Passport strategies
├── admin/            # Admin profile module
├── user/             # User management module
├── dashboard/        # Dashboard statistics module
├── upload/           # File upload module
├── prisma/           # Prisma service
├── common/           # Shared utilities
│   ├── filters/      # Exception filters
│   └── interceptors/ # Response interceptors
└── main.ts           # Application entry point
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
