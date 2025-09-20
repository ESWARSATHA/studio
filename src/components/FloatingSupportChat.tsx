
"use client";

import { useEffect, useState, useTransition, FormEvent, useRef } from "react";
import { Bot, Loader2, Send, MessageSquare, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleAnswerQuery } from "@/app/dashboard/support/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/locales/language-context";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import placeholderImages from '@/lib/placeholder-images.json';

type Message = {
    id: string;
    type: 'user' | 'bot';
    text: string;
};

export function FloatingSupportChat() {
    const { toast } = useToast();
    const { translations } = useLanguage();
    const supportTranslations = translations.support_page || {};

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isPending, startTransition] = useTransition();
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    
    const { userAvatar } = placeholderImages.misc;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const currentQuery = formData.get('query') as string;

        if (!currentQuery.trim()) return;
        
        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: currentQuery }]);
        setQuery('');

        startTransition(async () => {
            const actionResult = await handleAnswerQuery(null, formData);
            
            if (actionResult.status === 'success') {
                setMessages(prev => [...prev, { id: Date.now().toString() + 'bot', type: 'bot', text: actionResult.data.answer }]);
            } else {
                setMessages(prev => [...prev, { id: Date.now().toString() + 'bot', type: 'bot', text: actionResult.message || supportTranslations.request_failed_title }]);
                toast({
                    variant: "destructive",
                    title: supportTranslations.request_failed_title,
                    description: actionResult.message,
                });
            }
        });
    };

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    return (
        <>
            <Button
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50"
                size="icon"
                onClick={() => setIsOpen(true)}
            >
                <Bot className="h-8 w-8" />
                <span className="sr-only">Open AI Mentor</span>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="flex flex-col p-0">
                    <SheetHeader className="p-6 pb-4">
                        <SheetTitle className="flex items-center gap-2">
                            <Bot />
                            {supportTranslations.title}
                        </SheetTitle>
                        <SheetDescription>
                            {supportTranslations.description}
                        </SheetDescription>
                    </SheetHeader>

                    <ScrollArea className="flex-1 px-6">
                         <div className="space-y-6 py-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex items-end gap-2",
                                        message.type === 'user' ? "justify-end" : "justify-start"
                                    )}
                                >
                                    {message.type === 'bot' && (
                                         <Avatar className="h-8 w-8">
                                            <AvatarFallback><Bot /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div
                                        className={cn(
                                            "max-w-xs rounded-lg px-4 py-2 text-sm",
                                            message.type === 'user'
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary"
                                        )}
                                    >
                                        {message.text}
                                    </div>
                                     {message.type === 'user' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={userAvatar.image} alt="User" data-ai-hint={userAvatar.imageHint} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isPending && (
                                <div className="flex items-end gap-2 justify-start">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><Bot /></AvatarFallback>
                                    </Avatar>
                                    <div className="max-w-xs rounded-lg px-4 py-2 text-sm bg-secondary flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>{supportTranslations.thinking}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <SheetFooter className="p-6 pt-4 border-t">
                        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                            <Input
                                name="query"
                                placeholder={supportTranslations.ask_ai_placeholder}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                disabled={isPending}
                                autoComplete="off"
                            />
                            <Button type="submit" size="icon" disabled={isPending || !query.trim()}>
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
}
