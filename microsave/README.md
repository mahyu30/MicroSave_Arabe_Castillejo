# MicroSave - Collaborative Financial Management Tool

MicroSave is a comprehensive financial management application built with Next.js and MongoDB, designed for group-based financial planning, transparency, and accountability.

## Features

### 🧩 Core Functionality

1. **Shared Budgeting Interface**
   - Create and manage group budgets for different purposes
   - Multiple categories with customizable spending limits
   - Collaborative editing for all group members

2. **Collaborative Expense Tracking**
   - Add, edit, delete, and split expenses with group members
   - Real-time updates and synchronization
   - Support for different expense types and due dates

3. **Income Irregularity Support**
   - Custom income schedules (weekly, bi-weekly, monthly, irregular)
   - Income trend visualization
   - Freelancer and gig worker friendly

4. **Group Savings Goals**
   - Shared savings goals with progress tracking
   - Visual indicators (progress bars, charts)
   - Individual contribution logging

5. **Alerts & Reminders**
   - Upcoming bill notifications
   - Overspending alerts
   - Missed contribution reminders

6. **Transparency & Accountability**
   - Complete audit log of all actions
   - Individual contribution histories
   - Full transparency for all group members

## Tech Stack

- **Frontend**: Next.js 15 with React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **UI Components**: Custom components with Lucide React icons
- **Charts**: Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd microsave
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/microsave
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NEXTAUTH_SECRET=your-nextauth-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure your MongoDB instance is running locally or update the connection string for a cloud database.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
microsave/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── groups/        # Group management
│   │   │   ├── budgets/       # Budget operations
│   │   │   └── expenses/      # Expense tracking
│   │   ├── dashboard/         # Dashboard page
│   │   ├── groups/           # Groups management page
│   │   ├── budgets/          # Budget management page
│   │   ├── expenses/         # Expense tracking page
│   │   ├── login/            # Login page
│   │   └── register/         # Registration page
│   ├── components/            # Reusable React components
│   │   ├── ui/               # UI components (Button, Input, Card)
│   │   └── Layout.tsx        # Main layout component
│   ├── lib/                  # Utility libraries
│   │   ├── mongodb.ts        # Database connection
│   │   └── auth.ts           # Authentication utilities
│   ├── middleware/           # Custom middleware
│   ├── models/              # MongoDB/Mongoose models
│   │   ├── User.ts
│   │   ├── Group.ts
│   │   ├── Budget.ts
│   │   ├── Expense.ts
│   │   ├── SavingsGoal.ts
│   │   └── AuditLog.ts
│   └── types/               # TypeScript type definitions
├── .env.local              # Environment variables
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Groups
- `GET /api/groups` - Get user's groups
- `POST /api/groups` - Create new group

### Budgets
- `GET /api/budgets?groupId=<id>` - Get group budgets
- `POST /api/budgets` - Create new budget

### Expenses
- `GET /api/expenses?groupId=<id>` - Get group expenses
- `POST /api/expenses` - Create new expense

## Database Models

### User
- Personal information and authentication
- Income schedule configuration
- Group memberships

### Group
- Group metadata and member management
- References to budgets, expenses, and savings goals

### Budget
- Budget categories and limits
- Spending tracking per category
- Time period management

### Expense
- Expense details and categorization
- Split information among group members
- Payment tracking

### SavingsGoal
- Goal definition and target amounts
- Contribution tracking per user
- Progress monitoring

### AuditLog
- Complete action history
- Change tracking for transparency
- User accountability

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Key Features Implementation

1. **Real-time Updates**: Built with React state management for immediate UI updates
2. **Responsive Design**: Tailwind CSS for mobile-first responsive design
3. **Type Safety**: Full TypeScript implementation
4. **Security**: JWT authentication with bcrypt password hashing
5. **Data Validation**: Mongoose schema validation
6. **Error Handling**: Comprehensive error handling in API routes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@microsave.com or create an issue in the repository.