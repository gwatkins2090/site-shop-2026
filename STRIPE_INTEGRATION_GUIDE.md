# Stripe Integration Guide for Artist Portfolio Shop

This guide will walk you through integrating Stripe payment processing into your Next.js artist portfolio shop.

---

## 📋 Overview

We'll implement:
- ✅ Shopping cart functionality
- ✅ Stripe Checkout for secure payments
- ✅ Order confirmation emails
- ✅ Inventory management (marking artworks as sold)
- ✅ Admin dashboard to view orders (optional)

---

## 🎯 Two Implementation Options

### Option 1: Stripe Checkout (Recommended - Easier)
**Pros:**
- Stripe hosts the payment page (very secure)
- PCI compliance handled by Stripe
- Less code to write
- Mobile-optimized checkout
- Supports Apple Pay, Google Pay automatically
- **Setup time: 2-3 hours**

### Option 2: Stripe Elements (Advanced)
**Pros:**
- Custom checkout UI on your site
- More control over design
- Embedded payment form
- **Setup time: 4-6 hours**

**For this guide, we'll use Option 1 (Stripe Checkout) - it's perfect for art sales and much easier to implement.**

---

## 🚀 Step 1: Stripe Account Setup

### 1.1 Create a Stripe Account
1. Go to https://stripe.com
2. Click "Sign up"
3. Complete business registration
4. Verify your identity (required for payouts)

### 1.2 Get Your API Keys
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. **Important:** Use test keys for development!

### 1.3 Configure Stripe Settings
1. Go to Settings → Branding
   - Upload your logo
   - Set brand colors
2. Go to Settings → Customer emails
   - Enable receipt emails
3. Go to Settings → Checkout settings
   - Enable shipping address collection (for physical artworks)

---

## 📦 Step 2: Install Dependencies

Run these commands in your project:

```bash
pnpm install stripe @stripe/stripe-js
pnpm install -D @types/stripe
```

**What these do:**
- `stripe` - Server-side Stripe SDK
- `@stripe/stripe-js` - Client-side Stripe SDK

---

## 🔐 Step 3: Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist):

```bash
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Your website URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Stripe Webhook Secret (for Step 8)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Important:** Add `.env.local` to your `.gitignore` file!

```bash
# Add to .gitignore
.env.local
.env*.local
```

---

## 🛒 Step 4: Create Shopping Cart Context

Create a new file: `src/contexts/cart-context.tsx`

```typescript
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Artwork } from '@/types';

