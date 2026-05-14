import React, { useState } from 'react';
import {
  UserPlusIcon,
  DownloadIcon,
  FilterIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PhoneIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { DataTable, Column } from '../components/primitives/DataTable';
import { FilterBar, FilterChip } from '../components/primitives/FilterBar';
import { MonoNumber, MoneyText } from '../components/primitives/MonoNumber';
import { StatusBadge } from '../components/primitives/StatusBadge';
import { patients } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';
export function Patients() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'recent' | 'outstanding'>('all');
  const navigate = useNavigate();
  const filtered = patients.filter((p) => {
    if (
    search &&
    !`${p.name} ${p.phone} ${p.id}`.
    toLowerCase().
    includes(search.toLowerCase()))

    return false;
    if (filter === 'outstanding' && p.balance === 0) return false;
    return true;
  });
  const cols: Column<(typeof patients)[number]>[] = [
  {
    key: 'id',
    header: 'Patient ID',
    render: (r) =>
    <MonoNumber size="sm" weight="medium">
          {r.id}
        </MonoNumber>

  },
  {
    key: 'name',
    header: 'Name',
    render: (r) =>
    <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-subtle dark:bg-subtle-dark flex items-center justify-center text-xs font-medium text-ink-secondary">
            {r.name.
        split(' ').
        map((n) => n[0]).
        slice(0, 2).
        join('')}
          </div>
          <div>
            <div className="font-medium text-ink-primary dark:text-ink-primary-dark">
              {r.name}
            </div>
            <div className="text-xs text-ink-tertiary flex items-center gap-1 mt-0.5">
              <PhoneIcon className="w-3 h-3" />
              <MonoNumber size="xs">{r.phone}</MonoNumber>
            </div>
          </div>
        </div>

  },
  {
    key: 'demo',
    header: 'Age / Gender',
    render: (r) =>
    <span className="text-ink-secondary text-sm">
          <MonoNumber size="sm">{r.age}</MonoNumber> · {r.gender}
        </span>

  },
  {
    key: 'lastVisit',
    header: 'Last visit',
    render: (r) =>
    <MonoNumber size="sm" className="text-ink-secondary">
          {r.lastVisit}
        </MonoNumber>

  },
  {
    key: 'doctor',
    header: 'Doctor',
    render: (r) => <span className="text-ink-secondary">{r.doctor}</span>
  },
  {
    key: 'conditions',
    header: 'Conditions',
    render: (r) =>
    <div className="flex flex-wrap gap-1">
          {r.conditions.length === 0 &&
      <span className="text-xs text-ink-tertiary">—</span>
      }
          {r.conditions.slice(0, 2).map((c) =>
      <StatusBadge key={c} tone="neutral" size="sm">
              {c}
            </StatusBadge>
      )}
          {r.conditions.length > 2 &&
      <span className="text-xs text-ink-tertiary">
              +{r.conditions.length - 2}
            </span>
      }
        </div>

  },
  {
    key: 'balance',
    header: 'Balance',
    align: 'right',
    render: (r) =>
    r.balance > 0 ?
    <MoneyText
      amount={r.balance}
      size="sm"
      weight="medium"
      className="text-warning" /> :


    <span className="text-ink-tertiary text-xs">—</span>

  },
  {
    key: 'actions',
    header: '',
    width: '60px',
    render: () =>
    <div
      className="flex items-center justify-end gap-1"
      onClick={(e) => e.stopPropagation()}>
      
          <IconButton size="sm" variant="ghost">
            <EyeIcon />
          </IconButton>
          <IconButton size="sm" variant="ghost">
            <MoreHorizontalIcon />
          </IconButton>
        </div>

  }];

  return (
    <div>
      <PageHeader
        title="Patients"
        description="View, search and manage all registered patients across your branches."
        breadcrumbs={[
        {
          label: 'Patients'
        },
        {
          label: 'All patients'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<DownloadIcon />}>
              Export
            </Button>
            <Button
            variant="primary"
            icon={<UserPlusIcon />}
            onClick={() => navigate('/patients/new')}>
            
              New patient
            </Button>
          </>
        } />
      

      <Card>
        <FilterBar
          searchPlaceholder="Search by name, phone, or P-ID…"
          searchValue={search}
          onSearchChange={setSearch}>
          
          <FilterChip
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            count={patients.length}>
            
            All
          </FilterChip>
          <FilterChip
            active={filter === 'recent'}
            onClick={() => setFilter('recent')}
            count={4}>
            
            Recent visits
          </FilterChip>
          <FilterChip
            active={filter === 'outstanding'}
            onClick={() => setFilter('outstanding')}
            count={patients.filter((p) => p.balance > 0).length}>
            
            Outstanding balance
          </FilterChip>
          <Button variant="ghost" size="sm" icon={<FilterIcon />}>
            More filters
          </Button>
        </FilterBar>

        <DataTable
          data={filtered}
          columns={cols}
          rowKey={(r) => r.id}
          onRowClick={(r) => navigate(`/patients/${r.id}`)} />
        

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-line dark:border-line-dark">
          <span className="text-xs text-ink-tertiary">
            Showing <MonoNumber size="xs">{filtered.length}</MonoNumber> of{' '}
            <MonoNumber size="xs">{patients.length}</MonoNumber> patients
          </span>
          <div className="flex items-center gap-1 overflow-x-auto -mx-1 px-1 [&>*]:shrink-0">
            <Button size="sm" variant="ghost" disabled>
              Previous
            </Button>
            <Button size="sm" variant="secondary">
              1
            </Button>
            <Button size="sm" variant="ghost">
              2
            </Button>
            <Button size="sm" variant="ghost">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>);

}