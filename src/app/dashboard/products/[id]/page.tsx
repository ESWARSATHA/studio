
"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IndianRupee, ShoppingCart, Star, Video, Scissors, Paintbrush, Heart, Box, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Hand-carved Wooden Elephant",
    price: 2499,
    description: "A magnificent elephant, hand-carved from a single block of sustainable mango wood, showcasing intricate details. This piece is a testament to the artisan's skill, passed down through generations.",
    image: "https://picsum.photos/800/800?random=1",
    imageHint: "wooden elephant carving",
    rating: 4.8,
    reviews: 24,
    material: "Sustainable Mango Wood",
    dimensions: '12" x 8" x 5"',
    process: "Hand-carved by master artisans in Rajasthan using traditional tools and techniques.",
    story: "This elephant was carved from a fallen mango tree in my village. It represents strength, wisdom, and good fortune, and I pour my heart into every detail to bring those qualities to life.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
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
    material: "Jaipur Blue Pottery (Quartz-based clay)",
    dimensions: '10" height, 5" diameter',
    process: "Hand-thrown on the potter's wheel, hand-painted with natural pigments, and low-fired.",
    story: "The motifs on this vase are inspired by the gardens of the Amer Fort. Each brushstroke is a memory of the vibrant flowers I saw there as a child. It's a piece of my history.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
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
    material: "Tussar silk cloth, natural mineral and plant-based pigments.",
    dimensions: '36" x 18"',
    process: "The canvas is prepared with tamarind seed paste. The painting is done with fine brushes and natural colors, followed by a lacquer finish for longevity.",
    story: "This scroll tells the story of Sita's abduction, a powerful moment in the Ramayana. I chose this scene to capture the emotion and drama of our epic tales for a new generation.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
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
    material: "Riverbed Clay (Terracotta)",
    dimensions: '15" height',
    process: "Shaped by hand and with simple tools, sun-dried, and then fired in a traditional kiln, giving it its characteristic earthy color.",
    story: "The Bankura horse is a symbol of devotion in my community. We have been making them for centuries as offerings. This horse carries the prayers and hopes of my ancestors.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
];

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
          className="rounded-lg shadow-lg object-cover w-full aspect-video"
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
                        <Star className="w-5 h-5 fill-primary" />
                        <span className="font-bold">{product.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <p className="text-md text-muted-foreground">{product.description}</p>
                <div className="flex items-center gap-2 text-3xl font-bold text-primary">
                    <IndianRupee />
                    <span>{product.price.toLocaleString()}</span>
                </div>
                {userType === 'buyer' && (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="lg" className="flex-1">
                            <ShoppingCart className="mr-2" />
                            Add to Cart
                        </Button>
                        <Button size="lg" variant="default" className="flex-1">
                            <Zap className="mr-2" />
                            Buy Now
                        </Button>
                    </div>
                )}
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
