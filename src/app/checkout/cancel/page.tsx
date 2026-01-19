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
