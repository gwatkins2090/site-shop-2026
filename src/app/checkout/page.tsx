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

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
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

      const { url, error: apiError } = await response.json();

      if (apiError) {
        throw new Error(apiError);
      }

      // Redirect to Stripe Checkout using the session URL
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
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
                      <p>Secure payment processing</p>
                      <p>All major credit cards accepted</p>
                      <p>Shipping calculated at checkout</p>
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
