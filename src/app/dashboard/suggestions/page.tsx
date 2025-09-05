
"use client";

import { useActionState, useEffect, useState } from "react";
import { handleGenerateSuggestions } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lightbulb, Wand2, Package, DraftingCompass, Users, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/locales/language-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const products = [
  {
    name: "Hand-carved Wooden Elephant",
    description: "A magnificent elephant, hand-carved from a single block of sustainable mango wood, showcasing intricate details.",
    category: "Woodcraft",
  },
  {
    name: "Blue Pottery Vase",
    description: "A vibrant blue pottery vase from Jaipur, featuring traditional floral motifs hand-painted by skilled artisans.",
    category: "Pottery",
  },
  {
    name: "Pattachitra Scroll Painting",
    description: "A stunning Pattachitra scroll from Odisha, depicting a tale from the Ramayana with natural pigments on cloth.",
    category: "Paintings",
  },
  {
    name: "Terracotta Horse",
    description: "A rustic terracotta horse from Panchmura, Bengal, representing a timeless tradition of village pottery.",
    category: "Pottery",
  },
   {
    name: "Kalamkari Textile Wall Hanging",
    description: "A beautiful wall hanging featuring intricate Kalamkari art, hand-painted using a traditional pen with natural dyes.",
    category: "Textiles",
  },
  {
    name: "Dokra Brass Human Figurine",
    description: "A unique human figurine crafted using the ancient Dokra metal casting technique, which is over 4,000 years old.",
    category: "Metalwork",
  }
];

const initialState = { status: 'idle', message: '', data: null, errors: null };

export default function SuggestionsPage() {
  const { toast } = useToast();
  const { translations } = useLanguage();
  const pageTranslations = translations.suggestions_page || {};

  const [state, formAction] = useActionState(handleGenerateSuggestions, initialState);
  
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProductSelect = (value: string) => {
    const product = products.find(p => p.name === value);
    if (product) {
      setProductName(product.name);
      setProductDescription(product.description);
      setProductCategory(product.category);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!productName || !productDescription || !productCategory) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide a product name, description, and category.",
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
        title: "Suggestions Generated!",
        description: "Your new creative ideas are ready.",
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
        <Lightbulb className="mx-auto h-12 w-12 text-primary" />
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
                rows={3}
              />
            </div>

             <div className="grid gap-2">
              <Label htmlFor="productCategory">Product Category</Label>
              <Input
                id="productCategory"
                name="productCategory"
                placeholder="e.g., Woodcraft, Pottery, Textiles"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
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
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full"><Package className="h-6 w-6 text-primary" /></div>
                        <CardTitle>{pageTranslations.variations_card_title}</CardTitle>
                    </div>
                     <CardDescription>{pageTranslations.variations_card_description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {isGenerating && !state.data ? <Loader2 className="animate-spin text-muted-foreground" /> : 
                    state.data?.productVariations?.map((suggestion: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground">{suggestion}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full"><DraftingCompass className="h-6 w-6 text-primary" /></div>
                        <CardTitle>{pageTranslations.concepts_card_title}</CardTitle>
                    </div>
                     <CardDescription>{pageTranslations.concepts_card_description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                     {isGenerating && !state.data ? <Loader2 className="animate-spin text-muted-foreground" /> :
                     state.data?.newDesignConcepts?.map((suggestion: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                           <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground">{suggestion}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full"><Users className="h-6 w-6 text-primary" /></div>
                        <CardTitle>{pageTranslations.expansion_card_title}</CardTitle>
                    </div>
                    <CardDescription>{pageTranslations.expansion_card_description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                {isGenerating && !state.data ? <Loader2 className="animate-spin text-muted-foreground" /> :
                 state.data?.targetAudienceExpansion?.map((suggestion: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground">{suggestion}</p>
                    </div>
                ))}
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
