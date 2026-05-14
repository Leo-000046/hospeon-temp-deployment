import React from 'react';
import { ConstructionIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
export function StubPage({
  title,
  breadcrumbs,
  description







}: {title: string;breadcrumbs?: {label: string;href?: string;}[];description?: string;}) {
  return (
    <div>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        description={description} />
      
      <Card padded={false}>
        <EmptyState
          icon={<ConstructionIcon />}
          title={`${title} — coming next`}
          description="This screen is part of the Hospeon design system. The structure, layout, and patterns shown elsewhere apply here: page header, filter bar, data table or card grid, sticky actions, empty/loading/error states, and an AI insight panel where relevant."
          action={<Button variant="secondary">View component patterns</Button>} />
        
      </Card>
    </div>);

}