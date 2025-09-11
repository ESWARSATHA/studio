
'use client';

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, IndianRupee, Flame, LayoutGrid, ShoppingCart, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLanguage } from '@/lib/locales/language-context';
import placeholderImages from '@/lib/placeholder-images.json';

const { trendingProducts, userCreations, featuredArt } = placeholderImages.dashboard;

const ProductCard = ({ product }: { product: typeof userCreations[0] }) => (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <Link href={`/dashboard/products/${product.id}`} className="flex flex-col h-full">
            <div className="relative">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                    data-ai-hint={product.imageHint}
                />
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm text-foreground font-semibold px-2 py-1 rounded-full text-xs">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span>{product.rating} ({product.reviews})</span>
                </div>
            </div>
            <CardHeader className="p-4">
                <CardTitle className="text-base font-semibold truncate">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground text-sm flex-1 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 text-lg font-bold text-primary">
                        <IndianRupee className="w-4 h-4" />
                        <span>{product.price.toLocaleString()}</span>
                    </div>
                    <Button variant="outline" size="sm">
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Link>
    </Card>
);

const BuyerDashboard = () => {
    const { translations } = useLanguage();
    const dashboardTranslations = translations.dashboard_page || {};

    return (
        <div className="grid gap-12">
             <section>
                <div className="grid md:grid-cols-2 gap-8 items-center bg-primary/10 p-8 rounded-lg">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground">{featuredArt.title}</h1>
                        <p className="mt-4 text-lg text-primary-foreground/80">{featuredArt.description}</p>
                        <Button asChild size="lg" className="mt-6">
                            <Link href={`/dashboard/products/${featuredArt.id}`}>
                                Discover Now <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                    <Image
                        src={featuredArt.image}
                        alt={featuredArt.title}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-xl object-cover w-full h-full"
                        data-ai-hint={featuredArt.imageHint}
                    />
                </div>
            </section>
            
            <section>
                <div className="flex items-center gap-3">
                    <Flame className="h-7 w-7 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">{dashboardTranslations.trending_title}</h2>
                </div>
                <p className="text-muted-foreground">{dashboardTranslations.trending_description}</p>
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full mt-6"
                >
                  <CarouselContent>
                    {trendingProducts.map((product, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                         <Card className="overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover"
                              data-ai-hint={product.imageHint}
                            />
                            <CardHeader className="p-3">
                              <CardTitle className="text-base font-semibold truncate">{product.name}</CardTitle>
                            </CardHeader>
                          </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </section>

            <section>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Discover Handcrafted Art</h2>
                        <p className="text-muted-foreground">Explore unique creations from talented artisans across India.</p>
                    </div>
                    <Button variant="link">View All <ArrowRight className="ml-2"/></Button>
                </div>
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    {userCreations.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

const ArtisanDashboard = () => {
    const { translations } = useLanguage();
    const dashboardTranslations = translations.dashboard_page || {};

    return (
        <div className="grid gap-12">
            <div className="text-center">
                <LayoutGrid className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight">{dashboardTranslations.title}</h1>
                <p className="mt-2 text-muted-foreground">{dashboardTranslations.description}</p>
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <Flame className="h-7 w-7 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">{dashboardTranslations.trending_title}</h2>
                </div>
                <p className="text-muted-foreground">{dashboardTranslations.trending_description}</p>
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full mt-6"
                >
                  <CarouselContent>
                    {trendingProducts.map((product, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                         <Card className="overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover"
                              data-ai-hint={product.imageHint}
                            />
                            <CardHeader className="p-3">
                              <CardTitle className="text-base font-semibold truncate">{product.name}</CardTitle>
                            </CardHeader>
                          </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>

            <div>
                <h2 className="text-3xl font-bold tracking-tight">{dashboardTranslations.creations_title}</h2>
                <p className="text-muted-foreground">{dashboardTranslations.creations_description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 -mt-6">
                {userCreations.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const userType = searchParams.get('userType') || 'artisan';

    if (userType === 'buyer') {
        return <BuyerDashboard />;
    }
    return <ArtisanDashboard />;
}
