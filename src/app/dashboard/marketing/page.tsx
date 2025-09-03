
"use client";

import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { handleGenerateMarketingCopy } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Megaphone, Wand2, Users, Mail, MessageSquare, ShoppingBag, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const products = [
  {
    name: "Hand-carved Wooden Elephant",
    description: "A magnificent elephant, hand-carved from a single block of sustainable mango wood, showcasing intricate details.",
    image: "https://picsum.photos/400/500?random=1",
    imageHint: "wooden elephant carving",
  },
  {
    name: "Blue Pottery Vase",
    description: "A vibrant blue pottery vase from Jaipur, featuring traditional floral motifs hand-painted by skilled artisans.",
    image: "https://picsum.photos/400/500?random=2",
    imageHint: "blue pottery vase",
  },
  {
    name: "Pattachitra Scroll Painting",
    description: "A stunning Pattachitra scroll from Odisha, depicting a tale from the Ramayana with natural pigments on cloth.",
    image: "https://picsum.photos/400/500?random=3",
    imageHint: "pattachitra scroll",
  },
  {
    name: "Terracotta Horse",
    description: "A rustic terracotta horse from Panchmura, Bengal, representing a timeless tradition of village pottery.",
    image: "https://picsum.photos/400/500?random=4",
    imageHint: "terracotta horse",
  },
];

const initialState = { status: 'idle', message: '', data: null, errors: null };

export default function MarketingPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(handleGenerateMarketingCopy, initialState);
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProduct) {
      toast({
        variant: "destructive",
        title: "No Product Selected",
        description: "Please choose a product to generate marketing copy.",
      });
      return;
    }
    const formData = new FormData();
    formData.append('productName', selectedProduct.name);
    formData.append('productDescription', selectedProduct.description);
    setIsGenerating(true);
    formAction(formData);
  };
  
  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Marketing Copy Generated!",
        description: "Your new marketing materials are ready.",
      });
    } else if (state.status === 'error') {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: state.message,
      });
    }
    setIsGenerating(false);
  }, [state, toast]);

  return (
    <div className="grid gap-8">
       <div className="text-center">
        <Megaphone className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">AI Marketing Hub</h1>
        <p className="mt-2 text-muted-foreground">Generate marketing materials, ad copy, and a sales strategy for your products.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select a Product</CardTitle>
          <CardDescription>Choose one of your products to create a marketing plan for.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
             <Select onValueChange={(value) => setSelectedProduct(products.find(p => p.name === value) || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product..." />
              </SelectTrigger>
              <SelectContent>
                {products.map(product => (
                  <SelectItem key={product.name} value={product.name}>{product.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" disabled={!selectedProduct || isGenerating} className="w-full sm:w-auto">
              {isGenerating ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
              Generate Marketing Plan
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {(isGenerating || state.data) && (
        <div className="grid gap-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                    <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full"><Users className="h-6 w-6 text-primary" /></div>
                        <CardTitle>Target Audience</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent>
                        {isGenerating && !state.data ? <Loader2 className="animate-spin text-muted-foreground" /> : <p className="text-sm text-muted-foreground">{state.data?.targetAudience}</p>}
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full"><Wand2 className="h-6 w-6 text-primary" /></div>
                        <CardTitle>Social Media Ad Preview</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent>
                        {isGenerating && !state.data ? <Loader2 className="animate-spin text-muted-foreground" /> : (
                            <div className="flex flex-col sm:flex-row gap-4 rounded-lg border bg-secondary/30 p-4">
                                <Image 
                                    src={selectedProduct?.image || ''}
                                    alt={selectedProduct?.name || 'Product Image'}
                                    width={150}
                                    height={150}
                                    className="rounded-md object-cover w-full sm:w-36 sm:h-36"
                                    data-ai-hint={selectedProduct?.imageHint}
                                />
                                <div className="flex-1 space-y-2">
                                    <h4 className="font-bold text-lg">{state.data?.headline}</h4>
                                    <p className="text-sm text-muted-foreground">{state.data?.body}</p>
                                    <Button className="w-full sm:w-auto">{state.data?.cta}</Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full"><MessageSquare className="h-6 w-6 text-primary" /></div>
                        <CardTitle>Social Media Post</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent>
                        {isGenerating && !state.data ? <Loader2 className="animate-spin text-muted-foreground" /> : <Textarea readOnly value={state.data?.socialMediaPost} rows={6} className="bg-secondary/50"/>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full"><Mail className="h-6 w-6 text-primary" /></div>
                        <CardTitle>Promotional Email</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent>
                    {isGenerating && !state.data ? <Loader2 className="animate-spin text-muted-foreground" /> : <Textarea readOnly value={state.data?.emailCopy} rows={6} className="bg-secondary/50"/>}
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-full"><ShoppingBag className="h-6 w-6 text-primary" /></div>
                    <CardTitle>Platform Recommendations</CardTitle>
                    <CardDescription>Where to sell your product online in India.</CardDescription>
                </div>
                </CardHeader>
                <CardContent className="grid gap-6">
                {isGenerating && !state.data ? (
                     <Loader2 className="animate-spin text-muted-foreground" />
                ) : state.data?.platformRecommendations?.map((rec: any, index: number) => (
                    <div key={index}>
                        <div className="flex items-center gap-3">
                            <Lightbulb className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold">{rec.platformName}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 ml-8">{rec.marketingTip}</p>
                        {index < state.data.platformRecommendations.length - 1 && <Separator className="mt-4" />}
                    </div>
                ))}
                </CardContent>
            </Card>
        </div>
      )}

    </div>
  );
}
