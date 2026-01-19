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

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
