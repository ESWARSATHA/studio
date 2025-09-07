
"use client";

import { useEffect, useState, useActionState, useTransition } from "react";
import { Bot, HelpCircle, Loader2, Send, Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleAnswerQuery } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/lib/locales/language-context";

const initialState = { status: 'idle' as const, message: '', data: null, errors: null };

export default function SupportPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(handleAnswerQuery, initialState);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
        formAction(formData);
    });
  };

  useEffect(() => {
    if (state.status === 'success') {
      setAnswer(state.data?.answer || '');
      setQuery(''); // Clear input on success
      toast({
        title: translations.support_page.answer_ready_title,
        description: translations.support_page.answer_ready_desc,
      });
    } else if (state.status === 'error') {
      toast({
        variant: "destructive",
        title: translations.support_page.request_failed_title,
        description: state.message,
      });
      setAnswer('');
    }
  }, [state, toast, translations]);
  
  const { translations } = useLanguage();
  const pageTranslations = translations.support_page || {};
  const faqItems = pageTranslations.faq?.items || [];

  return (
    <div className="grid gap-8 max-w-3xl mx-auto">
      <div className="text-center">
        <Bot className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{pageTranslations.title}</h1>
        <p className="mt-2 text-muted-foreground">{pageTranslations.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{pageTranslations.ask_ai_title}</CardTitle>
          <CardDescription>{pageTranslations.ask_ai_desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} onSubmit={(e) => {
            const formData = new FormData(e.currentTarget);
            const currentQuery = formData.get('query') as string;
            if (!currentQuery.trim()) {
                e.preventDefault();
                toast({
                    variant: "destructive",
                    title: pageTranslations.no_query_title,
                    description: pageTranslations.no_query_desc,
                });
                return;
            }
             if (isPending) {
                e.preventDefault();
                return;
            }
            startTransition(() => {
                setAnswer('');
                formAction(formData);
            });
            setQuery(''); // Optimistically clear
          }} className="flex gap-2">
            <Input
              id="query"
              name="query"
              placeholder={pageTranslations.ask_ai_placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isPending}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  <span>{pageTranslations.asking_button}</span>
                </>
              ) : (
                <>
                  <Send className="mr-2" />
                  <span>{pageTranslations.ask_ai_button}</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {(isPending || state.data) && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
               <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              <div>
                <CardTitle>{pageTranslations.ai_assistant_title}</CardTitle>
                <CardDescription>{pageTranslations.ai_assistant_desc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="prose prose-sm text-foreground max-w-full">
            {isPending && !state.data ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="animate-spin" />
                    <p>{pageTranslations.thinking}</p>
                </div>
            ) : (
              <p>{state.data?.answer}</p>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{pageTranslations.faq?.title}</CardTitle>
          <CardDescription>{pageTranslations.faq?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item: any, index: number) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

    </div>
  );
}
