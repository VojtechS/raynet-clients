import { ClientList } from '../../features/clients/components/ClientList/ClientList'
import { ClientSearchBar } from '../../features/clients/components/ClientSearchBar/ClientSearchBar'

export function ClientsPage() {
  return (
    <main>
      <h1>Clients</h1>
      <ClientSearchBar value='' onChange={() => {}} />
      <ClientList clients={[]} />
    </main>
  )
}
