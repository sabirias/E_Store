"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useCartStore from "../../lib/store/cart";
import { formatPrice } from "../../lib/utils/format";

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } =
    useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (productId, newQuantity) => {
    setIsUpdating(true);
    try {
      updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    setIsUpdating(true);
    try {
      removeItem(productId);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearCart = async () => {
    setIsUpdating(true);
    try {
      clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Shopping Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Add some products to get started
                  </p>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="btn-primary"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={isUpdating || item.quantity <= 1}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabled={isUpdating || item.quantity >= 99}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isUpdating}
                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                {/* Cart Summary */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPrice(getTotal())}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full btn-primary text-center"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={handleClearCart}
                    disabled={isUpdating}
                    className="w-full btn-outline"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  onClick={onClose}
                  className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
