
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowRight,
  Bot,
  Image as ImageIcon,
  Mic,
  Sparkles,
  Globe,
} from 'lucide-react';
import { Logo } from '@/components/icons';
import { languages, useLanguage } from '@/lib/locales/language-context';

export default function Home() {
  const { language, setLanguage, translations } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Logo className="h-8 w-8 text-primary" />
          <span>Artisan</span>
        </Link>
        <nav className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{languages.find(lang => lang.code === language)?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onSelect={() => setLanguage(lang.code)}>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Empower Your Craft with{' '}
              <span className="text-primary">AI</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              Artisan provides intelligent tools to help you describe, narrate,
              and sell your unique creations. Focus on your art, we'll handle
              the words. We charge a minimal 1% fee to ensure you get the
              maximum value for your work.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  For Artisans <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/login">For Buyers</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">
                Features for the Modern Artisan
              </h2>
              <p className="mt-4 text-muted-foreground">
                From image to story, our AI is trained to showcase the soul of
                your work.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-4">
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    AI Image Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Upload a photo and get a compelling description and tags
                    instantly.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Mic className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    Voice-to-Story
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Tell your story, and our AI will refine it into a
                    captivating narrative.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    Smart Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Get insights on how customers are interacting with your
                    products.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    Custom Requests
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Receive and manage commission requests directly from buyers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">
                Contemporary Indian Art for the Next Generation
              </h2>
              <p className="mt-4 text-muted-foreground">
                Discover modern Indian artists who are redefining tradition with
                a fresh, vibrant perspective.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="overflow-hidden">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Digital mythology art"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint="digital art mythology"
                />
                <CardHeader>
                  <CardTitle>
                    Digital Mythology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ancient tales retold through digital illustration, blending
                    epic narratives with modern aesthetics.
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Urban street art"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint="indian street art"
                />
                <CardHeader>
                  <CardTitle>
                    Indian Street Art Fusion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Graffiti and stencil art infused with Indian motifs,
                    creating bold statements on urban canvases.
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Minimalist folk art"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint="minimalist folk art"
                />
                <CardHeader>
                  <CardTitle>
                    Minimalist Folk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Traditional folk forms like Warli and Gond, reimagined with
                    clean lines and a contemporary color palette.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">
                  Flexible &amp; Secure Payments
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We support a wide range of payment methods to make
                  transactions seamless for everyone. All transactions are
                  secure and compliant with Indian regulations.
                </p>
                <p className="mt-4 text-muted-foreground text-sm">
                  ...and many more UPI, credit, and debit card options.
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6">
                <Image
                  src="https://placehold.co/100x40.png"
                  alt="UPI Logo"
                  width={100}
                  height={40}
                  data-ai-hint="upi logo"
                />
                <Image
                  src="https://placehold.co/100x40.png"
                  alt="Visa Logo"
                  width={100}
                  height={40}
                  data-ai-hint="visa logo"
                />
                <Image
                  src="https://placehold.co/100x40.png"
                  alt="Mastercard Logo"
                  width={100}
                  height={40}
                  data-ai-hint="mastercard logo"
                />
                <Image
                  src="https://placehold.co/100x40.png"
                  alt="Rupay Logo"
                  width={100}
                  height={40}
                  data-ai-hint="rupay logo"
                />
                <Image
                  src="https://placehold.co/100x40.png"
                  alt="PhonePe Logo"
                  width={100}
                  height={40}
                  data-ai-hint="phonepe logo"
                />
                <Image
                  src="https://placehold.co/100x40.png"
                  alt="Google Pay Logo"
                  width={100}
                  height={40}
                  data-ai-hint="google pay logo"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Artisan. All rights reserved.</p>
      </footer>
    </div>
  );
}
