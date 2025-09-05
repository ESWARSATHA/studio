
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from '@/lib/locales/language-context';
import { GraduationCap, PlayCircle } from "lucide-react";

const videoTutorialsByLang: Record<string, any[]> = {
  en: [
    {
      id: "v1_en",
      title: "Mastering Your Craft: Techniques for Creating Breathtaking Art",
      description: "Dive deep into advanced techniques for your specific art form. This 20-minute session covers material selection, tool mastery, and finishing methods to elevate your work from good to exceptional.",
      duration: "20:15",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "v2_en",
      title: "The Art of Negotiation: Getting the Price You Deserve",
      description: "Learn the essential skills of pricing your art and negotiating with confidence. This 15-minute video covers market research, value proposition, and effective communication strategies to ensure you are fairly compensated for your talent.",
      duration: "15:45",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "v3_en",
      title: "Digital Marketing for Artists: A Beginner's Guide",
      description: "Learn how to market your art online, build a brand, and reach a global audience. This video covers social media, email marketing, and creating an online portfolio.",
      duration: "22:10",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "v4_en",
      title: "From Workshop to Marketplace: Fulfilling Customer Requirements",
      description: "Learn how to effectively manage custom orders and meet specific buyer requirements. This 15-minute guide covers requirement gathering, setting expectations, and delivering a product that delights your customers.",
      duration: "15:05",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ],
  hi: [
    {
      id: "v1_hi",
      title: "कला में महारत: अद्भुत कला बनाने की तकनीकें",
      description: "अपनी विशिष्ट कला के लिए उन्नत तकनीकों में गहराई से उतरें। यह 20 मिनट का सत्र सामग्री चयन, उपकरण महारत, और फिनिशिंग विधियों को कवर करता है।",
      duration: "20:15",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PL3-w5L9d_e6U3G9aPy3vB-i_8Y2pB3Qe-"
    },
    {
      id: "v2_hi",
      title: "मोल-भाव की कला: अपनी कला का सही मूल्य प्राप्त करें",
      description: "अपनी कला का मूल्य निर्धारण करने और आत्मविश्वास से बातचीत करने के आवश्यक कौशल सीखें। यह वीडियो बाजार अनुसंधान, मूल्य प्रस्ताव और प्रभावी संचार रणनीतियों को कवर करता है।",
      duration: "15:45",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PL3-w5L9d_e6U3G9aPy3vB-i_8Y2pB3Qe-"
    },
    {
      id: "v3_hi",
      title: "कलाकारों के लिए डिजिटल मार्केटिंग",
      description: "ऑनलाइन अपनी कला का विपणन करना, एक ब्रांड बनाना और वैश्विक दर्शकों तक पहुंचना सीखें। यह वीडियो सोशल मीडिया, ईमेल मार्केटिंग और एक ऑनलाइन पोर्टफोलियो बनाने को कवर करता है।",
      duration: "22:10",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PL3-w5L9d_e6U3G9aPy3vB-i_8Y2pB3Qe-"
    }
  ],
   bn: [
    {
      id: "v1_bn",
      title: "আপনার শিল্পে দক্ষতা অর্জন",
      description: "আপনার নির্দিষ্ট শিল্পের জন্য উন্নত কৌশলগুলি শিখুন। এই সেশনটি উপাদান নির্বাচন, সরঞ্জাম এবং সমাপ্তি পদ্ধতিগুলি কভার করে।",
      duration: "18:30",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLxCzondwVv-64h_sQ2tM3aoneu62a_f4A"
    },
    {
      id: "v2_bn",
      title: "ডিজিটাল মার্কেটিং فار آرٹسٹس",
      description: "কীভাবে অনলাইনে আপনার শিল্প বাজারজাত করবেন, একটি ব্র্যান্ড তৈরি করবেন এবং বিশ্বব্যাপী দর্শকদের কাছে পৌঁছাবেন তা শিখুন।",
      duration: "25:00",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLxCzondwVv-64h_sQ2tM3aoneu62a_f4A"
    }
  ]
};

export default function AcademyPage() {
  const { language, translations } = useLanguage();

  const academyTranslations = translations.academy_page || {
    title: "Artisan Academy",
    description: "Sharpen your skills and grow your business with our expert-led tutorials.",
    card_title: "Video Library",
    card_description: "Explore our collection of tutorials designed to help you succeed."
  };
  
  const videoTutorials = videoTutorialsByLang[language] || videoTutorialsByLang.en;

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
