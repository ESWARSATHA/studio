
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { UploadCloud, FileCheck, ShieldCheck, CreditCard, UserSquare } from 'lucide-react';
import { useLanguage } from '@/lib/locales/language-context';

export default function VerificationPage() {
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [addressFile, setAddressFile] = useState<File | null>(null);
  const { translations } = useLanguage();

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(file);
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
          <div className="flex items-center gap-3">
            <UserSquare className="h-6 w-6 text-primary"/>
            <CardTitle>{translations.verification_page.aadhaar_title}</CardTitle>
          </div>
          <CardDescription>{translations.verification_page.aadhaar_description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="aadhaar-number">{translations.verification_page.aadhaar_label}</Label>
              <Input id="aadhaar-number" placeholder={translations.verification_page.aadhaar_placeholder} />
            </div>
            <Button type="button" className="w-full">
              {translations.verification_page.digilocker_button}
            </Button>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
           <div className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-primary"/>
            <CardTitle>{translations.verification_page.pan_title}</CardTitle>
          </div>
          <CardDescription>{translations.verification_page.pan_description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
             <div className="grid gap-2">
              <Label htmlFor="pan-number">{translations.verification_page.pan_label}</Label>
              <Input id="pan-number" placeholder={translations.verification_page.pan_placeholder} />
            </div>
            <Button type="button" className="w-full">
               {translations.verification_page.digilocker_button}
            </Button>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle>{translations.verification_page.address_proof_title}</CardTitle>
          <CardDescription>{translations.verification_page.address_proof_description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <div className="w-full rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center relative overflow-hidden bg-secondary/50 p-4 h-36">
                {addressFile ? (
                  <div className="text-center text-muted-foreground">
                    <FileCheck className="mx-auto h-8 w-8 mb-2 text-primary" />
                    <p className="text-sm font-semibold">{addressFile.name}</p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <UploadCloud className="mx-auto h-8 w-8 mb-2" />
                    <p className="text-sm">{translations.verification_page.upload_prompt}</p>
                  </div>
                )}
                <Input id="address-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange(setAddressFile)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={!addressFile}>
              {translations.verification_page.submit_button}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
