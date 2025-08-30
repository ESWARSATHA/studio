
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/locales/language-context';
import { Users, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const artisans = [
  {
    name: "Priya Kumar",
    avatar: "https://picsum.photos/100/100",
    specialty: "Madhubani Painting",
    followers: 1500,
    following: 200,
  },
  {
    name: "Rohan Das",
    avatar: "https://picsum.photos/100/100",
    specialty: "Terracotta Pottery",
    followers: 120,
    following: 75,
  },
  {
    name: "Ananya Sharma",
    avatar: "https://picsum.photos/100/100",
    specialty: "Pattachitra Scrolls",
    followers: 850,
    following: 150,
  },
  {
    name: "Vikram Singh",
    avatar: "https://picsum.photos/100/100",
    specialty: "Wooden Toys",
    followers: 450,
    following: 90,
  },
    {
    name: "Meera Iyer",
    avatar: "https://picsum.photos/100/100",
    specialty: "Kalamkari Textiles",
    followers: 250,
    following: 110,
  },
  {
    name: "Arjun Mehta",
    avatar: "https://picsum.photos/100/100",
    specialty: "Blue Pottery",
    followers: 600,
    following: 180,
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
        {artisans.map((artisan, index) => (
            <Card key={artisan.name}>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={`${artisan.avatar}?random=${index}`} alt={artisan.name} data-ai-hint="artisan portrait" />
                            <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">{artisan.name}</h3>
                            <p className="text-sm text-muted-foreground">{artisan.specialty}</p>
                             <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                                <span>{artisan.followers} Followers</span>
                                <span>{artisan.following} Following</span>
                            </div>
                        </div>
                    </div>
                    <Button className="w-full mt-4">
                        <UserPlus className="mr-2"/>
                        {translations.community_page.follow_button}
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
