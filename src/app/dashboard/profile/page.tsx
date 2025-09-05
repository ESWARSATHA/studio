
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/locales/language-context";
import { User, Mail, Phone, Home, Clock, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";

const profileData = {
    name: "Priya Kumar",
    avatar: "https://picsum.photos/100/100?random=1",
    specialty: "Madhubani Painting",
    email: "priya.k@example.com",
    phone: "+91 98765 43210",
    address: "123, Kalakriti Lane, Madhubani, Bihar - 847211",
    loginHistory: [
        { time: "2024-07-29 10:30 AM", ip: "103.22.201.15" },
        { time: "2024-07-28 08:00 PM", ip: "103.22.201.15" },
        { time: "2024-07-27 11:15 AM", ip: "103.22.201.15" },
        { time: "2024-07-25 09:45 PM", ip: "103.22.201.15" },
    ]
};

export default function ProfilePage() {
    const { translations } = useLanguage();

    return (
        <div className="grid gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="h-28 w-28 border-4 border-primary">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} data-ai-hint="artisan portrait" />
                    <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold">{profileData.name}</h1>
                    <p className="text-muted-foreground">{profileData.specialty}</p>
                </div>
                 <Button variant="outline">
                    <Edit className="mr-2" />
                    Edit Profile
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <User className="h-6 w-6 text-primary"/>
                        <CardTitle>Contact Information</CardTitle>
                    </div>
                    <CardDescription>Your personal and contact details.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="flex items-start gap-4">
                        <Mail className="h-5 w-5 text-muted-foreground mt-1"/>
                        <div>
                            <h4 className="font-semibold">Email Address</h4>
                            <p className="text-muted-foreground">{profileData.email}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="h-5 w-5 text-muted-foreground mt-1"/>
                        <div>
                            <h4 className="font-semibold">Phone Number</h4>
                            <p className="text-muted-foreground">{profileData.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Home className="h-5 w-5 text-muted-foreground mt-1"/>
                        <div>
                            <h4 className="font-semibold">Address</h4>
                            <p className="text-muted-foreground">{profileData.address}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Clock className="h-6 w-6 text-primary"/>
                        <CardTitle>Login History</CardTitle>
                    </div>
                    <CardDescription>A record of recent logins to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="grid gap-3">
                        {profileData.loginHistory.map((login, index) => (
                            <li key={index} className="flex justify-between items-center text-sm p-3 rounded-md bg-secondary/50">
                                <span>{login.time}</span>
                                <span className="text-muted-foreground font-mono text-xs">{login.ip}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
