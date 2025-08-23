
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
import { Eye, EyeOff, Globe } from 'lucide-react';
import { languages, useLanguage } from '@/lib/locales/language-context';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { language, setLanguage, translations } = useLanguage();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-8">
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
        src="https://placehold.co/1920x1080.png"
        alt="Artisan background"
        fill
        style={{objectFit: "cover"}}
        className="absolute inset-0 w-full h-full z-0"
        data-ai-hint="artisan workshop"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Card className="mx-auto max-w-sm w-full z-20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
           <div className="inline-block mb-4">
            <Logo className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">{translations.signup_page.title}</CardTitle>
          <CardDescription>
            {translations.signup_page.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">{translations.signup_page.username_label}</Label>
              <Input
                id="username"
                type="text"
                placeholder={translations.signup_page.username_placeholder}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{translations.signup_page.email_label}</Label>
              <Input
                id="email"
                type="email"
                placeholder={translations.signup_page.email_placeholder}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">{translations.signup_page.phone_label}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={translations.signup_page.phone_placeholder}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{translations.signup_page.create_password_label}</Label>
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
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">{translations.signup_page.confirm_password_label}</Label>
               <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              {translations.signup_page.create_account_button}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {translations.signup_page.login_link.split('?')[0]}?{' '}
            <Link href="/login" className="underline">
              {translations.signup_page.login_link.split('?')[1]}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
