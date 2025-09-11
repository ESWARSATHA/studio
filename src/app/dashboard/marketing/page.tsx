
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
import { useLanguage } from "@/lib/locales/language-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import placeholderImages from '@/lib/placeholder-images.json';

const { products } = placeholderImages.marketing;

const initialState = { status: 'idle', message: '', data: null, errors: null };

export default function MarketingPage() {
  const { toast } = useToast();
  const { translations } = useLanguage();
  const pageTranslations = translations.marketing_page || {};

  const [state, formAction] = useActionState(handleGenerateMarketingCopy, initialState);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productImageHint, setProductImageHint] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);

  const handleProductSelect = (value: string) => {
    const product = products.find(p => p.name === value);
    if (product) {
      setSelectedProductName(product.name);
      setProductName(product.name);
      setProductDescription(product.description);
      setProductImage(product.image);
      setProductImageHint(product.imageHint);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!productName || !productDescription) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both a product name and description.",
      });
      return;
    }
    const formData = new FormData(event.currentTarget);
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
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{pageTranslations.title}</h1>
        <p className="mt-2 text-muted-foreground">{pageTranslations.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{pageTranslations.select_card_title}</CardTitle>
          <CardDescription>{pageTranslations.select_card_description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
                <Label htmlFor="product-select">Select a Product (Optional)</Label>
                <Select onValueChange={handleProductSelect}>
                <SelectTrigger id="product-select">
                    <SelectValue placeholder="Or start from a sample..." />
                </SelectTrigger>
                <SelectContent>
                    {products.map(product => (
                    <SelectItem key={product.name} value={product.name}>{product.name}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                id="productName"
                name="productName"
                placeholder="e.g., Hand-carved Wooden Elephant"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                />
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="productDescription">Product Description</Label>
                <Textarea
                id="productDescription"
                name="productDescription"
                placeholder="Describe your product's key features and unique qualities."
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
                rows={4}
                />
            </div>

            <Button type="submit" disabled={isGenerating} className="w-full sm:w-auto justify-self-end">
              {isGenerating ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
              {pageTranslations.generate_button}
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
                        <CardTitle>{pageTranslations.audience_card_title}</CardTitle>
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
                        <CardTitle>{pageTranslations.ad_preview_card_title}</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent>
                        {isGenerating && !state.data ? <Loader2 className="animate-spin text-muted-foreground" /> : (
                            <div className="flex flex-col sm:flex-row gap-4 rounded-lg border bg-secondary/30 p-4">
                                <Image 
                                    src={productImage || 'https://picsum.photos/seed/placeholder/400/300'}
                                    alt={productName || 'Product Image'}
                                    width={150}
                                    height={150}
                                    className="rounded-md object-cover w-full sm:w-36 sm:h-36"
                                    data-ai-hint={productImageHint || 'custom product'}
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
                        <CardTitle>{pageTranslations.post_card_title}</CardTitle>
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
                        <CardTitle>{pageTranslations.email_card_title}</CardTitle>
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
                    <CardTitle>{pageTranslations.platform_card_title}</CardTitle>
                </div>
                <CardDescription>{pageTranslations.platform_card_description}</CardDescription>
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
