
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IndianRupee, Star, Video, Scissors, Paintbrush, Heart, Box } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import placeholderImages from '@/lib/placeholder-images.json';

const { products } = placeholderImages.productDetail;

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2 grid gap-8">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          className="rounded-lg shadow-lg object-cover w-full aspect-square"
          data-ai-hint={product.imageHint}
        />
         <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Video className="h-6 w-6 text-primary"/>
                    <CardTitle>Artisan's Video Showcase</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="aspect-video">
                    <iframe
                        className="w-full h-full rounded-md"
                        src={product.videoUrl}
                        title="Product Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 flex flex-col gap-8">
         <Card>
            <CardContent className="pt-6 flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-primary">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{product.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <p className="text-md text-muted-foreground">{product.description}</p>
                <div className="flex items-center gap-2 text-3xl font-bold text-primary">
                    <IndianRupee />
                    <span>{product.price.toLocaleString()}</span>
                </div>
                 <Button size="lg">Add to Cart</Button>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
                <div className="flex items-start gap-3">
                    <Scissors className="h-5 w-5 text-primary mt-1"/>
                    <div>
                        <h4 className="font-semibold">Material</h4>
                        <p className="text-muted-foreground">{product.material}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Box className="h-5 w-5 text-primary mt-1"/>
                    <div>
                        <h4 className="font-semibold">Dimensions</h4>
                        <p className="text-muted-foreground">{product.dimensions}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <Paintbrush className="h-5 w-5 text-primary mt-1"/>
                    <div>
                        <h4 className="font-semibold">Process</h4>
                        <p className="text-muted-foreground">{product.process}</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-primary"/>
                    <CardTitle>Artisan's Story</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground italic">"{product.story}"</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