interface CartItem {
  artwork: Artwork;
  quantity: number;
}

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

  const addToCart = (artwork: Artwork) => {
    setItems((currentItems) => {
      // Check if artwork is already in cart
      const existingItem = currentItems.find(
        (item) => item.artwork.id === artwork.id
      );

      if (existingItem) {
        // For artworks, we typically don't want duplicates (they're unique)
        // But if you want to allow multiple, increment quantity:
        // return currentItems.map((item) =>
        //   item.artwork.id === artwork.id
        //     ? { ...item, quantity: item.quantity + 1 }
        //     : item
        // );

        // For unique artworks, just return current items
        return currentItems;
      }

      // Add new item
      return [...currentItems, { artwork, quantity: 1 }];
    });
  };

  const removeFromCart = (artworkId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.artwork.id !== artworkId)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce(
      (total, item) => total + (item.artwork.price || 0) * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

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
```

---

## 🎨 Step 5: Add Cart Provider to Layout

Update `src/app/layout.tsx`:

```typescript
import { CartProvider } from '@/contexts/cart-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
```

---

## 🛍️ Step 6: Create Cart Component

Create a new file: `src/components/shop/cart-drawer.tsx`

```typescript
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
```

---

## 🔗 Step 7: Add Cart to Header

Update `src/components/layout/header.tsx` to include the cart:

```typescript
import { CartDrawer } from '@/components/shop/cart-drawer';

// ... in the header component, add CartDrawer near the ThemeToggle:

<div className="flex items-center space-x-2 md:space-x-4">
  {/* Cart */}
  <CartDrawer />

  {/* Theme Toggle */}
  <ThemeToggle />

  {/* Mobile Menu Button */}
  {/* ... rest of header */}
</div>
```

---

## 💳 Step 8: Create Stripe Checkout API Route

Create a new file: `src/app/api/create-checkout-session/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.artwork.title,
          description: `${item.artwork.medium} - ${item.artwork.dimensions}`,
          images: [
            // Convert relative path to absolute URL
            typeof item.artwork.image === 'string'
              ? item.artwork.image
              : `${process.env.NEXT_PUBLIC_SITE_URL}/images/artworks/default.jpg`,
          ],
          metadata: {
            artworkId: item.artwork.id,
            artist: item.artwork.artist || 'Artist',
          },
        },
        unit_amount: Math.round((item.artwork.price || 0) * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'IT', 'ES', 'NL'], // Add more as needed
      },
      metadata: {
        orderItems: JSON.stringify(
          items.map((item: any) => ({
            id: item.artwork.id,
            title: item.artwork.title,
            price: item.artwork.price,
          }))
        ),
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

## 🛒 Step 9: Create Checkout Page

Create a new file: `src/app/checkout/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { formatPrice, DEFAULT_BLUR_DATA_URL } from '@/lib/utils';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const { sessionId, error: apiError } = await response.json();

      if (apiError) {
        throw new Error(apiError);
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif font-light mb-4">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Add some artworks to your cart to continue.
          </p>
          <Button variant="gallery" asChild>
            <Link href="/shop">Browse Artworks</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Back Button */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild>
            <Link href="/shop" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-serif font-light mb-8">
                Checkout
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.artwork.id} className="flex gap-4">
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
                        <div className="flex-1">
                          <h3 className="font-medium">{item.artwork.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.artwork.medium}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.artwork.dimensions}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gallery-gold">
                            {formatPrice(item.artwork.price!)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4 mt-4">
                      <div className="flex items-center justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span className="text-gallery-gold">
                          {formatPrice(getCartTotal())}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Click the button below to proceed to secure checkout powered
                      by Stripe.
                    </p>

                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    <Button
                      variant="gallery"
                      size="lg"
                      className="w-full"
                      onClick={handleCheckout}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Proceed to Payment'
                      )}
                    </Button>

                    <div className="text-xs text-muted-foreground text-center space-y-2">
                      <p>🔒 Secure payment processing</p>
                      <p>💳 All major credit cards accepted</p>
                      <p>📦 Shipping calculated at checkout</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## ✅ Step 10: Create Success & Cancel Pages

Create `src/app/checkout/success/page.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful purchase
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">
            Thank You for Your Purchase!
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Your order has been confirmed. You will receive an email confirmation
            shortly with your order details and shipping information.
          </p>

          {sessionId && (
            <p className="text-sm text-muted-foreground mb-8">
              Order ID: {sessionId.slice(-10)}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gallery" size="lg" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

Create `src/app/checkout/cancel/page.tsx`:

```typescript
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CancelPage() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-12 w-12 text-orange-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">
            Checkout Cancelled
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Your order was not completed. Your cart has been saved and you can
            return to complete your purchase at any time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gallery" size="lg" asChild>
              <Link href="/checkout">Return to Checkout</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

---

## 🔄 Step 11: Update Shop Page to Use Cart

Update `src/app/shop/page.tsx` to use the cart context:

```typescript
import { useCart } from '@/contexts/cart-context';

// Inside the component:
const { addToCart } = useCart();

const handleAddToCart = (artwork: Artwork) => {
  addToCart(artwork);
  // Optional: Show a toast notification
  alert(`Added "${artwork.title}" to cart!`);
};

// Update the button onClick:
<Button
  variant="gallery"
  size="sm"
  className="w-full"
  onClick={() => handleAddToCart(artwork)}
>
  <ShoppingBag className="h-4 w-4 mr-2" />
  Add to Cart
</Button>
```

---

## 🎯 Step 12: Testing

### Test Mode (Use test cards)
1. Use test mode keys from Stripe
2. Test card numbers:
   - **Success:** `4242 4242 4242 4242`
   - **Decline:** `4000 0000 0000 0002`
   - **Requires authentication:** `4000 0027 6000 3184`
3. Use any future expiry date (e.g., 12/34)
4. Use any 3-digit CVC
5. Use any ZIP code

### Testing Checklist
- [ ] Add artwork to cart
- [ ] View cart drawer
- [ ] Remove items from cart
- [ ] Complete checkout flow
- [ ] Test successful payment
- [ ] Test declined payment
- [ ] Verify success page
- [ ] Verify cancel page
- [ ] Check Stripe dashboard for orders

---

## 🚀 Step 13: Going Live

When ready for production:

1. **Activate Your Stripe Account**
   - Complete identity verification
   - Add bank account for payouts

2. **Switch to Live Keys**
   - Get live keys from Stripe Dashboard
   - Update `.env.local` with live keys

3. **Update Environment Variables on Your Host**
   - Add live keys to Vercel/Netlify/etc.
   - Set `NEXT_PUBLIC_SITE_URL` to your live domain

4. **Test Live Mode**
   - Make a small real purchase
   - Verify email receipts
   - Check order appears in Stripe

5. **Set Up Webhooks** (Optional but recommended - see Step 14)

---

## 🎣 Step 14: Webhooks (Optional - Recommended)

Webhooks notify your app when payments succeed. This is important for:
- Marking artworks as sold
- Sending custom confirmation emails
- Updating inventory

### 14.1 Create Webhook Endpoint

Create `src/app/api/webhooks/stripe/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;

      // TODO: Mark artworks as sold in your database
      // TODO: Send confirmation email
      // TODO: Update inventory

      console.log('Payment successful:', session.id);
      console.log('Order items:', session.metadata?.orderItems);

      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
```

### 14.2 Set Up Webhook in Stripe

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret
6. Add to `.env.local`: `STRIPE_WEBHOOK_SECRET=whsec_...`

### 14.3 Test Webhooks Locally

Use Stripe CLI:
```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 📊 Step 15: Order Management (Optional)

For managing orders, you have options:

### Option A: Use Stripe Dashboard
- View all orders in Stripe Dashboard
- Export to CSV
- No additional code needed

### Option B: Build Admin Dashboard
- Create protected admin routes
- Store orders in database (Supabase, MongoDB, etc.)
- Build custom order management UI

### Option C: Use Stripe Customer Portal
- Customers can view their orders
- Built-in refund requests
- Free from Stripe

---

## 🎨 Step 16: Customization Ideas

### Add-ons you could implement:
- ✅ Discount codes/coupons
- ✅ Tax calculation
- ✅ Multiple currencies
- ✅ Subscription for art prints
- ✅ Commission requests via Stripe
- ✅ Gift cards
- ✅ Installment payments (Stripe supports this)

---

## 📋 Deployment Checklist

Before going live:

- [ ] Test mode works perfectly
- [ ] All error cases handled
- [ ] Success/cancel pages working
- [ ] Cart persists across sessions
- [ ] Mobile responsive
- [ ] Environment variables set on hosting platform
- [ ] Live Stripe keys configured
- [ ] Webhooks set up (optional but recommended)
- [ ] Test live purchase
- [ ] Email receipts configured
- [ ] Shipping countries configured
- [ ] Terms of service linked
- [ ] Privacy policy linked
- [ ] Refund policy documented

---

## 🆘 Troubleshooting

### Common Issues:

**"Invalid API Key"**
- Check your `.env.local` file
- Make sure keys don't have extra spaces
- Restart dev server after adding env vars

**"No such checkout session"**
- Check NEXT_PUBLIC_SITE_URL is correct
- Ensure success/cancel URLs are absolute

**Cart not persisting**
- Check localStorage isn't disabled
- Check CartProvider is in layout.tsx

**Images not showing in Stripe**
- Images must be publicly accessible URLs
- Use absolute URLs, not relative paths

**Webhook signature verification failed**
- Check webhook secret is correct
- Body must be raw (not parsed JSON)

---

## 💰 Stripe Fees

**Standard pricing:**
- 2.9% + $0.30 per successful card charge (US)
- No setup fees, monthly fees, or hidden costs
- Payouts to your bank (2-7 days)

---

## 📚 Additional Resources

- [Stripe Docs](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/checkout/quickstart)
- [Next.js + Stripe Example](https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript)
- [Stripe Testing Cards](https://stripe.com/docs/testing)

---

## ✅ You're Done!

Your artist portfolio now has a fully functional e-commerce system! Artists can sell their work online with secure payment processing.

**Next steps:**
1. Test thoroughly in test mode
2. Customize styling to match your brand
3. Set up webhooks for inventory management
4. Go live with real Stripe keys
5. Celebrate! 🎉
