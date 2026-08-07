export function SoftwareProductSchema({
  name,
  description,
  url,
  price,
  productUrl
}: {
  name: string;
  description: string;
  url: string;
  price: string;
  productUrl: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: price.replace(/[^\d.]/g, '') || undefined,
      url: productUrl,
      availability: 'https://schema.org/InStock'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SystemMaster Automations',
      url: 'https://systemmaster.in'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  url
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'SystemMaster Automations',
      url: 'https://systemmaster.in'
    },
    areaServed: {
      '@type': 'Country',
      name: 'India'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  );
}

export function CreativeWorkSchema({
  name,
  description,
  url
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url,
    creator: {
      '@type': 'Organization',
      name: 'SystemMaster Automations',
      url: 'https://systemmaster.in'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  );
}
