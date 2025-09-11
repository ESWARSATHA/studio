
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/locales/language-context";
import { User, Mail, Phone, Home, Clock, Edit, ShieldCheck, CreditCard, UserSquare, DollarSign, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileCheck } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

const { profile: profileData } = placeholderImages.settings;

const ProfileTab = () => {
    return (
        <div className="grid gap-8">
            <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="h-28 w-28 border-4 border-primary">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} data-ai-hint={profileData.imageHint} />
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
};

const VerificationTab = () => {
    const { translations } = useLanguage();
    const [addressFile, setAddressFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAddressFile(file);
        }
    };

    return (
         <div className="grid gap-8">
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
                    <Button asChild className="w-full">
                      <Link href="https://www.digilocker.gov.in/" target="_blank" rel="noopener noreferrer">
                        {translations.verification_page.digilocker_button}
                      </Link>
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
                    <Button asChild className="w-full">
                       <Link href="https://www.digilocker.gov.in/" target="_blank" rel="noopener noreferrer">
                        {translations.verification_page.digilocker_button}
                      </Link>
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
                        <Input id="address-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
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
};

const PaymentTab = () => {
    const { translations } = useLanguage();
    const [payoutMethod, setPayoutMethod] = useState('upi');

    return (
        <div className="grid gap-8">
            <Card>
                <CardHeader>
                  <CardTitle>{translations.payment_settings_page.card_title}</CardTitle>
                  <CardDescription>{translations.payment_settings_page.card_description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-6">
                    <RadioGroup defaultValue="upi" onValueChange={setPayoutMethod}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi">{translations.payment_settings_page.upi_label}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank">{translations.payment_settings_page.bank_account_label}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card">{translations.payment_settings_page.credit_card_label}</Label>
                      </div>
                    </RadioGroup>

                    {payoutMethod === 'upi' && (
                      <div className="grid gap-2">
                        <Label htmlFor="upi-id">{translations.payment_settings_page.upi_label}</Label>
                        <Input id="upi-id" placeholder={translations.payment_settings_page.upi_placeholder} />
                      </div>
                    )}

                    {payoutMethod === 'bank' && (
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="account-holder-name">{translations.payment_settings_page.account_holder_name_label}</Label>
                            <Input id="account-holder-name" placeholder={translations.payment_settings_page.account_holder_name_placeholder} />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="account-number">{translations.payment_settings_page.account_number_label}</Label>
                            <Input id="account-number" placeholder={translations.payment_settings_page.account_number_placeholder} />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="ifsc-code">{translations.payment_settings_page.ifsc_code_label}</Label>
                            <Input id="ifsc-code" placeholder={translations.payment_settings_page.ifsc_code_placeholder} />
                        </div>
                      </div>
                    )}

                    {payoutMethod === 'credit-card' && (
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="card-number">{translations.payment_settings_page.card_number_label}</Label>
                                <Input id="card-number" placeholder={translations.payment_settings_page.card_number_placeholder} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="expiry-date">{translations.payment_settings_page.card_expiry_label}</Label>
                                    <Input id="expiry-date" placeholder={translations.payment_settings_page.card_expiry_placeholder} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cvv">{translations.payment_settings_page.card_cvv_label}</Label>
                                    <Input id="cvv" placeholder={translations.payment_settings_page.card_cvv_placeholder} />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>{translations.payment_settings_page.payout_notice_title}</AlertTitle>
                        <AlertDescription>
                            {translations.payment_settings_page.payout_notice_description}
                        </AlertDescription>
                    </Alert>

                    <Button type="submit" className="w-full">
                      {translations.payment_settings_page.save_button}
                    </Button>
                  </form>
                </CardContent>
            </Card>
        </div>
    );
};


export default function SettingsPage() {
    const { translations } = useLanguage();
    return (
        <div className="grid gap-8 max-w-4xl mx-auto">
            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">{translations.dashboard_layout.account_menu_profile}</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <ProfileTab />
                </TabsContent>
                <TabsContent value="payment">
                    <PaymentTab />
                </TabsContent>
                <TabsContent value="verification">
                    <VerificationTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
