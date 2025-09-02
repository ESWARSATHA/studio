
"use client";

import { useState, useEffect, useActionState } from 'react';
import Image from 'next/image';
import { handleGenerateDescription, handleRefineStory, handleSuggestPrice } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Mic, Sparkles, UploadCloud, IndianRupee } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const initialState = { status: 'idle', message: '', data: null };

export default function NewProductPage() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);

  const [descriptionState, descriptionAction] = useActionState(handleGenerateDescription, initialState);
  const [storyState, storyAction] = useActionState(handleRefineStory, initialState);
  const [priceState, priceAction] = useActionState(handleSuggestPrice, initialState);

  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isRefiningStory, setIsRefiningStory] = useState(false);
  const [isSuggestingPrice, setIsSuggestingPrice] = useState(false);

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [story, setStory] = useState('');
  const [refinedStory, setRefinedStory] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onGenerateDescription = () => {
    if (!imageDataUri) {
      toast({
        variant: "destructive",
        title: "No Image Selected",
        description: "Please upload an image first.",
      });
      return;
    }
    const formData = new FormData();
    formData.append('photoDataUri', imageDataUri);
    setIsGeneratingDesc(true);
    descriptionAction(formData);
  };

  const onRefineStory = () => {
    if (!story) {
       toast({
        variant: "destructive",
        title: "No Story Provided",
        description: "Please write your product story first.",
      });
      return;
    }
    const formData = new FormData();
    formData.append('story', story);
    setIsRefiningStory(true);
    storyAction(formData);
  };

  const onSuggestPrice = () => {
    if (!productName || !description) {
      toast({
        variant: 'destructive',
        title: 'Missing Details',
        description: 'Please provide a product name and description first.',
      });
      return;
    }
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', description);
    setIsSuggestingPrice(true);
    priceAction(formData);
  };
  
  useEffect(() => {
    if (descriptionState.status === 'success') {
      setDescription(descriptionState.data?.description || '');
      setTags(descriptionState.data?.tags?.join(', ') || '');
      toast({
        title: "Content Generated!",
        description: "Your product description and tags are ready.",
      });
    } else if (descriptionState.status === 'error') {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: descriptionState.message,
      });
    }
    setIsGeneratingDesc(false);
  }, [descriptionState, toast]);

  useEffect(() => {
    if (storyState.status === 'success') {
      setRefinedStory(storyState.data?.refinedStory || '');
       toast({
        title: "Story Refined!",
        description: "Your polished story is ready.",
      });
    } else if (storyState.status === 'error') {
       toast({
        variant: "destructive",
        title: "Refinement Failed",
        description: storyState.message,
      });
    }
    setIsRefiningStory(false);
  }, [storyState, toast]);

  useEffect(() => {
    if (priceState.status === 'success') {
      toast({
        title: 'Price Suggestion Ready!',
        description: 'We have a suggestion for your product price.',
      });
    } else if (priceState.status === 'error') {
      toast({
        variant: 'destructive',
        title: 'Suggestion Failed',
        description: priceState.message,
      });
    }
    setIsSuggestingPrice(false);
  }, [priceState, toast]);

  return (
    <form className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
            <CardDescription>Upload a clear photo of your creation.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             <div className="grid gap-2">
              <Label htmlFor="product-image" className="sr-only">Product Image</Label>
              <div className="w-full aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center relative overflow-hidden bg-secondary/50">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Product preview" fill style={{objectFit: "cover"}} />
                ) : (
                  <div className="text-center text-muted-foreground p-4">
                    <UploadCloud className="mx-auto h-12 w-12 mb-2" />
                    <p>Click to upload or drag & drop</p>
                  </div>
                )}
                 <Input id="product-image" type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>
            <Button type="button" className="w-full" onClick={onGenerateDescription} disabled={!imagePreview || isGeneratingDesc}>
              {isGeneratingDesc ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
              Generate with AI
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>AI-generated content will appear here. You can edit it before saving.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="e.g., Hand-carved Wooden Elephant" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="A detailed description of your product..." value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="e.g., handmade, woodcraft, eco-friendly" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>Set a price for your product. Get an AI suggestion based on market data.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
             <div className="grid gap-2 sm:grid-cols-3 sm:items-end">
                <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="price">Your Price (₹)</Label>
                    <Input id="price" type="number" placeholder="e.g., 2499" />
                </div>
                <Button type="button" variant="outline" onClick={onSuggestPrice} disabled={isSuggestingPrice}>
                    {isSuggestingPrice ? <Loader2 className="mr-2 animate-spin" /> : <IndianRupee className="mr-2" />}
                    Suggest Price
                </Button>
             </div>
             {(isSuggestingPrice || priceState.data) && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                        {isSuggestingPrice && !priceState.data ? (
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
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Product Story</CardTitle>
                    <CardDescription>Tell us the story behind your product.</CardDescription>
                </div>
                <Button type="button" size="sm" onClick={onRefineStory} disabled={!story || isRefiningStory}>
                    {isRefiningStory ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                    Refine Story
                </Button>
            </div>
        </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="story" className="flex items-center">
                <Mic className="mr-2 h-4 w-4" />
                Your Story (Dictate or Type)
              </Label>
              <Textarea id="story" placeholder="e.g., This elephant was carved from a fallen mango tree in my village..." value={story} onChange={(e) => setStory(e.target.value)} rows={8} />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="refined-story" className="flex items-center">
                <Wand2 className="mr-2 h-4 w-4 text-primary" />
                AI-Refined Story
              </Label>
              <Textarea id="refined-story" placeholder="AI-polished version will appear here..." value={refinedStory} onChange={(e) => setRefinedStory(e.target.value)} rows={8} className="bg-primary/5 focus:bg-background"/>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" type="submit">Save Product</Button>
        </div>
      </div>
    </form>
  );
}
