
"use client";

import { useActionState, useEffect, useState } from "react";
import { handleAnalyzeFeedback } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lightbulb, Wand2, Tag, ThumbsUp, Bug, MenuSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initialState = { status: 'idle', message: '', data: null, errors: null };

export default function SuggestionsPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(handleAnalyzeFeedback, initialState);
  const [feedback, setFeedback] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!feedback) {
      toast({
        variant: "destructive",
        title: "No Feedback Provided",
        description: "Please enter your suggestion before submitting.",
      });
      return;
    }
    const formData = new FormData();
    formData.append('feedback', feedback);
    setIsAnalyzing(true);
    formAction(formData);
  };
  
  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Feedback Analyzed!",
        description: "AI has processed the suggestion.",
      });
    } else if (state.status === 'error') {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: state.message,
      });
    }
    setIsAnalyzing(false);
  }, [state, toast]);

  const getCategoryIcon = (category: string | undefined) => {
    switch (category) {
        case 'Feature Request':
            return <MenuSquare className="h-6 w-6 text-primary" />;
        case 'Bug Report':
            return <Bug className="h-6 w-6 text-destructive" />;
        case 'Praise':
            return <ThumbsUp className="h-6 w-6 text-green-500" />;
        default:
            return <Tag className="h-6 w-6 text-muted-foreground" />;
    }
  }

  return (
    <div className="grid gap-8 max-w-3xl mx-auto">
       <div className="text-center">
        <Lightbulb className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Suggestions Box</h1>
        <p className="mt-2 text-muted-foreground">Share your ideas to help us improve the Artisan platform.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Your Feedback</CardTitle>
          <CardDescription>We value your input. What's on your mind?</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
             <Textarea 
                placeholder="e.g., 'I wish there was a way to create artist portfolios...'" 
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            />
            <Button type="submit" disabled={isAnalyzing} className="w-full sm:w-auto self-end">
              {isAnalyzing ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
              Analyze Feedback with AI
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {(isAnalyzing || state.data) && (
        <Card>
            <CardHeader>
                <CardTitle>AI Feedback Analysis</CardTitle>
                <CardDescription>Here's what our AI thinks about this feedback.</CardDescription>
            </CardHeader>
            <CardContent>
                {isAnalyzing && !state.data ? (
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="animate-spin" />
                        <p>Analyzing feedback...</p>
                    </div>
                ) : state.data && (
                    <div className="grid gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-full">
                                {getCategoryIcon(state.data.category)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{state.data.category}</h3>
                                <Badge variant={state.data.sentiment === 'Positive' ? 'default' : state.data.sentiment === 'Negative' ? 'destructive' : 'secondary'}>
                                    {state.data.sentiment}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold">Summary</h4>
                            <p className="text-muted-foreground">{state.data.summary}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
      )}

    </div>
  );
}
