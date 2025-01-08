# InstaReview - Verify Instagram Vendors Before You Buy

InstaReview is a platform that helps shoppers verify and review Instagram-based vendors, creating a safer online shopping environment. The platform enables users to search for vendors, read reviews, and share their experiences while helping others make informed decisions about online shopping.

## 🚀 Features

- **Vendor Search & Verification**
  - Search vendors by Instagram username
  - Add missing vendors to the platform
  - Verify vendor authenticity through Instagram integration

- **Review System**
  - Rate and review vendors
  - View detailed vendor profiles with ratings and reviews
  - Sort and filter reviews
  - Verified user reviews only

- **User Authentication**
  - Instagram OAuth integration
  - Secure user verification
  - Protected review submission

- **Scam Prevention**
  - Report suspicious vendors
  - Track and flag suspicious patterns
  - Community-driven safety features

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety and developer experience
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - ORM and database toolkit
- **SQLite** - Database (development)
- **JSON Web Tokens** - Authentication
- **Winston** - Logging
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Testing framework
- **Concurrently** - Run multiple commands

## 📁 Project Structure

```
insta_review/
├── prisma/                 # Database schema and migrations
│   ├── migrations/         # Database migrations
│   ├── schema.prisma       # Prisma schema
│   └── seed.ts             # Database seeding
├── public/                 # Static assets
├── server/                 # Backend API
│   ├── config/             # Server configuration
│   ├── middleware/         # Express middleware
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
├── .env.example            # Environment variables template
├── .eslintrc.js            # ESLint configuration
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/tobidelly/insta_review.git
cd insta_review
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Set up the database
```bash
npm run db:migrate
npm run db:seed
```

5. Start development server
```bash
npm run dev
```

## 💻 Development

### Key Concepts

1. **Component Architecture**
   - Modular, reusable components
   - Clear separation of concerns
   - Consistent styling with Tailwind CSS

2. **State Management**
   - React Query for server state
   - React Context for global state
   - Local state for component-specific data

3. **API Integration**
   - RESTful API design
   - Type-safe API calls
   - Efficient data caching

4. **Security**
   - JWT authentication
   - Rate limiting
   - Input validation
   - CORS protection

5. **Performance**
   - Code splitting
   - Lazy loading
   - Optimized builds
   - Efficient database queries

### Database Schema

The application uses three main models:

1. **User**
   - Authentication details
   - Profile information
   - Review relationships

2. **Vendor**
   - Business information
   - Instagram integration
   - Review statistics

3. **Review**
   - Rating and comments
   - User relationship
   - Vendor relationship

## 🔒 Security

- All API endpoints are protected with rate limiting
- User authentication via Instagram OAuth
- Input validation using Zod
- Secure password hashing
- CSRF protection
- XSS prevention
- Security headers with Helmet

## 📈 Future Improvements

1. **Features**
   - Advanced search filters
   - Vendor response system
   - Review helpfulness voting
   - Photo reviews
   - Review verification badges

2. **Technical**
   - Migration to PostgreSQL
   - Redis caching
   - WebSocket notifications
   - Mobile app development
   - AI-powered fraud detection

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please read our contributing guidelines for details on our code of conduct and the process for submitting pull requests.