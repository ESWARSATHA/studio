"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, Mail } from "lucide-react";

const requests = [
  {
    id: "REQ001",
    user: {
      name: "Priya Sharma",
      avatar: "https://placehold.co/40x40.png",
      avatarHint: "woman portrait"
    },
    title: "Custom Madhubani Wedding Gift",
    description: "Looking for a personalized Madhubani painting for a wedding gift. It should depict the bride and groom in traditional attire, with elements symbolizing prosperity and love. Size should be around 24x36 inches.",
    budget: "₹8,000",
    status: "New",
    date: "2 days ago",
  },
  {
    id: "REQ002",
    user: {
      name: "Rohan Verma",
      avatar: "https://placehold.co/40x40.png",
      avatarHint: "man portrait"
    },
    title: "Set of 6 Terracotta Mugs",
    description: "I'd like a set of 6 terracotta coffee mugs, each with a unique, minimalist carving inspired by nature (leaf, sun, moon, etc.). Need them to be microwave-safe.",
    budget: "₹2,500",
    status: "In Progress",
    date: "1 week ago",
  },
  {
    id: "REQ003",
    user: {
      name: "Anjali Desai",
      avatar: "https://placehold.co/40x40.png",
      avatarHint: "young woman portrait"
    },
    title: "Warli Art for Living Room Wall",
    description: "I have a large empty wall in my living room and I want a custom Warli painting directly on the wall. The theme should be 'community celebration'. I'm open to discussing the design and color scheme.",
    budget: "₹15,000",
    status: "New",
    date: "3 days ago",
  },
];

export default function RequestsPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Customer Requests</h1>
        <p className="text-muted-foreground">View and respond to custom art commissions from buyers.</p>
      </div>

      <div className="grid gap-6">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={request.user.avatar} alt={request.user.name} data-ai-hint={request.user.avatarHint} />
                  <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <CardTitle className="font-headline text-lg">{request.title}</CardTitle>
                        <Badge variant={request.status === 'New' ? 'default' : 'secondary'}>{request.status}</Badge>
                    </div>
                   <CardDescription>
                        From {request.user.name} • {request.date} • Budget: <span className="font-semibold text-foreground">{request.budget}</span>
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{request.description}</p>
               <div className="flex gap-2">
                <Button>
                  <Mail className="mr-2" /> Respond
                </Button>
                <Button variant="outline">
                  <Check className="mr-2" /> Mark as Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
