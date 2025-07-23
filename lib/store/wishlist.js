import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add product to wishlist
      addItem: (product) => {
        set((state) => {
          if (state.items.some((item) => item._id === product._id)) {
            return state;
          }
          return { items: [...state.items, product] };
        });
      },

      // Remove product from wishlist
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },

      // Check if product is in wishlist
      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((item) => item._id === productId);
      },

      // Get all wishlist items
      getItems: () => {
        const { items } = get();
        return items;
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useWishlistStore;
