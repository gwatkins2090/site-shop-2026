'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { formatPrice, DEFAULT_BLUR_DATA_URL } from '@/lib/utils';

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, getCartTotal, getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <>
      {/* Cart Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingBag className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gallery-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-serif font-semibold">
                  Shopping Cart ({cartCount})
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <Button
                      variant="gallery"
                      className="mt-4"
                      onClick={() => setIsOpen(false)}
                      asChild
                    >
                      <Link href="/shop">Browse Artworks</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.artwork.id}
                        className="flex gap-4 p-4 border rounded-lg"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.artwork.image}
                            alt={item.artwork.title}
                            fill
                            className="object-cover rounded"
                            sizes="80px"
                            placeholder="blur"
                            blurDataURL={DEFAULT_BLUR_DATA_URL}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">
                            {item.artwork.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.artwork.medium}
                          </p>
                          <p className="text-gallery-gold font-semibold mt-1">
                            {formatPrice(item.artwork.price!)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.artwork.id)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-6 space-y-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-gallery-gold">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>
                  <Button
                    variant="gallery"
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <Link href="/checkout" onClick={() => setIsOpen(false)}>
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
