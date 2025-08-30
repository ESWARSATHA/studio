
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Tag, Flame } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const trendingProducts = [
  {
    name: "Jaipuri Block-Print Quilt",
    image: "https://picsum.photos/400/300?random=11",
    imageHint: "block print quilt",
  },
  {
    name: "Hand-Painted Pattachitra Saree",
    image: "https://picsum.photos/400/300?random=12",
    imageHint: "pattachitra saree",
  },
  {
    name: "Kutch Embroidered Jacket",
    image: "https://picsum.photos/400/300?random=13",
    imageHint: "embroidered jacket",
  },
  {
    name: "Chikankari Kurta Set",
    image: "https://picsum.photos/400/300?random=14",
    imageHint: "chikankari kurta",
  },
  {
    name: "Silver Filigree Earrings",
    image: "https://picsum.photos/400/300?random=15",
    imageHint: "silver earrings",
  },
];

const products = [
  {
    name: "Hand-carved Wooden Elephant",
    price: "₹2,499",
    description: "A magnificent elephant, hand-carved from a single block of sustainable mango wood, showcasing intricate details.",
    image: "https://picsum.photos/400/500?random=1",
    imageHint: "wooden elephant carving",
    rating: 4.8,
    reviews: 24,
  },
  {
    name: "Blue Pottery Vase",
    price: "₹1,899",
    description: "A vibrant blue pottery vase from Jaipur, featuring traditional floral motifs hand-painted by skilled artisans.",
    image: "https://picsum.photos/400/500?random=2",
    imageHint: "blue pottery vase",
    rating: 4.9,
    reviews: 18,
  },
    {
    name: "Pattachitra Scroll Painting",
    price: "₹3,999",
    description: "A stunning Pattachitra scroll from Odisha, depicting a tale from the Ramayana with natural pigments on cloth.",
    image: "https://picsum.photos/400/500?random=3",
    imageHint: "pattachitra scroll",
    rating: 5.0,
    reviews: 12,
  },
   {
    name: "Terracotta Horse",
    price: "₹1,299",
    description: "A rustic terracotta horse from Panchmura, Bengal, representing a timeless tradition of village pottery.",
    image: "https://picsum.photos/400/500?random=4",
    imageHint: "terracotta horse",
    rating: 4.7,
    reviews: 31,
  },
];


export default function DashboardPage() {
  return (
    <div className="grid gap-12">
       <div>
        <div className="flex items-center gap-2">
            <Flame className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Trending Now</h1>
        </div>
        <p className="text-muted-foreground">The latest and most popular designs on the platform.</p>
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
                    <CardHeader>
                      <CardTitle className="text-lg truncate">{product.name}</CardTitle>
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
        <h2 className="text-3xl font-bold tracking-tight">Your Creations</h2>
        <p className="text-muted-foreground">An overview of your listed products.</p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 -mt-6">
        {products.map((product) => (
          <Card key={product.name} className="flex flex-col overflow-hidden">
            <div className="relative">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={400} 
                height={500} 
                className="w-full h-64 object-cover"
                data-ai-hint={product.imageHint} 
              />
               <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm text-foreground font-semibold px-2 py-1 rounded-full text-xs">
                <Star className="w-3 h-3 text-primary fill-primary" />
                <span>{product.rating} ({product.reviews})</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-muted-foreground text-sm flex-1">{product.description}</p>
              <div className="flex items-center justify-between mt-4">
                 <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    <Tag className="w-4 h-4" />
                    <span>{product.price}</span>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

