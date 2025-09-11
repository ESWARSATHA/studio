
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
import { Eye, EyeOff, Globe, LogIn } from 'lucide-react';
import { languages, useLanguage } from '@/lib/locales/language-context';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.58 2.6-5.5 2.6-4.8 0-8.48-3.98-8.48-8.88s3.68-8.88 8.48-8.88c2.79 0 4.95.99 6.59 2.5l-2.22 2.22c-1.05-.99-2.43-1.63-4.37-1.63-3.6 0-6.52 2.94-6.52 6.56s2.92 6.56 6.52 6.56c4.17 0 5.8-2.84 6.04-4.38h-6.14z" />
    </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Facebook</title>
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.35C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
    </svg>
);


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
              <DropdownMenuItem key={lang.code} onSelect={() => setLanguage(lang.code)} role="button">
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
             <div className="grid gap-2">
                <Button asChild className="w-full">
                    <Link href="/dashboard">
                        <LogIn className="mr-2"/>
                        {translations.login_page.login_seller_button}
                    </Link>
                </Button>
            </div>
            <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                    <GoogleIcon className="mr-2 h-4 w-4" />
                    Google
                </Button>
                <Button variant="outline">
                    <FacebookIcon className="mr-2 h-4 w-4 fill-current" />
                    Facebook
                </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            {translations.login_page.signup_link.split('?')[0]}?{' '}
            <Link href="/signup" className="underline">
              {translations.login_page.signup_link.split('?')[1]}
            </Link>
          </div>
           <div className="mt-4 text-center text-xs text-muted-foreground px-2">
            {translations.login_page.legal_disclaimer}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
