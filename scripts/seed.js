import "dotenv/config";
import connectDB from "../lib/db/connect.js";
import User from "../lib/db/models/User.js";
import Product from "../lib/db/models/Product.js";

const sampleProducts = [
  // Electronics
  {
    name: "iPhone 15 Pro",
    description:
      "The most advanced iPhone ever with A17 Pro chip, titanium design, and pro camera system.",
    price: 999.99,
    originalPrice: 1099.99,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "electronics",
    subcategory: "smartphones",
    brand: "Apple",
    stock: 50,
    sku: "IPH15PRO-001",
    weight: 187,
    dimensions: { length: 147.6, width: 71.6, height: 8.25 },
    featured: true,
    rating: { average: 4.8, count: 125 },
    tags: ["smartphone", "apple", "iphone", "5g"],
    specifications: {
      "Screen Size": "6.1 inches",
      Storage: "128GB",
      Color: "Natural Titanium",
      Chip: "A17 Pro",
    },
    isActive: true,
    discount: { percentage: 9, validUntil: new Date("2024-12-31") },
  },
  {
    name: 'MacBook Pro 14"',
    description:
      "Powerful laptop with M3 Pro chip, Liquid Retina XDR display, and up to 22 hours battery life.",
    price: 1999.99,
    originalPrice: 2199.99,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    ],
    category: "electronics",
    subcategory: "laptops",
    brand: "Apple",
    stock: 25,
    sku: "MBP14-001",
    weight: 1600,
    dimensions: { length: 312.6, width: 221.2, height: 15.5 },
    featured: true,
    rating: { average: 4.9, count: 89 },
    tags: ["laptop", "macbook", "apple", "m3"],
    specifications: {
      Processor: "M3 Pro",
      Memory: "18GB",
      Storage: "512GB SSD",
      Display: "14-inch Liquid Retina XDR",
    },
    isActive: true,
    discount: { percentage: 9, validUntil: new Date("2024-12-31") },
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading noise canceling wireless headphones with exceptional sound quality.",
    price: 349.99,
    originalPrice: 399.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "electronics",
    subcategory: "audio",
    brand: "Sony",
    stock: 75,
    sku: "SONY-XM5-001",
    weight: 250,
    featured: true,
    rating: { average: 4.7, count: 203 },
    tags: ["headphones", "wireless", "noise-canceling", "bluetooth"],
    specifications: {
      "Driver Size": "30mm",
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.2",
      Weight: "250g",
    },
    isActive: true,
    discount: { percentage: 12, validUntil: new Date("2024-12-31") },
  },
  {
    name: 'Samsung 65" QLED 4K TV',
    description:
      "Stunning 4K QLED display with Quantum HDR and Alexa built-in for smart home control.",
    price: 1299.99,
    originalPrice: 1499.99,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "electronics",
    subcategory: "televisions",
    brand: "Samsung",
    stock: 30,
    sku: "SAMSUNG-Q65-001",
    weight: 25000,
    dimensions: { length: 1457, width: 838, height: 62 },
    featured: true,
    rating: { average: 4.6, count: 156 },
    tags: ["tv", "4k", "qled", "smart-tv"],
    specifications: {
      "Screen Size": "65 inches",
      Resolution: "4K Ultra HD",
      HDR: "Quantum HDR",
      "Smart Features": "Tizen OS",
    },
    isActive: true,
    discount: { percentage: 13, validUntil: new Date("2024-12-31") },
  },

  // Clothing
  {
    name: "Nike Air Max 270",
    description:
      "Comfortable running shoes with Air Max technology for maximum cushioning and style.",
    price: 129.99,
    originalPrice: 150.0,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "clothing",
    subcategory: "shoes",
    brand: "Nike",
    stock: 100,
    sku: "NIKE-AM270-001",
    weight: 300,
    featured: true,
    rating: { average: 4.5, count: 342 },
    tags: ["shoes", "running", "nike", "air-max"],
    specifications: {
      Material: "Mesh and synthetic",
      Sole: "Rubber",
      Closure: "Lace-up",
      Style: "Running",
    },
    isActive: true,
    discount: { percentage: 13, validUntil: new Date("2024-12-31") },
  },
  {
    name: "Levi's 501 Original Jeans",
    description:
      "Classic straight-leg jeans with authentic vintage styling and comfortable fit.",
    price: 89.99,
    originalPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    ],
    category: "clothing",
    subcategory: "jeans",
    brand: "Levi's",
    stock: 200,
    sku: "LEVIS-501-001",
    weight: 400,
    featured: true,
    rating: { average: 4.4, count: 567 },
    tags: ["jeans", "denim", "levis", "classic"],
    specifications: {
      Fit: "Straight",
      Rise: "Mid-rise",
      Material: "100% Cotton",
      Wash: "Medium wash",
    },
    isActive: true,
    discount: { percentage: 10, validUntil: new Date("2024-12-31") },
  },
  {
    name: "Polo Ralph Lauren Classic Fit Shirt",
    description:
      "Timeless polo shirt with classic fit, made from premium cotton for ultimate comfort.",
    price: 79.99,
    originalPrice: 89.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    ],
    category: "clothing",
    subcategory: "shirts",
    brand: "Ralph Lauren",
    stock: 150,
    sku: "POLO-CLASSIC-001",
    weight: 200,
    featured: true,
    rating: { average: 4.3, count: 234 },
    tags: ["polo", "shirt", "ralph-lauren", "classic"],
    specifications: {
      Material: "100% Cotton",
      Fit: "Classic",
      Style: "Polo",
      Care: "Machine washable",
    },
    isActive: true,
    discount: { percentage: 11, validUntil: new Date("2024-12-31") },
  },
  {
    name: "North Face Winter Jacket",
    description:
      "Warm and waterproof winter jacket perfect for cold weather adventures.",
    price: 199.99,
    originalPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "clothing",
    subcategory: "jackets",
    brand: "The North Face",
    stock: 80,
    sku: "TNF-WINTER-001",
    weight: 800,
    featured: true,
    rating: { average: 4.7, count: 189 },
    tags: ["jacket", "winter", "waterproof", "warm"],
    specifications: {
      Material: "Waterproof nylon",
      Insulation: "Synthetic",
      "Temperature Rating": "-20°C",
      Features: "Waterproof, windproof",
    },
    isActive: true,
    discount: { percentage: 20, validUntil: new Date("2024-12-31") },
  },

  // Books
  {
    name: "The Great Gatsby",
    description:
      "F. Scott Fitzgerald's masterpiece about the Jazz Age and the American Dream.",
    price: 12.99,
    originalPrice: 15.99,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "books",
    subcategory: "fiction",
    brand: "Scribner",
    stock: 500,
    sku: "BOOK-GATSBY-001",
    weight: 300,
    featured: true,
    rating: { average: 4.8, count: 1234 },
    tags: ["fiction", "classic", "literature", "jazz-age"],
    specifications: {
      Author: "F. Scott Fitzgerald",
      Pages: "180",
      Format: "Paperback",
      Language: "English",
    },
    isActive: true,
    discount: { percentage: 19, validUntil: new Date("2024-12-31") },
  },
  {
    name: "JavaScript: The Definitive Guide",
    description:
      "Comprehensive guide to JavaScript programming for developers of all skill levels.",
    price: 49.99,
    originalPrice: 59.99,
    images: [
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "books",
    subcategory: "technical",
    brand: "O'Reilly",
    stock: 200,
    sku: "BOOK-JS-GUIDE-001",
    weight: 800,
    featured: true,
    rating: { average: 4.6, count: 456 },
    tags: ["javascript", "programming", "technical", "guide"],
    specifications: {
      Author: "David Flanagan",
      Pages: "704",
      Format: "Paperback",
      Language: "English",
    },
    isActive: true,
    discount: { percentage: 17, validUntil: new Date("2024-12-31") },
  },
  {
    name: "The Art of French Cooking",
    description:
      "Julia Child's classic cookbook with authentic French recipes and techniques.",
    price: 34.99,
    originalPrice: 39.99,
    images: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "books",
    subcategory: "cookbooks",
    brand: "Knopf",
    stock: 300,
    sku: "BOOK-FRENCH-COOK-001",
    weight: 1200,
    featured: true,
    rating: { average: 4.9, count: 789 },
    tags: ["cookbook", "french", "recipes", "cooking"],
    specifications: {
      Author: "Julia Child",
      Pages: "684",
      Format: "Hardcover",
      Language: "English",
    },
    isActive: true,
    discount: { percentage: 12, validUntil: new Date("2024-12-31") },
  },

  // Home & Garden
  {
    name: "Modern Wooden Dining Table",
    description:
      "Elegant solid wood dining table perfect for family gatherings and dinner parties.",
    price: 599.99,
    originalPrice: 699.99,
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "home-garden",
    subcategory: "furniture",
    brand: "West Elm",
    stock: 15,
    sku: "FURN-DINING-001",
    weight: 45000,
    dimensions: { length: 180, width: 90, height: 75 },
    featured: true,
    rating: { average: 4.5, count: 234 },
    tags: ["furniture", "dining", "wood", "modern"],
    specifications: {
      Material: "Solid oak wood",
      Seats: "6 people",
      Finish: "Natural",
      Assembly: "Required",
    },
    isActive: true,
    discount: { percentage: 14, validUntil: new Date("2024-12-31") },
  },
  {
    name: "Indoor Plant Collection",
    description:
      "Set of 3 low-maintenance indoor plants perfect for home decoration and air purification.",
    price: 89.99,
    originalPrice: 109.99,
    images: [
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "home-garden",
    subcategory: "plants",
    brand: "The Sill",
    stock: 100,
    sku: "PLANT-INDOOR-001",
    weight: 2000,
    featured: true,
    rating: { average: 4.7, count: 567 },
    tags: ["plants", "indoor", "decor", "air-purifying"],
    specifications: {
      "Plants Included": "Snake Plant, Pothos, ZZ Plant",
      "Pot Size": "6-inch",
      "Care Level": "Low maintenance",
      Light: "Low to bright indirect",
    },
    isActive: true,
    discount: { percentage: 18, validUntil: new Date("2024-12-31") },
  },
  {
    name: "KitchenAid Stand Mixer",
    description:
      "Professional-grade stand mixer with 10 speeds and multiple attachments for all your baking needs.",
    price: 399.99,
    originalPrice: 449.99,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "home-garden",
    subcategory: "kitchen",
    brand: "KitchenAid",
    stock: 50,
    sku: "KITCH-MIXER-001",
    weight: 12000,
    dimensions: { length: 35, width: 25, height: 40 },
    featured: true,
    rating: { average: 4.8, count: 892 },
    tags: ["mixer", "kitchen", "baking", "appliance"],
    specifications: {
      Power: "325 watts",
      Speeds: "10",
      "Bowl Capacity": "4.5 quarts",
      Color: "Empire Red",
    },
    isActive: true,
    discount: { percentage: 11, validUntil: new Date("2024-12-31") },
  },
  {
    name: "Decorative Wall Art Set",
    description:
      "Beautiful set of 3 canvas wall art pieces with modern abstract design.",
    price: 149.99,
    originalPrice: 179.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    category: "home-garden",
    subcategory: "decor",
    brand: "Anthropologie",
    stock: 75,
    sku: "DECOR-WALL-001",
    weight: 1500,
    dimensions: { length: 60, width: 5, height: 40 },
    featured: true,
    rating: { average: 4.4, count: 345 },
    tags: ["art", "wall-decor", "canvas", "modern"],
    specifications: {
      Material: "Canvas",
      "Set Includes": "3 pieces",
      Size: '16" x 24" each',
      Style: "Abstract",
    },
    isActive: true,
    discount: { percentage: 17, validUntil: new Date("2024-12-31") },
  },
];

const sampleUsers = [
  {
    name: "Admin User",
    email: "admin@estore.com",
    password: "admin123",
    role: "admin",
    emailVerified: new Date(),
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
    emailVerified: new Date(),
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user",
    emailVerified: new Date(),
  },
];

async function seedDatabase() {
  try {
    console.log("Connecting to database...");
    await connectDB();

    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Product.deleteMany({});

    console.log("Creating users...");
    const users = await User.create(sampleUsers);
    console.log(`Created ${users.length} users`);

    console.log("Creating products...");
    const products = await Product.create(sampleProducts);
    console.log(`Created ${products.length} products`);

    console.log("Database seeded successfully!");
    console.log("\nSample login credentials:");
    console.log("Admin: admin@estore.com / admin123");
    console.log("User: john@example.com / password123");
    console.log("User: jane@example.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
