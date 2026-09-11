import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ClientList } from '../../features/clients/components/ClientList/ClientList';
import { ClientSearchBar } from '../../features/clients/components/ClientSearchBar/ClientSearchBar.tsx';
import { useClients } from '../../features/clients/hooks/useClients.ts';
import { ClientDetailPanel } from '../../features/clients/components/ClientDetailPanel/ClientDetailPanel.tsx';
import { MIN_SEARCH_LENGTH, SEARCH_DEBOUNCE_MS } from '../../features/clients/constants/search.ts';

export function ClientsPage() {
  const [search, setSearch] = useState('');
  const [querySearch, setQuerySearch] = useState('');

  const normalizeForQuery = (val: string) => {
    const trimmed = val.trim();
    return trimmed.length >= MIN_SEARCH_LENGTH ? trimmed : '';
  };

  const debouncedSetQuery = useDebouncedCallback((val: string) => {
    setQuerySearch(normalizeForQuery(val));
  }, SEARCH_DEBOUNCE_MS);

  const clientsQuery = useClients(querySearch ? { fulltext: querySearch } : undefined);

  function handleSearchChange(value: string) {
    setSearch(value);
    debouncedSetQuery(value);
  }

  function handleSearchSubmit(value: string) {
    debouncedSetQuery.cancel();
    const trimmed = value.trim();

    if (trimmed.length > 0 && trimmed.length < MIN_SEARCH_LENGTH) {
      return;
    }

    setSearch(trimmed);
    setQuerySearch(trimmed);
  }

  function handleSearchClear() {
    debouncedSetQuery.cancel();
    setSearch('');
    setQuerySearch('');
  }

  return (
    <main>
      <h1>Klienti</h1>
      <ClientSearchBar
        value={search}
        onChange={handleSearchChange}
        onClear={handleSearchClear}
        onSubmit={handleSearchSubmit}
      />
      <ClientList clients={clientsQuery.data?.data ?? []} />
      <ClientDetailPanel client={{}} />
    </main>
  );
}
