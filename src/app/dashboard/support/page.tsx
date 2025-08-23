
"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Bot, HelpCircle, Loader2, Send, Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleAnswerQuery } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialState = { status: 'idle', message: '', data: null };

export default function SupportPage() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(handleAnswerQuery, initialState);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) {
      toast({
        variant: "destructive",
        title: "No Query Provided",
        description: "Please enter your question before submitting.",
      });
      return;
    }
    const formData = new FormData();
    formData.append('query', query);
    setIsSubmitting(true);
    formAction(formData);
  };

  useEffect(() => {
    if (state.status === 'success') {
      setAnswer(state.data?.answer || '');
      toast({
        title: "Answer Ready!",
        description: "The AI has responded to your query.",
      });
    } else if (state.status === 'error') {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: state.message,
      });
      setAnswer('');
    }
    setIsSubmitting(false);
  }, [state, toast]);

  return (
    <div className="grid gap-8 max-w-3xl mx-auto">
      <div className="text-center">
        <HelpCircle className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Support Center</h1>
        <p className="mt-2 text-muted-foreground">Have a question? Ask our AI assistant.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
          <CardDescription>Enter your query below and our AI will do its best to help you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              id="query"
              name="query"
              placeholder="e.g., How do I change my product's price?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  <span>Asking...</span>
                </>
              ) : (
                <>
                  <Send className="mr-2" />
                  <span>Ask AI</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {(isSubmitting || answer) && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
               <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              <div>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Here is the response to your query.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="prose prose-sm text-foreground">
            {isSubmitting && !answer ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="animate-spin" />
                    <p>Thinking...</p>
                </div>
            ) : (
              <p>{answer}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
