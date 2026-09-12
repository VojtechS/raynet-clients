import { useClientImageQuery } from '../../hooks/useClientQueries.ts';

interface ClientLogoProps {
  logoId?: number;
  clientName: string;
}

export function ClientLogo({ logoId, clientName }: Readonly<ClientLogoProps>) {
  const imageQuery = useClientImageQuery(logoId);
  const imageData = imageQuery.data?.imgData;
  const hasImage = Boolean(imageData);

  return (
    <div>
      {hasImage ? (
        <img src={imageData} alt={`${clientName} logo`} />
      ) : (
        <span aria-hidden="true">-</span>
      )}
    </div>
  );
}
