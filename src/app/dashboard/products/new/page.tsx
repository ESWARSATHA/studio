
"use client";

import { useState, useEffect, useActionState } from 'react';
import Image from 'next/image';
import { handleGenerateDescription, handleRefineStory, handleSuggestPrice, handleGenerateImage } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Mic, Sparkles, UploadCloud, IndianRupee, Image as ImageIcon, Video, Box, Paintbrush, Scissors } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const initialState = { status: 'idle', message: '', data: null };
const initialImageState = { status: 'idle', message: '', data: null, errors: null };

export default function NewProductPage() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);

  const [descriptionState, descriptionAction] = useActionState(handleGenerateDescription, initialState);
  const [storyState, storyAction] = useActionState(handleRefineStory, initialState);
  const [priceState, priceAction] = useActionState(handleSuggestPrice, initialState);
  const [imageState, imageAction] = useActionState(handleGenerateImage, initialImageState);

  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isRefiningStory, setIsRefiningStory] = useState(false);
  const [isSuggestingPrice, setIsSuggestingPrice] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [story, setStory] = useState('');
  const [refinedStory, setRefinedStory] = useState('');
  const [imageGenDescription, setImageGenDescription] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImageDataUri(dataUri);
        setImagePreview(dataUri);
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
     if (!productName || !description) {
      toast({
        variant: 'destructive',
        title: 'Missing Details',
        description: 'Please provide a product name and description before refining the story.',
      });
      return;
    }
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', description);
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

  const onGenerateImage = () => {
    if (!imageGenDescription) {
      toast({
        variant: "destructive",
        title: "No Description",
        description: "Please enter a description for the image.",
      });
      return;
    }
    const formData = new FormData();
    formData.append('description', imageGenDescription);
    setIsGeneratingImage(true);
    imageAction(formData);
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
  
  useEffect(() => {
    if (imageState.status === 'success' && imageState.data?.imageDataUri) {
      setImagePreview(imageState.data.imageDataUri);
      setImageDataUri(imageState.data.imageDataUri);
      toast({
        title: "Image Generated!",
        description: "Your new product image is ready.",
      });
    } else if (imageState.status === 'error') {
      toast({
        variant: "destructive",
        title: "Image Generation Failed",
        description: imageState.message,
      });
    }
    setIsGeneratingImage(false);
  }, [imageState, toast]);

  return (
    <form className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1 grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
            <CardDescription>Upload a clear photo of your creation or generate one with AI.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             <div className="grid gap-2">
              <Label htmlFor="product-image" className="sr-only">Product Image</Label>
              <div className="w-full aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center relative overflow-hidden bg-secondary/50">
                {isGeneratingImage ? (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin" />
                    <p>Generating Image...</p>
                  </div>
                ) : imagePreview ? (
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
              Generate Description & Tags
            </Button>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>AI Image Generator</CardTitle>
                <CardDescription>Describe the image you want to create.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Textarea 
                    placeholder="e.g., 'A vibrant blue pottery vase from Jaipur, with traditional floral motifs...'"
                    value={imageGenDescription}
                    onChange={(e) => setImageGenDescription(e.target.value)}
                    rows={4}
                />
                <Button type="button" className="w-full" onClick={onGenerateImage} disabled={isGeneratingImage}>
                    {isGeneratingImage ? <Loader2 className="mr-2 animate-spin" /> : <ImageIcon className="mr-2" />}
                    Generate Image
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Video Showcase</CardTitle>
                <CardDescription>Add a video link (e.g., YouTube) to show your product in action.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
                <Label htmlFor="video-url" className="flex items-center gap-2"><Video/>Video URL</Label>
                <Input id="video-url" placeholder="https://youtube.com/watch?v=..."/>
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
                <CardTitle>Specifications</CardTitle>
                <CardDescription>Provide details about the materials, dimensions, and creation process.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="material" className="flex items-center gap-2"><Scissors/>Material</Label>
                    <Input id="material" placeholder="e.g., Sustainable Mango Wood, Jaipur Blue Pottery"/>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="dimensions" className="flex items-center gap-2"><Box/>Dimensions</Label>
                    <Input id="dimensions" placeholder="e.g., 12\" x 8\" x 5\""/>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="process" className="flex items-center gap-2"><Paintbrush/>Process</Label>
                    <Textarea id="process" placeholder="Describe how you made this product..." rows={3}/>
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
              <CardTitle>AI Storyteller</CardTitle>
              <CardDescription>Tell us the story behind your product, and our AI will polish it into a captivating narrative.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
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
             <Button type="button" size="sm" onClick={onRefineStory} disabled={!story || isRefiningStory} className="justify-self-end">
                {isRefiningStory ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                Refine with AI
            </Button>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" type="submit">Save Product</Button>
        </div>
      </div>
    </form>
  );
}
