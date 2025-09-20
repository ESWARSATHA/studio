
"use client";

import { useEffect, useState, useTransition, FormEvent } from "react";
import { Bot, HelpCircle, Loader2, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleAnswerQuery } from "./actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/lib/locales/language-context";

export default function SupportPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ status: string, message?: string, data?: any } | null>(null);
  const { translations } = useLanguage();
  const [isPending, startTransition] = useTransition();

  const pageTranslations = translations.support_page || {};
  const faqItems = pageTranslations.faq?.items || [];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const currentQuery = formData.get('query') as string;

    if (!currentQuery.trim()) {
      toast({
        variant: "destructive",
        title: pageTranslations.no_query_title,
        description: pageTranslations.no_query_desc,
      });
      return;
    }

    startTransition(async () => {
      setResult(null);
      const actionResult = await handleAnswerQuery(null, formData);
      setResult(actionResult);
    });
  };

  useEffect(() => {
    if (result) {
      if (result.status === 'success') {
        toast({
          title: pageTranslations.answer_ready_title,
          description: pageTranslations.answer_ready_desc,
        });
        setQuery('');
      } else if (result.status === 'error') {
        toast({
          variant: "destructive",
          title: pageTranslations.request_failed_title,
          description: result.message,
        });
      }
    }
  }, [result, toast, pageTranslations]);

  return (
    <div className="grid gap-8 max-w-6xl mx-auto">
      <div className="text-center">
        <Bot className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{pageTranslations.title}</h1>
        <p className="mt-2 text-muted-foreground">{pageTranslations.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="grid gap-8 content-start">
            <Card>
                <CardHeader>
                <CardTitle>{pageTranslations.ask_ai_title}</CardTitle>
                <CardDescription>{pageTranslations.ask_ai_desc}</CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit} className="flex gap-2">
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
        
        {(isPending || result?.data) && (
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
                {isPending && !result?.data ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="animate-spin" />
                        <p>{pageTranslations.thinking}</p>
                    </div>
                ) : (
                <p>{result?.data?.answer}</p>
                )}
            </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
