import { Suspense } from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CategoryGrid from "../components/home/CategoryGrid";
import NewsletterSignup from "../components/home/NewsletterSignup";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export const metadata = {
  title: "E-Store - Your Ultimate Shopping Destination",
  description:
    "Discover amazing products at great prices. Shop electronics, clothing, books, and home & garden items with fast shipping and excellent customer service.",
  keywords:
    "e-commerce, online shopping, electronics, clothing, books, home & garden",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that our
              customers love
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of products across different categories
            </p>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
