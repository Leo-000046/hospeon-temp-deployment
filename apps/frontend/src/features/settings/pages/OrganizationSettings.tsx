import React from 'react';
import {
  BuildingIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ImageIcon,
  GlobeIcon,
  UploadIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MonoNumber } from '@/components/ui/MonoNumber';
export function OrganizationSettings() {
  return (
    <div className="pb-24">
      <PageHeader
        title="Organization"
        description="Manage organization-wide details that appear on invoices, prescriptions, and patient communications."
        breadcrumbs={[
        {
          label: 'Settings'
        },
        {
          label: 'Organization'
        }]
        } />
      

      <div className="space-y-4 max-w-4xl">
        <Card>
          <SectionTitle
            title="Identity"
            description="Public-facing organization details" />
          
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-20 rounded-2xl bg-accent text-white flex items-center justify-center text-2xl font-bold">
              H
            </div>
            <div>
              <Button variant="secondary" size="sm" icon={<UploadIcon />}>
                Upload logo
              </Button>
              <p className="text-xs text-ink-tertiary mt-1">
                PNG/SVG · 256×256 minimum
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Organization name *"
              defaultValue="Hospeon Healthcare Pvt Ltd"
              icon={<BuildingIcon />} />
            
            <Input label="Display name" defaultValue="Hospeon" />
            <Input
              label="Tagline"
              defaultValue="Premium care, intelligent operations"
              className="md:col-span-2" />
            
            <Input
              label="Website"
              defaultValue="www.hospeon.app"
              icon={<GlobeIcon />}
              className="md:col-span-2" />
            
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Contact & address"
            description="Used on invoices, receipts, and registered communications" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Primary phone *"
              defaultValue="+91 484 4012 800"
              icon={<PhoneIcon />}
              mono />
            
            <Input
              label="Email *"
              defaultValue="hello@hospeon.app"
              icon={<MailIcon />} />
            
            <Textarea
              label="Registered address *"
              rows={3}
              className="md:col-span-2"
              defaultValue="2nd Floor, Aishwarya Towers, MG Road, Ernakulam, Kochi — 682016, Kerala, India" />
            
            <Input label="State" defaultValue="Kerala" icon={<MapPinIcon />} />
            <Input label="Country" defaultValue="India" />
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Statutory"
            description="Tax and registration details for compliance" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="GSTIN"
              defaultValue="32AABCT1234M1Z5"
              mono
              hint="15-digit GST identification" />
            
            <Input label="PAN" defaultValue="AABCT1234M" mono />
            <Input
              label="Medical registration number"
              defaultValue="KMC/2018/00482"
              mono />
            
            <Input
              label="Drug licence (Pharmacy)"
              defaultValue="KL-EKM-20A/2022/482"
              mono />
            
            <Input label="NABH accreditation" defaultValue="NA — in process" />
            <Input
              label="Establishment ID (Shop & Estab.)"
              defaultValue="SE/EKM/2018/12042"
              mono />
            
          </div>
        </Card>

        <Card>
          <SectionTitle title="Regional preferences" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select label="Timezone" defaultValue="Asia/Kolkata">
              <option>Asia/Kolkata</option>
              <option>Asia/Dubai</option>
            </Select>
            <Select label="Currency" defaultValue="INR">
              <option value="INR">₹ INR (Indian Rupee)</option>
              <option value="USD">$ USD</option>
              <option value="AED">د.إ AED</option>
            </Select>
            <Select label="Date format" defaultValue="iso">
              <option value="iso">2026-05-12</option>
              <option value="dmy">12-05-2026</option>
              <option value="mdy">05/12/2026</option>
            </Select>
            <Select label="Number format" defaultValue="indian">
              <option value="indian">Indian (1,23,456)</option>
              <option value="intl">International (123,456)</option>
            </Select>
            <Select label="Default language" defaultValue="en">
              <option value="en">English</option>
              <option value="ml">Malayalam</option>
              <option value="hi">Hindi</option>
            </Select>
            <Select label="Week starts on" defaultValue="mon">
              <option value="mon">Monday</option>
              <option value="sun">Sunday</option>
            </Select>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Plan & subscription" />
          <div className="flex items-center justify-between p-4 rounded-xl bg-accent-soft/50 border border-accent/20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-semibold">
                  Hospeon Clinic Pro
                </span>
                <StatusBadge tone="accent" size="sm">
                  Active
                </StatusBadge>
              </div>
              <p className="text-xs text-ink-secondary">
                Unlimited patients · 3 branches · 12 staff seats · AI Assistant
                included
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-ink-tertiary">Renews</div>
              <MonoNumber size="sm" weight="medium">
                2026-09-14
              </MonoNumber>
              <div className="text-xs text-ink-tertiary mt-1">
                ₹14,999/mo · billed annually
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Button size="sm" variant="secondary">
              Manage subscription
            </Button>
            <Button size="sm" variant="ghost">
              View invoices
            </Button>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur border-t border-line dark:border-line-dark px-4 lg:px-6 py-3 z-10">
        <div className="max-w-[1600px] mx-auto flex items-center justify-end gap-2 flex-wrap [&>*]:shrink-0">
          <Button variant="ghost">Discard</Button>
          <Button variant="primary">Save changes</Button>
        </div>
      </div>
    </div>);

}