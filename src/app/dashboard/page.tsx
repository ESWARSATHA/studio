
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Tag } from "lucide-react";

const products = [
  {
    name: "Hand-carved Wooden Elephant",
    price: "₹2,499",
    description: "A magnificent elephant, hand-carved from a single block of sustainable mango wood, showcasing intricate details.",
    image: "https://placehold.co/600x400.png",
    imageHint: "wooden elephant carving",
    rating: 4.8,
    reviews: 24,
  },
  {
    name: "Blue Pottery Vase",
    price: "₹1,899",
    description: "A vibrant blue pottery vase from Jaipur, featuring traditional floral motifs hand-painted by skilled artisans.",
    image: "https://placehold.co/600x400.png",
    imageHint: "blue pottery vase",
    rating: 4.9,
    reviews: 18,
  },
    {
    name: "Pattachitra Scroll Painting",
    price: "₹3,999",
    description: "A stunning Pattachitra scroll from Odisha, depicting a tale from the Ramayana with natural pigments on cloth.",
    image: "https://placehold.co/600x400.png",
    imageHint: "pattachitra scroll",
    rating: 5.0,
    reviews: 12,
  },
   {
    name: "Terracotta Horse",
    price: "₹1,299",
    description: "A rustic terracotta horse from Panchmura, Bengal, representing a timeless tradition of village pottery.",
    image: "https://placehold.co/600x400.png",
    imageHint: "terracotta horse",
    rating: 4.7,
    reviews: 31,
  },
];


export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Creations</h1>
        <p className="text-muted-foreground">An overview of your listed products.</p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.name} className="flex flex-col overflow-hidden">
            <div className="relative">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={600} 
                height={400} 
                className="w-full h-48 object-cover"
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
