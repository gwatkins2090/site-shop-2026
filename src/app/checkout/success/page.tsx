'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  useEffect(() => {
    if (!sessionId) return;

    // Check if this session has already been processed
    const completedSessions = JSON.parse(localStorage.getItem('completedSessions') || '[]');

    if (!completedSessions.includes(sessionId)) {
      // This is a new successful payment - clear the cart
      clearCart();

      // Mark this session as completed
      completedSessions.push(sessionId);
      localStorage.setItem('completedSessions', JSON.stringify(completedSessions));

      // Clean up old sessions (keep only last 10)
      if (completedSessions.length > 10) {
        const recentSessions = completedSessions.slice(-10);
        localStorage.setItem('completedSessions', JSON.stringify(recentSessions));
      }
    }
  }, [sessionId, clearCart]);

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

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">
              Loading...
            </h1>
          </div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
