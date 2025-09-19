
"use client";

import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { IndianRupee, Star, Video, Scissors, Paintbrush, Heart, Box, MessageSquare, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import placeholderImages from '@/lib/placeholder-images.json';
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const { products, reviews } = placeholderImages.productDetail;

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = products.find(p => p.id === parseInt(id));
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType') || 'artisan';

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
                    <Heart className="h-6 w-6 text-primary"/>
                    <CardTitle>Artisan's Story</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground italic">"{product.story}"</p>
                 <div className="flex items-center gap-4 mt-4">
                    <Avatar>
                        <AvatarImage src={product.artisan.avatar} alt={product.artisan.name} data-ai-hint={product.artisan.imageHint} />
                        <AvatarFallback>{product.artisan.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{product.artisan.name}</p>
                        <p className="text-sm text-muted-foreground">{product.artisan.specialty}</p>
                    </div>
                </div>
            </CardContent>
        </Card>

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

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-primary"/>
                <CardTitle>Customer Reviews & Feedback</CardTitle>
            </div>
            <CardDescription>See what others are saying about this creation.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-primary text-2xl">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-base text-muted-foreground">/ 5</span>
                </div>
                 <p className="text-muted-foreground text-sm">Based on {product.reviews} reviews</p>
            </div>
            <Separator/>
            <div className="grid gap-6">
                {reviews.map((review, index) => (
                    <div key={index} className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.imageHint} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">{review.name}</p>
                                <div className="flex items-center gap-1 text-xs">
                                   {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                                   {[...Array(5-review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-muted-foreground/30" />)}
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm mt-1">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
            {userType === 'buyer' && (
                <>
                <Separator/>
                <div>
                    <h4 className="font-semibold mb-2">Leave your feedback</h4>
                    <form className="grid gap-4">
                        <Textarea placeholder="Share your thoughts on this piece..." rows={4} />
                        <Button className="justify-self-end">
                            <Send className="mr-2"/>
                            Submit Feedback
                        </Button>
                    </form>
                </div>
                </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 flex flex-col gap-8">
         <Card className="sticky top-24">
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
      </div>
    </div>
  );
}
