"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Smartphone, Shirt, BookOpen, Home } from "lucide-react";
import Image from "next/image";

const CategoryGrid = () => {
  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      description: "Latest gadgets and technology",
      icon: Smartphone,
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      href: "/products?category=electronics",
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "clothing",
      name: "Clothing",
      description: "Fashion for every style",
      icon: Shirt,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      href: "/products?category=clothing",
      color: "from-pink-500 to-red-600",
    },
    {
      id: "books",
      name: "Books",
      description: "Knowledge and entertainment",
      icon: BookOpen,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2028&q=80",
      href: "/products?category=books",
      color: "from-green-500 to-teal-600",
    },
    {
      id: "home-garden",
      name: "Home & Garden",
      description: "Transform your living space",
      icon: Home,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      href: "/products?category=home-garden",
      color: "from-orange-500 to-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="group"
        >
          <Link href={category.href} className="block">
            <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: 0.2,
                }}
                priority
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="group-hover:opacity-30 transition-opacity duration-300"
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative p-6 h-48 flex flex-col justify-center items-center text-center">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {category.description}
                </p>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg">
                    <svg
                      className="w-4 h-4 text-gray-600 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryGrid;
