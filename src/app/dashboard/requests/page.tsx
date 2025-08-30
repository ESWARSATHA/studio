
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/locales/language-context';
import { Bell, Check, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const requests = [
  {
    name: "Rohan Das",
    avatar: "https://picsum.photos/100/100?random=1",
    specialty: "Terracotta Pottery"
  },
  {
    name: "Meera Iyer",
    avatar: "https://picsum.photos/100/100?random=2",
    specialty: "Kalamkari Textiles"
  },
];


export default function RequestsPage() {
  const { translations } = useLanguage();

  return (
    <div className="grid gap-8 max-w-2xl mx-auto">
       <div className="text-center">
        <Bell className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{translations.requests_page.title}</h1>
        <p className="mt-2 text-muted-foreground">{translations.requests_page.description}</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{translations.requests_page.card_title}</CardTitle>
          <CardDescription>{translations.requests_page.card_description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {requests.length > 0 ? (
            requests.map((request) => (
                <div key={request.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={request.avatar} alt={request.name} data-ai-hint="artisan portrait" />
                            <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold">{request.name}</h3>
                            <p className="text-sm text-muted-foreground">{request.specialty}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                            <Check className="h-4 w-4" />
                             <span className="sr-only">{translations.requests_page.accept_button}</span>
                        </Button>
                         <Button variant="destructive" size="icon">
                            <X className="h-4 w-4" />
                            <span className="sr-only">{translations.requests_page.decline_button}</span>
                        </Button>
                    </div>
                </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">{translations.requests_page.no_requests}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
