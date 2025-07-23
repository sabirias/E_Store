"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        toast.success("Successfully subscribed to our newsletter!");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Thank You for Subscribing!
        </h2>
        <p className="text-blue-100 text-lg">
          You&apos;ll be the first to know about our latest products and
          exclusive offers.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>

        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new
          products, exclusive offers, and special promotions.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="spinner mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
        </form>

        <p className="text-blue-100 text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    </div>
  );
};

export default NewsletterSignup;
