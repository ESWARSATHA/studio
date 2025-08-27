
import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Inter, Laila, PT_Sans } from 'next/font/google';
import { LanguageProvider } from '@/lib/locales/language-context';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
 
const laila = Laila({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-laila',
  weight: ['300', '400', '500', '600', '700'],
})

const ptSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-sans',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Artisan',
  description: 'AI-powered tools for artisans',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${laila.variable} ${ptSans.variable}`}>
      <head />
      <body className="font-body antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
