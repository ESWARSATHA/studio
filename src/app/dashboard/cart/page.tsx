
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/lib/locales/language-context';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import placeholderImages from '@/lib/placeholder-images.json';

const { items: cartItems } = placeholderImages.cart;


export default function CartPage() {
  const { translations } = useLanguage();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50;
  const total = subtotal + shipping;

  return (
    <div className="grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">{translations.cart_page.title}</h1>
            </div>
            
            <div className="grid gap-6">
                {cartItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        <div className="flex items-center gap-4 p-4">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={120}
                                height={120}
                                className="rounded-md object-cover"
                                data-ai-hint={item.imageHint}
                            />
                            <div className="flex-1 grid gap-1">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-muted-foreground text-sm">₹{item.price.toLocaleString()}</p>
                            </div>
                             <div className="flex items-center gap-4">
                                <Input type="number" min="1" defaultValue={item.quantity} className="w-20" />
                                <Button variant="outline" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove Item</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {cartItems.length === 0 && (
                <div className="text-center py-16">
                    <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/30" />
                    <h2 className="mt-4 text-xl font-semibold">{translations.cart_page.empty_title}</h2>
                    <p className="text-muted-foreground mt-2">{translations.cart_page.empty_description}</p>
                </div>
            )}
      </div>

      <div className="md:col-span-1">
         <Card>
            <CardHeader>
                <CardTitle>{translations.cart_page.summary_title}</CardTitle>
                <CardDescription>{translations.cart_page.summary_description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex justify-between">
                    <span>{translations.cart_page.subtotal}</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between text-muted-foreground">
                    <span>{translations.cart_page.shipping}</span>
                    <span>₹{shipping.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>{translations.cart_page.total}</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>
                <Button size="lg" className="w-full">
                    {translations.cart_page.checkout_button} <ArrowRight className="ml-2" />
                </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
