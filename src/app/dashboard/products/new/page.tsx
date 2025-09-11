
"use client";

import { useState, useEffect, useActionState, useTransition, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { handleGenerateDescription, handleRefineStory, handleSuggestPrice, handleGenerateImage } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Mic, Sparkles, UploadCloud, IndianRupee, Image as ImageIcon, Video, Box, Paintbrush, Scissors, PlusCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/lib/locales/language-context';

type ProductState = {
  name: string;
  description: string;
  tags: string;
  material: string;
  dimensions: string;
  process: string;
  story: string;
  refinedStory: string;
  price: string;
  videoUrl: string;
  imageDataUri: string | null;
  imagePreview: string | null;
  imageGenDescription: string;
};

const initialProductState: ProductState = {
  name: '',
  description: '',
  tags: '',
  material: '',
  dimensions: '',
  process: '',
  story: '',
  refinedStory: '',
  price: '',
  videoUrl: '',
  imageDataUri: null,
  imagePreview: null,
  imageGenDescription: ''
};

const initialActionState = { status: 'idle' as const, message: '', data: null, errors: null, type: '' };

export default function NewProductPage() {
  const { toast } = useToast();
  const { translations } = useLanguage();
  const pageTranslations = translations.new_product_page || {};

  const [product, setProduct] = useState<ProductState>(initialProductState);
  
  const [actionState, formAction] = useActionState(handleGenerateDescription, initialActionState);
  const [storyState, storyAction] = useActionState(handleRefineStory, initialActionState);
  const [priceState, priceAction] = useActionState(handleSuggestPrice, initialActionState);
  const [imageState, imageAction] = useActionState(handleGenerateImage, initialActionState);

  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setProduct(prev => ({ ...prev, imageDataUri: dataUri, imagePreview: dataUri }));
      };
      reader.readAsDataURL(file);
    }
  };

  const runAction = (action: (formData: FormData) => void, formData: FormData) => {
    startTransition(() => {
        action(formData);
    });
  };

  useEffect(() => {
    const states = [actionState, storyState, priceState, imageState];
    const currentState = states.find(s => s.status !== 'idle');

    if (currentState?.status === 'success') {
      switch(currentState.type) {
        case 'description':
          setProduct(p => ({ ...p, description: currentState.data.description, tags: currentState.data.tags.join(', ') }));
          toast({ title: "Content Generated!", description: "Your product description and tags are ready." });
          break;
        case 'story':
          setProduct(p => ({ ...p, refinedStory: currentState.data.refinedStory }));
          toast({ title: "Story Refined!", description: "Your polished story is ready." });
          break;
        case 'price':
           toast({ title: "Price Suggestion Ready!", description: "We have a suggestion for your product price." });
          break;
        case 'image':
          const newImageDataUri = currentState.data.imageDataUri;
          setProduct(p => ({ ...p, imagePreview: newImageDataUri, imageDataUri: newImageDataUri }));
          toast({ title: "Image Generated!", description: "Your new product image is ready." });
          break;
      }
    } else if (currentState?.status === 'error') {
       toast({ variant: "destructive", title: "Action Failed", description: currentState.message });
    }

  }, [actionState, storyState, priceState, imageState, toast]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Showcase Saved!",
      description: "Your product showcase has been successfully saved as a draft.",
    });
  };

  return (
    <div className="grid gap-8">
      <div className="text-center">
        <PlusCircle className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{translations.dashboard_layout.menu_add_product}</h1>
        <p className="mt-2 text-muted-foreground">This is your workshop. Practice creating compelling product showcases to attract customers.</p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 grid gap-8 content-start">
            <Card>
              <CardHeader>
                <CardTitle>{pageTranslations.image_card_title}</CardTitle>
                <CardDescription>{pageTranslations.image_card_description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="product-image" className="sr-only">Product Image</Label>
                  <div className="w-full aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center relative overflow-hidden bg-secondary/50">
                    {isPending && imageState.status === 'idle' ? (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-12 w-12 animate-spin" />
                        <p>Generating Image...</p>
                      </div>
                    ) : product.imagePreview ? (
                      <Image src={product.imagePreview} alt="Product preview" fill style={{ objectFit: "cover" }} />
                    ) : (
                      <div className="text-center text-muted-foreground p-4">
                        <UploadCloud className="mx-auto h-12 w-12 mb-2" />
                        <p>Click to upload or drag & drop</p>
                      </div>
                    )}
                    <Input id="product-image" type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                </div>
                <Button type="button" className="w-full" onClick={() => {
                  if (!product.imageDataUri) return toast({ variant: "destructive", title: "No Image Selected", description: "Please upload an image first." });
                  const fd = new FormData();
                  fd.append('photoDataUri', product.imageDataUri);
                  runAction(formAction, fd);
                }} disabled={isPending || !product.imageDataUri}>
                  {isPending && actionState.status !== 'idle' ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
                  {pageTranslations.generate_desc_button}
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{pageTranslations.image_gen_card_title}</CardTitle>
                <CardDescription>{pageTranslations.image_gen_card_description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Textarea
                  name="imageGenDescription"
                  placeholder="e.g., 'A vibrant blue pottery vase from Jaipur...'"
                  value={product.imageGenDescription}
                  onChange={handleInputChange}
                  rows={4}
                />
                <Button type="button" className="w-full" onClick={() => {
                   if (!product.imageGenDescription) return toast({ variant: "destructive", title: "No Description", description: "Please enter a description for the image." });
                   const fd = new FormData();
                   fd.append('description', product.imageGenDescription);
                   runAction(imageAction, fd);
                }} disabled={isPending || !product.imageGenDescription}>
                  {isPending && imageState.status !== 'idle' ? <Loader2 className="mr-2 animate-spin" /> : <ImageIcon className="mr-2" />}
                  {pageTranslations.image_gen_button}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 md:col-span-2 content-start">
            <Card>
              <CardHeader>
                <CardTitle>{pageTranslations.details_card_title}</CardTitle>
                <CardDescription>{pageTranslations.details_card_description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" placeholder="e.g., Hand-carved Wooden Elephant" value={product.name} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="AI-generated description will appear here..." value={product.description} onChange={handleInputChange} rows={5} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" name="tags" placeholder="e.g., handmade, woodcraft, eco-friendly" value={product.tags} onChange={handleInputChange} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{pageTranslations.specs_card_title}</CardTitle>
                <CardDescription>{pageTranslations.specs_card_description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="material" className="flex items-center gap-2"><Scissors />Material</Label>
                  <Input id="material" name="material" placeholder="e.g., Sustainable Mango Wood, Jaipur Blue Pottery" value={product.material} onChange={handleInputChange}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dimensions" className="flex items-center gap-2"><Box />Dimensions</Label>
                  <Input id="dimensions" name="dimensions" placeholder='e.g., 12" x 8" x 5"' value={product.dimensions} onChange={handleInputChange}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="process" className="flex items-center gap-2"><Paintbrush />Process</Label>
                  <Textarea id="process" name="process" placeholder="Describe how you made this product..." value={product.process} onChange={handleInputChange} rows={3} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{pageTranslations.story_card_title}</CardTitle>
                <CardDescription>{pageTranslations.story_card_description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="story" className="flex items-center">
                    <Mic className="mr-2 h-4 w-4" />
                    Your Story (Dictate or Type)
                  </Label>
                  <Textarea id="story" name="story" placeholder="e.g., This elephant was carved from a fallen mango tree..." value={product.story} onChange={handleInputChange} rows={8} />
                </div>
                 <Button type="button" size="sm" onClick={() => {
                    if (!product.story) return toast({ variant: "destructive", title: "No Story Provided", description: "Please write your product story first." });
                    if (!product.name || !product.description) return toast({ variant: 'destructive', title: 'Missing Details', description: 'Please provide a product name and description.' });
                    const fd = new FormData();
                    fd.append('productName', product.name);
                    fd.append('productDescription', product.description);
                    fd.append('story', product.story);
                    runAction(storyAction, fd);
                 }} disabled={isPending || !product.story} className="justify-self-end">
                  {isPending && storyState.status !== 'idle' ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                  {pageTranslations.story_button}
                </Button>
                <div className="grid gap-2">
                  <Label htmlFor="refined-story" className="flex items-center">
                    <Wand2 className="mr-2 h-4 w-4 text-primary" />
                    AI-Refined Story
                  </Label>
                  <Textarea id="refinedStory" name="refinedStory" placeholder="AI-polished version will appear here..." value={product.refinedStory} onChange={handleInputChange} rows={8} className="bg-primary/5 focus:bg-background" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{pageTranslations.pricing_card_title}</CardTitle>
                <CardDescription>{pageTranslations.pricing_card_description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-2 sm:grid-cols-3 sm:items-end">
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="price">Your Price (₹)</Label>
                    <Input id="price" name="price" type="number" placeholder="e.g., 2499" value={product.price} onChange={handleInputChange} />
                  </div>
                  <Button type="button" variant="outline" onClick={() => {
                     if (!product.name || !product.description) return toast({ variant: 'destructive', title: 'Missing Details', description: 'Please provide a product name and description first.' });
                     const fd = new FormData();
                     fd.append('productName', product.name);
                     fd.append('productDescription', product.description);
                     runAction(priceAction, fd);
                  }} disabled={isPending}>
                    {isPending && priceState.status !== 'idle' ? <Loader2 className="mr-2 animate-spin" /> : <IndianRupee className="mr-2" />}
                    {pageTranslations.price_button}
                  </Button>
                </div>
                {(isPending && priceState.status !== 'idle' || priceState.data) && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                      {isPending && priceState.status !== 'idle' ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="animate-spin" />
                          <p>Analyzing market data...</p>
                        </div>
                      ) : priceState.data && (
                        <div>
                          <p className="font-semibold text-primary-foreground">
                            Suggested Price: ₹{priceState.data.suggestedPriceRange.min.toLocaleString()} - ₹{priceState.data.suggestedPriceRange.max.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">{priceState.data.reasoning}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{pageTranslations.video_card_title}</CardTitle>
                <CardDescription>{pageTranslations.video_card_description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Label htmlFor="videoUrl" className="flex items-center gap-2"><Video />Video URL</Label>
                <Input id="videoUrl" name="videoUrl" placeholder="https://youtube.com/watch?v=..." value={product.videoUrl} onChange={handleInputChange} />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button size="lg" type="submit">Save Showcase</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
