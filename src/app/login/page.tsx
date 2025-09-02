
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons';
import { Eye, EyeOff, Globe, Users, ShoppingBag } from 'lucide-react';
import { languages, useLanguage } from '@/lib/locales/language-context';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { language, setLanguage, translations } = useLanguage();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
       <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <Logo className="h-8 w-8 text-primary" />
          <span>Artisan</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 text-white hover:bg-white/10 hover:text-white">
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
      </header>

      <Image
        src="https://picsum.photos/1920/1080"
        alt="A vibrant and intricate background pattern inspired by Indian art and textiles."
        fill
        style={{objectFit: "cover"}}
        className="absolute inset-0 w-full h-full z-0"
        data-ai-hint="indian art pattern"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Card className="mx-auto max-w-sm w-full z-20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
           <div className="inline-block mb-4">
            <Logo className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">{translations.login_page.title}</CardTitle>
          <CardDescription>
            {translations.login_page.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="loginId">{translations.login_page.form_label}</Label>
              <Input
                id="loginId"
                type="text"
                placeholder={translations.login_page.form_placeholder}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{translations.login_page.password_label}</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  {translations.login_page.forgot_password}
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Button asChild>
                    <Link href="/dashboard?userType=seller">
                        <Users className="mr-2"/>
                        {translations.login_page.login_seller_button}
                    </Link>
                </Button>
                 <Button asChild variant="secondary">
                    <Link href="/dashboard?userType=buyer">
                        <ShoppingBag className="mr-2"/>
                        {translations.login_page.login_buyer_button}
                    </Link>
                </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            {translations.login_page.signup_link.split('?')[0]}?{' '}
            <Link href="/signup" className="underline">
              {translations.login_page.signup_link.split('?')[1]}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
