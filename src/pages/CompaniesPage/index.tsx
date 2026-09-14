import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CompanyList } from '../../features/companies/components/CompanyList/CompanyList';
import { CompanySearchBar } from '../../features/companies/components/CompanySearchBar/CompanySearchBar.tsx';
import {
  useCompanyCategoriesQuery,
  useCompanyQuery,
  useCompaniesQuery,
} from '../../features/companies/hooks/useCompanyQueries.ts';
import { useCompanySearch } from '../../features/companies/hooks/useCompanySearch.ts';
import { CompanyDetailPanel } from '../../features/companies/components/CompanyDetailPanel/CompanyDetailPanel.tsx';
import { parseCompanyId } from '../../features/companies/utils/parseCompanyId.ts';
import { createCategoryColorMap } from '../../features/companies/utils/categoryUtils.ts';
import styles from './CompaniesPage.module.scss';

export function CompaniesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCompanyId = parseCompanyId(searchParams.get('companyId'));
  const { search, querySearch, handleSearchChange, handleSearchSubmit, handleSearchClear } =
    useCompanySearch();

  const companiesQuery = useCompaniesQuery({
    ...(querySearch ? { fulltext: querySearch } : {}),
    sortColumn: 'name',
    sortDirection: 'ASC',
  });
  const companyQuery = useCompanyQuery(selectedCompanyId ?? 0, selectedCompanyId !== null);
  const categoriesQuery = useCompanyCategoriesQuery();
  const categoryColors = useMemo(
    () => createCategoryColorMap(categoriesQuery.data?.data ?? []),
    [categoriesQuery.data?.data],
  );

  function closeDetail() {
    setSearchParams((params) => {
      params.delete('companyId');

      return params;
    });
  }

  const isDetailOpen = selectedCompanyId !== null;
  const isCompaniesLoading = companiesQuery.isPending || companiesQuery.isFetching;
  const isCompanyLoading = companyQuery.isPending || companyQuery.isFetching;

  return (
    <>
      <h1 className="pageTitle">Klienti</h1>
      <CompanySearchBar
        value={search}
        onChange={handleSearchChange}
        onClear={handleSearchClear}
        onSubmit={handleSearchSubmit}
      />

      <div className={styles.companiesLayout} data-detail-open={isDetailOpen}>
        <CompanyList
          companies={companiesQuery.data?.data ?? []}
          categoryColors={categoryColors}
          selectedCompanyId={selectedCompanyId}
          isLoading={isCompaniesLoading}
        />
        <div className={styles.companiesLayout__detail} aria-hidden={!isDetailOpen}>
          <CompanyDetailPanel
            company={companyQuery.data?.data}
            categoryColors={categoryColors}
            onClose={closeDetail}
            isOpen={isDetailOpen}
            isLoading={isCompanyLoading}
          />
        </div>
      </div>
    </>
  );
}
