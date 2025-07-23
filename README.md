# E-Store - Complete E-Commerce Application

A modern, full-featured e-commerce web application built with Next.js 15, MongoDB, and NextAuth.js. This application includes all the essential features needed for a production-ready online store.

## 🚀 Features

### Core Features

- **Product Catalog** with categories (Electronics, Clothing, Books, Home & Garden)
- **Shopping Cart** with add/remove/update quantity functionality
- **User Authentication** (login/register/logout with NextAuth.js)
- **Checkout Process** with form validation
- **Order History** and tracking
- **Product Search** and filtering with debounced search
- **Admin Panel** for product management (CRUD operations)
- **Responsive Design** for mobile and desktop
- **SEO Optimization** with Next.js features

### Advanced Features

- **Dark Mode** toggle with next-themes
- **Wishlist** functionality
- **Product Reviews** and ratings system
- **Newsletter Subscription**
- **Real-time Cart** with Zustand state management
- **Image Optimization** with Next.js Image component
- **Form Validation** with React Hook Form + Zod
- **Toast Notifications** with react-hot-toast
- **Loading Skeletons** and error boundaries
- **Glassmorphism** UI effects

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, JavaScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: SWR
- **UI Components**: Lucide React icons
- **Deployment**: Vercel-ready

## 📦 Installation

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone <repository-url>
cd my-ecommerce-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce-app
MONGODB_URI_PROD=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/ecommerce-app

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe (for payments)
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-stripe-webhook-secret

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (for notifications)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=E-Commerce App
```

### 4. Database Setup

Make sure MongoDB is running locally or use MongoDB Atlas.

### 5. Seed the Database

Populate the database with sample data:

```bash
npm run seed
```

This will create:

- Sample products across all categories
- Admin user: `admin@estore.com` / `admin123`
- Regular users: `john@example.com` / `password123`, `jane@example.com` / `password123`

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
my-ecommerce-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js routes
│   │   ├── products/      # Product API
│   │   ├── cart/          # Cart API
│   │   └── newsletter/    # Newsletter API
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout process
│   ├── orders/            # Order management
│   ├── admin/             # Admin panel
│   └── layout.js          # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── products/         # Product-related components
│   ├── cart/             # Cart components
│   ├── forms/            # Form components
│   └── home/             # Home page components
├── lib/                  # Utility libraries
│   ├── db/              # Database models and connection
│   ├── auth/            # Authentication utilities
│   ├── utils/           # Helper functions
│   └── store/           # State management
├── scripts/             # Database seeding
└── public/              # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## 🎨 Customization

### Styling

The application uses Tailwind CSS 4 with custom components. You can customize:

- Colors in `app/globals.css`
- Component styles in individual component files
- Tailwind configuration in `tailwind.config.js`

### Adding New Features

- **New API Routes**: Add to `app/api/`
- **New Pages**: Add to `app/` directory
- **New Components**: Add to `components/` directory
- **Database Models**: Add to `lib/db/models/`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application is compatible with any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔐 Security Features

- **Authentication**: NextAuth.js with JWT
- **Authorization**: Role-based access control
- **Input Validation**: Zod schema validation
- **CSRF Protection**: Built-in Next.js protection
- **Environment Variables**: Secure configuration
- **Database Security**: Mongoose validation and sanitization

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🧪 Testing

To add testing to the project:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Updates

To update dependencies:

```bash
npm update
```

## 📊 Performance

The application includes several performance optimizations:

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Static Generation**: Where possible
- **Caching**: API route caching
- **Lazy Loading**: Component and image lazy loading

## 🎯 Roadmap

Future features planned:

- [ ] Advanced search filters
- [ ] Product comparison
- [ ] Social media integration
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] PWA features
- [ ] Advanced payment methods
- [ ] Inventory management
- [ ] Customer support chat
- [ ] Advanced admin features

---

**Happy Shopping! 🛍️**
