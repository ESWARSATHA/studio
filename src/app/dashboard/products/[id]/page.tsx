
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IndianRupee, ShoppingCart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Hand-carved Wooden Elephant",
    price: 2499,
    description: "A magnificent elephant, hand-carved from a single block of sustainable mango wood, showcasing intricate details. This piece is a testament to the artisan's skill, passed down through generations. Each carving tells a unique story, making it a perfect centerpiece for any home.",
    image: "https://picsum.photos/800/800?random=1",
    imageHint: "wooden elephant carving",
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    name: "Blue Pottery Vase",
    price: 1899,
    description: "A vibrant blue pottery vase from Jaipur, featuring traditional floral motifs hand-painted by skilled artisans. The striking cobalt blue is derived from a special mixture of quartz stone powder, powdered glass, and other natural ingredients, making each vase a unique work of art.",
    image: "https://picsum.photos/800/800?random=2",
    imageHint: "blue pottery vase",
    rating: 4.9,
    reviews: 18,
  },
    {
    id: 3,
    name: "Pattachitra Scroll Painting",
    price: 3999,
    description: "A stunning Pattachitra scroll from Odisha, depicting a tale from the Ramayana with natural pigments on cloth. The intricate details and vibrant colors are achieved through a meticulous process of painting with fine brushes made from squirrel hair.",
    image: "https://picsum.photos/800/800?random=3",
    imageHint: "pattachitra scroll",
    rating: 5.0,
    reviews: 12,
  },
   {
    id: 4,
    name: "Terracotta Horse",
    price: 1299,
    description: "A rustic terracotta horse from Panchmura, Bengal, representing a timeless tradition of village pottery. These horses are known for their unique, elongated necks and are traditionally offered to local deities. Each piece is handcrafted and fired in a traditional kiln.",
    image: "https://picsum.photos/800/800?random=4",
    imageHint: "terracotta horse",
    rating: 4.7,
    reviews: 31,
  },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          className="rounded-lg shadow-lg object-cover w-full aspect-square"
          data-ai-hint={product.imageHint}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-primary">
                <Star className="w-5 h-5 fill-primary" />
                <span className="font-bold">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
        </div>
        <p className="text-lg text-muted-foreground">{product.description}</p>
        <div className="flex items-center gap-2 text-3xl font-bold text-primary">
            <IndianRupee />
            <span>{product.price.toLocaleString()}</span>
        </div>
        <Button size="lg" className="w-full md:w-auto">
          <ShoppingCart className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
