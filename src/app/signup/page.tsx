
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useActionState, useEffect, useTransition } from 'react';
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
import { Eye, EyeOff, Globe, KeyRound, User, Loader2 } from 'lucide-react';
import { languages, useLanguage } from '@/lib/locales/language-context';
import { handleCreateAccount } from './actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const initialState = { status: 'idle' as const, message: '' };

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useActionState(handleCreateAccount, initialState);
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { language, setLanguage, translations } = useLanguage();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();


  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const generateStrongPassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const all = lower + upper + numbers + symbols;
    let newPassword = '';
    newPassword += lower[Math.floor(Math.random() * lower.length)];
    newPassword += upper[Math.floor(Math.random() * upper.length)];
    newPassword += numbers[Math.floor(Math.random() * numbers.length)];
    newPassword += symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = 4; i < 12; i++) {
      newPassword += all[Math.floor(Math.random() * all.length)];
    }
    newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
    setPassword(newPassword);
  };

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Account Created!",
        description: "Welcome to Artisan! You can now log in.",
      });
      router.push('/login');
    } else if (state.status === 'error') {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: state.message,
      });
    }
  }, [state, toast, router]);
  
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
          <CardTitle className="text-2xl">{translations.signup_page.title}</CardTitle>
          <CardDescription>
            {translations.signup_page.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            startTransition(() => {
              formAction(formData);
            })
          }}>
            <div className="grid gap-4">
              <div className="grid gap-2 items-center text-center">
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <div className="mx-auto h-24 w-24 rounded-full border-2 border-dashed flex items-center justify-center bg-secondary/50 hover:bg-secondary/80 transition-colors relative">
                          {avatarPreview ? (
                          <Image src={avatarPreview} alt="Avatar preview" fill className="rounded-full object-cover" />
                          ) : (
                          <User className="h-10 w-10 text-muted-foreground" />
                          )}
                      </div>
                  </Label>
                  <Input id="avatar-upload" name="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  <Label htmlFor="avatar-upload" className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-primary">
                      {translations.signup_page.avatar_label}
                  </Label>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="productCategory">{translations.signup_page.product_category_label}</Label>
                  <Select name="productCategory" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={translations.signup_page.product_category_placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paintings">{translations.signup_page.category_paintings}</SelectItem>
                    <SelectItem value="pottery">{translations.signup_page.category_pottery}</SelectItem>
                    <SelectItem value="textiles">{translations.signup_page.category_textiles}</SelectItem>
                    <SelectItem value="jewelry">{translations.signup_page.category_jewelry}</SelectItem>
                    <SelectItem value="woodcraft">{translations.signup_page.category_woodcraft}</SelectItem>
                    <SelectItem value="other">{translations.signup_page.category_other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">{translations.signup_page.address_label}</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder={translations.signup_page.address_placeholder}
                  required
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">{translations.signup_page.username_label}</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={translations.signup_page.username_placeholder}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{translations.signup_page.email_label}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={translations.signup_page.email_placeholder}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">{translations.signup_page.phone_label}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={translations.signup_page.phone_placeholder}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone2">{translations.signup_page.phone2_label}</Label>
                <Input
                  id="phone2"
                  name="phone2"
                  type="tel"
                  placeholder={translations.signup_page.phone2_placeholder}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">{translations.signup_page.create_password_label}</Label>
                  <Button type="button" variant="link" size="sm" className="p-0 h-auto" onClick={generateStrongPassword}>
                      <KeyRound className="mr-1" />
                      Suggest
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    name="confirmPassword"
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
              <Button type="submit" className="w-full" disabled={isPending}>
                 {isPending ? <Loader2 className="animate-spin" /> : translations.signup_page.create_account_button}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            {translations.signup_page.login_link.split('?')[0]}?{' '}
            <Link href="/login" className="underline">
              {translations.signup_page.login_link.split('?')[1]}
            </Link>
          </div>
           <div className="mt-4 text-center text-xs text-muted-foreground px-2">
            {translations.signup_page.legal_disclaimer}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
