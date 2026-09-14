import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CompaniesPage } from './index.tsx';
import { setupApiMocks } from './CompaniesPage.test-data.ts';

vi.mock('../../features/companies/api/companyApi.ts', () => ({
  companyApi: {
    getCategories: vi.fn(),
    getAll: vi.fn(),
    getById: vi.fn(),
    getImage: vi.fn(),
  },
}));

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/klienti']}>
        <CompaniesPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('CompaniesPage', () => {
  beforeEach(() => {
    setupApiMocks();
  });

  it('filters the list when the user searches', async () => {
    const user = userEvent.setup();
    renderPage();

    expect(await screen.findByRole('link', { name: 'Company 1' })).toBeInTheDocument();
    await user.type(screen.getByRole('textbox', { name: 'Hledat' }), 'Company 2');

    expect(await screen.findByRole('link', { name: 'Company 2' })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByRole('link', { name: 'Company 1' })).not.toBeInTheDocument();
    });
  });

  it('opens the selected company detail', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole('link', { name: 'Company 3' }));

    expect(await screen.findByRole('heading', { name: 'Company 3' })).toBeInTheDocument();
    expect(screen.getByText('CZ3000')).toBeInTheDocument();
  });

  it('closes the company detail', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole('link', { name: 'Company 4' }));
    expect(await screen.findByRole('heading', { name: 'Company 4' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /zavřít/i }));

    expect(screen.queryByRole('heading', { name: 'Company 4' })).not.toBeInTheDocument();
  });

  it('shows an empty state when no company matches', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByRole('textbox', { name: 'Hledat' }), 'asdfer');

    expect(await screen.findByText('Žádní klienti')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Company 1' })).not.toBeInTheDocument();
  });
});
