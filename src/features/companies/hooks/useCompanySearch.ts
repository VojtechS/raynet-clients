import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { MIN_SEARCH_LENGTH, SEARCH_DEBOUNCE_MS } from '../constants/companySearch.ts';

function normalizeSearch(value: string) {
  const trimmed = value.trim();

  return trimmed.length >= MIN_SEARCH_LENGTH ? trimmed : '';
}

export function useCompanySearch() {
  const [search, setSearch] = useState('');
  const [querySearch, setQuerySearch] = useState('');

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setQuerySearch(normalizeSearch(value));
  }, SEARCH_DEBOUNCE_MS);

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

  return {
    search,
    querySearch,
    handleSearchChange,
    handleSearchSubmit,
    handleSearchClear,
  };
}
