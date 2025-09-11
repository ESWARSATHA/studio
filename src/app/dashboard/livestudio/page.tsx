
"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Video, VideoOff, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/lib/locales/language-context';
import placeholderImages from '@/lib/placeholder-images.json';

const { chat: chatUsers } = placeholderImages.livestudio;

export default function LiveStudioPage() {
  const { toast } = useToast();
  const { translations } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isVerified, setIsVerified] = useState(false); // Simulated verification status

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        // Stop camera stream when component unmounts
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const handleStreamToggle = () => {
    if (!isVerified) {
        toast({
            variant: 'destructive',
            title: 'Verification Required',
            description: 'You must be a verified artist to start a live stream.',
        });
        return;
    }

    if (isStreaming) {
      // Logic to stop the stream
      setIsStreaming(false);
      toast({ title: 'Stream Ended', description: 'Your live session has concluded.' });
    } else {
      // Logic to start the stream
      if (!hasCameraPermission) {
        toast({
          variant: 'destructive',
          title: 'Cannot Start Stream',
          description: 'Camera access is required to go live.',
        });
        return;
      }
      setIsStreaming(true);
      toast({ title: 'You are Live!', description: 'Your stream has started successfully.' });
    }
  };
  
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>{translations.live_studio_page.video_preview_title}</CardTitle>
            <CardDescription>{translations.live_studio_page.video_preview_description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center bg-secondary/30 rounded-b-lg">
            <div className="w-full aspect-video bg-black rounded-md overflow-hidden relative">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              {!hasCameraPermission && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                  <VideoOff className="h-16 w-16 mb-4" />
                  <h3 className="text-xl font-bold">{translations.live_studio_page.camera_access_denied}</h3>
                  <p className="text-center">{translations.live_studio_page.enable_camera_prompt}</p>
                </div>
              )}
               {isStreaming && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  LIVE
                </div>
              )}
            </div>
             {hasCameraPermission === false && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>{translations.live_studio_page.camera_access_required}</AlertTitle>
                  <AlertDescription>
                    {translations.live_studio_page.allow_camera_access_prompt}
                  </AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1">
        <div className="flex flex-col gap-8 h-full">
            <Card>
                <CardHeader>
                    <CardTitle>{translations.live_studio_page.stream_controls_title}</CardTitle>
                    <CardDescription>{translations.live_studio_page.stream_controls_description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                     {!isVerified && (
                        <Alert>
                            <ShieldCheck className="h-4 w-4" />
                            <AlertTitle>{translations.live_studio_page.verification_required_title}</AlertTitle>
                            <AlertDescription>
                                {translations.live_studio_page.verification_required_description}
                                <Button variant="link" className="p-0 h-auto ml-1" asChild>
                                    <Link href="/dashboard/verification">{translations.live_studio_page.verify_now_link}</Link>
                                </Button>
                            </AlertDescription>
                        </Alert>
                     )}
                     <div className="grid gap-2">
                        <Label htmlFor="stream-title">{translations.live_studio_page.stream_title_label}</Label>
                        <Input id="stream-title" placeholder={translations.live_studio_page.stream_title_placeholder} />
                    </div>
                    <Button size="lg" onClick={handleStreamToggle} disabled={hasCameraPermission === null || !isVerified}>
                    {isStreaming ? (
                        <>
                        <VideoOff className="mr-2" /> {translations.live_studio_page.end_stream_button}
                        </>
                    ) : (
                        <>
                        <Video className="mr-2" /> {translations.live_studio_page.go_live_button}
                        </>
                    )}
                    </Button>
                </CardContent>
            </Card>
            <Card className="flex-1 flex flex-col">
                <CardHeader>
                <CardTitle>{translations.live_studio_page.live_chat_title}</CardTitle>
                <CardDescription>{translations.live_studio_page.live_chat_description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4 overflow-y-auto px-4">
                    <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={chatUsers[0].avatar} alt="User" data-ai-hint={chatUsers[0].imageHint} />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm">
                            <p className="font-semibold">Ananya</p>
                            <p className="text-muted-foreground">{translations.live_studio_page.chat_message_1}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                             <AvatarImage src={chatUsers[1].avatar} alt="User" data-ai-hint={chatUsers[1].imageHint} />
                            <AvatarFallback>R</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm">
                            <p className="font-semibold">Rohan</p>
                            <p className="text-muted-foreground">{translations.live_studio_page.chat_message_2}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                             <AvatarImage src={chatUsers[2].avatar} alt="User" data-ai-hint={chatUsers[2].imageHint} />
                            <AvatarFallback>V</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm">
                            <p className="font-semibold">Vikram</p>
                            <p className="text-muted-foreground">{translations.live_studio_page.chat_message_3}</p>
                        </div>
                    </div>
                </CardContent>
                <div className="p-4 border-t">
                    <form className="flex gap-2">
                        <Input placeholder={translations.live_studio_page.chat_placeholder} />
                        <Button type="submit" size="icon"><Send /></Button>
                    </form>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
