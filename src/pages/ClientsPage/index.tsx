import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
import { ClientList } from '../../features/clients/components/ClientList/ClientList';
import { ClientSearchBar } from '../../features/clients/components/ClientSearchBar/ClientSearchBar.tsx';
import { useClient, useClients } from '../../features/clients/hooks/useClients.ts';
import { ClientDetailPanel } from '../../features/clients/components/ClientDetailPanel/ClientDetailPanel.tsx';
import { MIN_SEARCH_LENGTH, SEARCH_DEBOUNCE_MS } from '../../features/clients/constants/search.ts';
import { parseClientId } from '../../features/clients/utils/parseClientId.ts';

export function ClientsPage() {
  const [search, setSearch] = useState('');
  const [querySearch, setQuerySearch] = useState('');

  const [searchParams] = useSearchParams();
  const selectedClientId = parseClientId(searchParams.get('clientId'));

  const normalizeForQuery = (val: string) => {
    const trimmed = val.trim();
    return trimmed.length >= MIN_SEARCH_LENGTH ? trimmed : '';
  };

  const debouncedSetQuery = useDebouncedCallback((val: string) => {
    setQuerySearch(normalizeForQuery(val));
  }, SEARCH_DEBOUNCE_MS);

  const clientsQuery = useClients(querySearch ? { fulltext: querySearch } : undefined);
  const clientQuery = useClient(selectedClientId ?? 0, selectedClientId !== null);

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
      <ClientList
        clients={clientsQuery.data?.data ?? []}
        selectedClientId={selectedClientId}
      />
      <ClientDetailPanel
        client={clientQuery.data?.data}
      />
    </main>
  );
}
