import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Bot, Image as ImageIcon, Mic } from 'lucide-react';
import { Logo } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-headline">Artisan</span>
        </Link>
        <nav>
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
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-foreground">
              Empower Your Craft with <span className="text-primary">AI</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              Artisan provides intelligent tools to help you describe, narrate, and sell your unique creations. Focus on your art, we'll handle the words.
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
              <h2 className="text-3xl font-headline font-bold">Features for the Modern Artisan</h2>
              <p className="mt-4 text-muted-foreground">
                From image to story, our AI is trained to showcase the soul of your work.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">AI Image Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Upload a photo of your product and instantly get a compelling description and relevant tags.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Mic className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Voice-to-Story</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Simply tell the story of your piece, and our AI will refine it into a polished, captivating narrative.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Smart Analytics</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Get insights on how customers are interacting with your products to help you grow your business.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-headline font-bold">Flexible &amp; Secure Payments</h2>
              <p className="mt-4 text-muted-foreground">
                We support a wide range of payment methods to make transactions seamless for everyone. All transactions are secure and compliant with Indian regulations.
              </p>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <div className="flex flex-wrap justify-center items-center gap-8">
                <Image src="https://placehold.co/100x40.png" alt="UPI Logo" width={100} height={40} data-ai-hint="upi logo" />
                <Image src="https://placehold.co/100x40.png" alt="Visa Logo" width={100} height={40} data-ai-hint="visa logo" />
                <Image src="https://placehold.co/100x40.png" alt="Mastercard Logo" width={100} height={40} data-ai-hint="mastercard logo" />
                <Image src="https://placehold.co/100x40.png" alt="Rupay Logo" width={100} height={40} data-ai-hint="rupay logo" />
              </div>
               <p className="mt-4 text-muted-foreground text-sm">...and many more UPI, credit, and debit card options.</p>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold">Celebrating Indian Art & Culture</h2>
                    <p className="mt-4 text-muted-foreground">
                        India has a rich and diverse cultural heritage, and its art is a vibrant expression of this history. From intricate paintings to detailed sculptures and beautiful textiles, Indian art tells stories of mythology, spirituality, and daily life. This platform is dedicated to supporting the talented artisans who keep these traditions alive.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <Card className="overflow-hidden">
                        <Image src="https://placehold.co/600x400.png" alt="Madhubani painting" width={600} height={400} className="w-full h-48 object-cover" data-ai-hint="madhubani painting" />
                        <CardHeader>
                            <CardTitle className="font-headline">Madhubani Painting</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Originating from the Mithila region, these paintings are known for their complex geometrical patterns and symbolic imagery.</p>
                        </CardContent>
                    </Card>
                    <Card className="overflow-hidden">
                        <Image src="https://placehold.co/600x400.png" alt="Warli art" width={600} height={400} className="w-full h-48 object-cover" data-ai-hint="warli art" />
                        <CardHeader>
                            <CardTitle className="font-headline">Warli Art</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">A tribal art form from Maharashtra, characterized by its simple, monosyllabic vocabulary depicting scenes of human life.</p>
                        </CardContent>
                    </Card>
                    <Card className="overflow-hidden">
                         <Image src="https://placehold.co/600x400.png" alt="Pattachitra art" width={600} height={400} className="w-full h-48 object-cover" data-ai-hint="pattachitra art" />
                        <CardHeader>
                            <CardTitle className="font-headline">Pattachitra</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">A traditional cloth-based scroll painting from Odisha, known for its intricate details and mythological narratives.</p>
                        </CardContent>
                    </Card>
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
