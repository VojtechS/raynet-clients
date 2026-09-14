import { getGoogleMapsUrl } from '../../utils/addressUtils.ts';

export interface CompanyMapLinkProps {
  address: string | null;
}

export function CompanyMapLink({ address }: Readonly<CompanyMapLinkProps>) {
  const mapUrl = getGoogleMapsUrl(address);

  if (!mapUrl) {
    return null;
  }

  return (
    <a
      href={mapUrl}
      className="link link--blue"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Zobrazit na mapě"
    >
      Zobrazit na mapě
    </a>
  );
}
