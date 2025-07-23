"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "New Electronics Collection",
      subtitle: "Discover the latest in technology",
      description:
        "Get up to 50% off on premium electronics including smartphones, laptops, and smart home devices.",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Electronics",
      href: "/products?category=electronics",
      badge: "New Arrivals",
    },
    {
      id: 2,
      title: "Fashion Forward",
      subtitle: "Trending styles for every season",
      description:
        "Explore our curated collection of clothing and accessories that define your unique style.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Fashion",
      href: "/products?category=clothing",
      badge: "Trending",
    },
    {
      id: 3,
      title: "Home & Garden Essentials",
      subtitle: "Transform your living space",
      description:
        "Create the home of your dreams with our selection of furniture, decor, and garden essentials.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Home",
      href: "/products?category=home-garden",
      badge: "Best Sellers",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Use Next.js Image for LCP optimization */}
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white"
              >
                {/* Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium mb-4">
                  <Star className="w-4 h-4 mr-1" />
                  {slides[currentSlide].badge}
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slides[currentSlide].title}
                </h1>

                {/* Subtitle */}
                <h2 className="text-xl lg:text-2xl font-medium mb-4 text-gray-200">
                  {slides[currentSlide].subtitle}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {slides[currentSlide].description}
                </p>

                {/* CTA Button */}
                <Link
                  href={slides[currentSlide].href}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 text-lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {slides[currentSlide].cta}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
