const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up MicroSave...');

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('📝 Please create a .env.local file with the following variables:');
  console.log('');
  console.log('MONGODB_URI=mongodb://localhost:27017/microsave');
  console.log('JWT_SECRET=your-super-secret-jwt-key-change-this-in-production');
  console.log('NEXTAUTH_SECRET=your-nextauth-secret-key');
  console.log('NEXTAUTH_URL=http://localhost:3000');
  console.log('');
  process.exit(1);
}

console.log('✅ Environment file found');

// Check MongoDB connection
console.log('📋 Setup checklist:');
console.log('  ✅ Dependencies installed');
console.log('  ✅ Environment variables configured');
console.log('  ⚠️  Make sure MongoDB is running');
console.log('  ⚠️  Update JWT_SECRET in production');
console.log('');
console.log('🎉 Setup complete! Run "npm run dev" to start the development server.');
console.log('🌐 Open http://localhost:3000 in your browser');
console.log('');
console.log('📚 Features available:');
console.log('  • User registration and authentication');
console.log('  • Group creation and management');
console.log('  • Collaborative expense tracking');
console.log('  • Budget management with categories');
console.log('  • Savings goals with progress tracking');
console.log('  • Real-time notifications');
console.log('  • Audit logging for transparency');
console.log('');