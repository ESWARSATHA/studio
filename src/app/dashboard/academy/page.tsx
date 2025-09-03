
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from '@/lib/locales/language-context';
import { GraduationCap, PlayCircle } from "lucide-react";

const videoTutorials = [
  {
    id: "v1",
    title: "Mastering Your Craft: Techniques for Creating Breathtaking Art",
    description: "Dive deep into advanced techniques for your specific art form. This 20-minute session covers material selection, tool mastery, and finishing methods to elevate your work from good to exceptional.",
    duration: "20:15",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v2",
    title: "The Art of Negotiation: Getting the Price You Deserve",
    description: "Learn the essential skills of pricing your art and negotiating with confidence. This 15-minute video covers market research, value proposition, and effective communication strategies to ensure you are fairly compensated for your talent.",
    duration: "15:45",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v3",
    title: "Connecting with Customers: Building Lasting Relationships",
    description: "Discover how to understand your customers' needs and provide exceptional service. This 20-minute tutorial explores customer communication, feedback management, and storytelling to turn buyers into loyal patrons.",
    duration: "20:30",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v4",
    title: "From Workshop to Marketplace: Fulfilling Customer Requirements",
    description: "Learn how to effectively manage custom orders and meet specific buyer requirements. This 15-minute guide covers requirement gathering, setting expectations, and delivering a product that delights your customers.",
    duration: "15:05",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];


export default function AcademyPage() {
  const { translations } = useLanguage();

  const academyTranslations = translations.academy_page || {
    title: "Artisan Academy",
    description: "Sharpen your skills and grow your business with our expert-led tutorials.",
    card_title: "Video Library",
    card_description: "Explore our collection of tutorials designed to help you succeed."
  };

  return (
    <div className="grid gap-8 max-w-4xl mx-auto">
      <div className="text-center">
        <GraduationCap className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{academyTranslations.title}</h1>
        <p className="mt-2 text-muted-foreground">{academyTranslations.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{academyTranslations.card_title}</CardTitle>
          <CardDescription>{academyTranslations.card_description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {videoTutorials.map((video) => (
              <AccordionItem value={video.id} key={video.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <PlayCircle className="h-6 w-6 text-primary" />
                    <div className="text-left">
                        <h4 className="font-semibold">{video.title}</h4>
                        <p className="text-sm text-muted-foreground">Duration: {video.duration}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">{video.description}</p>
                   <div className="aspect-video">
                    <iframe
                        className="w-full h-full rounded-md"
                        src={video.videoUrl}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
