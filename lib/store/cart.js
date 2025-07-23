import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Add item to cart
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity }],
          };
        });
      },

      // Remove item from cart
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      // Clear cart
      clearCart: () => {
        set({ items: [] });
      },

      // Toggle cart sidebar
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      // Open cart
      openCart: () => {
        set({ isOpen: true });
      },

      // Close cart
      closeCart: () => {
        set({ isOpen: false });
      },

      // Get cart total
      getTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Get item count
      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      // Check if item is in cart
      isInCart: (productId) => {
        const { items } = get();
        return items.some((item) => item.id === productId);
      },

      // Get item quantity
      getItemQuantity: (productId) => {
        const { items } = get();
        const item = items.find((item) => item.id === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;
