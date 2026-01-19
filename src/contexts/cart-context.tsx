'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Artwork, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((artwork: Artwork) => {
    setItems((currentItems) => {
      // Check if artwork is already in cart
      const existingItem = currentItems.find(
        (item) => item.artwork.id === artwork.id
      );

      if (existingItem) {
        // For artworks, we typically don't want duplicates (they're unique)
        // Just return current items
        return currentItems;
      }

      // Add new item
      return [...currentItems, { artwork, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((artworkId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.artwork.id !== artworkId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return items.reduce(
      (total, item) => total + (item.artwork.price || 0) * item.quantity,
      0
    );
  }, [items]);

  const getCartCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
