
"use client";

import { useActionState, useEffect, useState } from "react";
import { handleGenerateSuggestions } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lightbulb, Wand2, Package, DraftingCompass, Users, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
];

const initialState = { status: 'idle', message: '', data: null, errors: null };

export default function SuggestionsPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(handleGenerateSuggestions, initialState);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProduct) {
      toast({
        variant: "destructive",
        title: "No Product Selected",
        description: "Please choose a product to get suggestions for.",
      });
      return;
    }
    const formData = new FormData();
    formData.append('productName', selectedProduct.name);
    formData.append('productDescription', selectedProduct.description);
    formData.append('productCategory', selectedProduct.category);
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
        <h1 className="mt-4 text-3xl font-bold tracking-tight">AI Idea Hub</h1>
        <p className="mt-2 text-muted-foreground">Generate creative suggestions to innovate your products and expand your reach.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Your Product</CardTitle>
          <CardDescription>Choose one of your products to get AI-powered suggestions for.</CardDescription>
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
              Generate Suggestions
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
                        <CardTitle>Modern Product Variations</CardTitle>
                    </div>
                     <CardDescription>Adapt your traditional skills to new, contemporary products.</CardDescription>
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
                        <CardTitle>New Design Concepts</CardTitle>
                    </div>
                     <CardDescription>Fresh ideas to blend heritage with modern aesthetics.</CardDescription>
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
                        <CardTitle>Target Audience Expansion</CardTitle>
                    </div>
                    <CardDescription>Reach new customer segments with tailored strategies.</CardDescription>
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
