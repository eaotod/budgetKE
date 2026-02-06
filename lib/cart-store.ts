"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "./types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Computed
  itemCount: number;
  subtotal: number;
  total: number;
  
  // Actions
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { itemCount, subtotal, total: subtotal };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      itemCount: 0,
      subtotal: 0,
      total: 0,
      
      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === newItem.id);
        
        let updatedItems: CartItem[];
        
        if (existingItem) {
          // Digital products: Don't increase quantity, just ensure it's there
          // Maybe move it to the top or just do nothing
          return; // Item already in cart
        } else {
          updatedItems = [...items, { ...newItem, quantity: 1 }];
        }
        
        const totals = calculateTotals(updatedItems);
        set({ items: updatedItems, ...totals, isOpen: true });
      },
      
      removeItem: (id) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.id !== id);
        const totals = calculateTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },
      
      updateQuantity: (id, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        
        const totals = calculateTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },
      
      clearCart: () => {
        set({ items: [], itemCount: 0, subtotal: 0, total: 0 });
      },
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "budgetke-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        itemCount: state.itemCount,
        subtotal: state.subtotal,
        total: state.total,
      }),
    }
  )
);

// Hook for hydration safety (prevents SSR mismatch)
export const useCart = () => {
  const store = useCartStore();
  return store;
};
