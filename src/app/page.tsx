
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  const homeTranslations = translations.homepage || {};


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
            <Link href="/login">{homeTranslations.login}</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">{homeTranslations.signup}</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              {homeTranslations.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              {homeTranslations.subtitle}
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  {homeTranslations.artisans_button} <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">
                {homeTranslations.features_title}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {homeTranslations.features_subtitle}
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-4">
              <Card>
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    {homeTranslations.feature_1_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {homeTranslations.feature_1_desc}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Mic className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    {homeTranslations.feature_2_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {homeTranslations.feature_2_desc}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    {homeTranslations.feature_3_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {homeTranslations.feature_3_desc}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">
                    {homeTranslations.feature_4_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {homeTranslations.feature_4_desc}
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
                {homeTranslations.art_title}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {homeTranslations.art_subtitle}
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
                    {homeTranslations.overview_seller_1_title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {homeTranslations.overview_seller_1_desc}
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
                    {homeTranslations.overview_seller_2_title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {homeTranslations.overview_seller_2_desc}
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
                    {homeTranslations.overview_seller_3_title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {homeTranslations.overview_seller_3_desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div className="max-w-md">
                     <h2 className="text-3xl font-bold">
                        {homeTranslations.payments_title}
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        {homeTranslations.payments_subtitle}
                    </p>
                    <div className="mt-8 grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><IndianRupee /> {homeTranslations.payments_feature_1_title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{homeTranslations.payments_feature_1_desc}</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><Wallet /> {homeTranslations.payments_feature_2_title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{homeTranslations.payments_feature_2_desc}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                 <div className="flex justify-center">
                    <Image
                    src="https://picsum.photos/600/600"
                    alt="An abstract representation of seamless digital payments in India."
                    width={500}
                    height={500}
                    className="rounded-lg shadow-lg"
                    data-ai-hint="digital payments illustration"
                    />
                </div>
            </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="https://picsum.photos/600/600?random=5"
                alt="An illustration representing government support and growth for entrepreneurs."
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
                data-ai-hint="government support entrepreneur"
              />
            </div>
            <div className="max-w-md">
              <h2 className="text-3xl font-bold">{homeTranslations.gov_support_title}</h2>
              <p className="mt-4 text-muted-foreground">{homeTranslations.gov_support_subtitle}</p>
              <div className="mt-8 flex">
                <Button asChild size="lg">
                  <Link href="https://www.startupindia.gov.in/" target="_blank" rel="noopener noreferrer">
                    {homeTranslations.gov_support_button} <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>{homeTranslations.footer?.replace('{year}', new Date().getFullYear().toString())}</p>
      </footer>
    </div>
  );
}
