
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/lib/locales/language-context';
import { DollarSign } from 'lucide-react';

export default function PaymentSettingsPage() {
  const { translations } = useLanguage();
  const [payoutMethod, setPayoutMethod] = useState('upi');

  return (
    <div className="grid gap-8 max-w-2xl mx-auto">
       <div className="text-center">
        <DollarSign className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{translations.payment_settings_page.title}</h1>
        <p className="mt-2 text-muted-foreground">{translations.payment_settings_page.description}</p>
      </div>

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
            
            <Button type="submit" className="w-full">
              {translations.payment_settings_page.save_button}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
