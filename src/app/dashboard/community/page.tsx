
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/locales/language-context';
import { Users, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const artisans = [
  {
    name: "Priya Kumar",
    avatar: "https://placehold.co/100x100.png",
    specialty: "Madhubani Painting"
  },
  {
    name: "Rohan Das",
    avatar: "https://placehold.co/100x100.png",
    specialty: "Terracotta Pottery"
  },
  {
    name: "Ananya Sharma",
    avatar: "https://placehold.co/100x100.png",
    specialty: "Pattachitra Scrolls"
  },
  {
    name: "Vikram Singh",
    avatar: "https://placehold.co/100x100.png",
    specialty: "Wooden Toys"
  },
    {
    name: "Meera Iyer",
    avatar: "https://placehold.co/100x100.png",
    specialty: "Kalamkari Textiles"
  },
  {
    name: "Arjun Mehta",
    avatar: "https://placehold.co/100x100.png",
    specialty: "Blue Pottery"
  }
];


export default function CommunityPage() {
  const { translations } = useLanguage();

  return (
    <div className="grid gap-8">
      <div className="text-center">
        <Users className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{translations.community_page.title}</h1>
        <p className="mt-2 text-muted-foreground">{translations.community_page.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {artisans.map((artisan) => (
            <Card key={artisan.name}>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={artisan.avatar} alt={artisan.name} data-ai-hint="artisan portrait" />
                            <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">{artisan.name}</h3>
                            <p className="text-sm text-muted-foreground">{artisan.specialty}</p>
                        </div>
                    </div>
                    <Button className="w-full mt-4">
                        <MessageSquare className="mr-2"/>
                        {translations.community_page.send_message}
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
