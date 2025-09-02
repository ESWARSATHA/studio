
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
  Wallet,
  IndianRupee,
  Users,
  ShoppingBag,
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
            <Link href="/login">{translations.homepage.login}</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">{translations.homepage.signup}</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              {translations.homepage.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              {translations.homepage.subtitle}
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  {translations.homepage.artisans_button} <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">
                {translations.homepage.features_title}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {translations.homepage.features_subtitle}
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-4">
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    {translations.homepage.feature_1_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {translations.homepage.feature_1_desc}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Mic className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    {translations.homepage.feature_2_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {translations.homepage.feature_2_desc}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    {translations.homepage.feature_3_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {translations.homepage.feature_3_desc}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    {translations.homepage.feature_4_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {translations.homepage.feature_4_desc}
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
                {translations.homepage.art_title}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {translations.homepage.art_subtitle}
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="overflow-hidden">
                <Image
                  src="https://picsum.photos/800/600?random=1"
                  alt="A screenshot of the Artisan dashboard showing listed products."
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover object-top"
                  data-ai-hint="artisan dashboard products"
                />
                <CardHeader>
                  <CardTitle>
                    Manage Your Creations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Easily upload, categorize, and manage all your artwork from a single, intuitive dashboard.
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <Image
                  src="https://picsum.photos/800/600?random=2"
                  alt="A screenshot of the analytics page showing charts and insights."
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover object-top"
                  data-ai-hint="artisan analytics charts"
                />
                <CardHeader>
                  <CardTitle>
                    Gain Valuable Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understand how customers interact with your art with our smart analytics and AI-powered feedback.
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <Image
                  src="https://picsum.photos/800/600?random=3"
                  alt="A screenshot of the community hub where artisans can connect."
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover object-top"
                  data-ai-hint="artisan community hub"
                />
                <CardHeader>
                  <CardTitle>
                    Connect with Peers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Join a vibrant community of fellow artisans to share ideas, collaborate, and grow together.
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
                  {translations.homepage.payments_title}
                </h2>
                <p className="mt-4 text-muted-foreground">
                  {translations.homepage.payments_subtitle}
                </p>
                 <p className="mt-4 text-muted-foreground text-sm">
                  {translations.homepage.payments_extra}
                </p>
                <div className="mt-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Wallet className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Simplified Payments For You</h4>
                            <p className="text-sm text-muted-foreground">When a customer buys your art, they can pay easily with UPI. You get the payment instantly. Simple, fast, and fair.</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <IndianRupee className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Direct & Transparent</h4>
                            <p className="text-sm text-muted-foreground">No hidden charges. No delays. Your hard-earned money reaches you directly, empowering you to grow your business.</p>
                        </div>
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Image
                    src="https://picsum.photos/400/400?random=1"
                    alt="A person using a smartphone to make an online payment for an art piece."
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-md object-cover aspect-square"
                    data-ai-hint="online payment"
                />
                 <Image
                    src="https://picsum.photos/400/400?random=2"
                    alt="An artisan looking at a notification on their phone confirming a payment received."
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-md object-cover aspect-square"
                    data-ai-hint="payment confirmation"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>{translations.homepage.footer?.replace('{year}', new Date().getFullYear().toString())}</p>
      </footer>
    </div>
  );
}
