
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Logo } from '@/components/icons';

export default function SignupPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen py-8">
       <Image
        src="https://placehold.co/1920x1080.png"
        alt="Artisan background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full z-0"
        data-ai-hint="artisan workshop"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Card className="mx-auto max-w-sm w-full z-20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
           <Link href="/" className="inline-block mb-4">
            <Logo className="h-12 w-12 text-primary" />
          </Link>
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Join ArtisanAI to start selling or buying unique crafts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label>I am a...</Label>
              <RadioGroup defaultValue="artisan" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="artisan" id="r1" />
                  <Label htmlFor="r1">Artisan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buyer" id="r2" />
                  <Label htmlFor="r2">Buyer</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
