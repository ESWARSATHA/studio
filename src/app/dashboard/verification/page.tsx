
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { UploadCloud, FileCheck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/locales/language-context';

export default function VerificationPage() {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const { translations } = useLanguage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  return (
    <div className="grid gap-8 max-w-2xl mx-auto">
       <div className="text-center">
        <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{translations.verification_page.title}</h1>
        <p className="mt-2 text-muted-foreground">{translations.verification_page.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{translations.verification_page.card_title}</CardTitle>
          <CardDescription>{translations.verification_page.card_description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="document-upload">{translations.verification_page.gov_id_label}</Label>
              <CardDescription className="text-xs">{translations.verification_page.gov_id_description}</CardDescription>
              <div className="w-full rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center relative overflow-hidden bg-secondary/50 p-4 h-36">
                {documentFile ? (
                  <div className="text-center text-muted-foreground">
                    <FileCheck className="mx-auto h-8 w-8 mb-2 text-primary" />
                    <p className="text-sm font-semibold">{documentFile.name}</p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <UploadCloud className="mx-auto h-8 w-8 mb-2" />
                    <p className="text-sm">{translations.verification_page.upload_prompt}</p>
                  </div>
                )}
                <Input id="document-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={!documentFile}>
              {translations.verification_page.submit_button}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
