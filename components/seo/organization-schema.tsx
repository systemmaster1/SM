type OrganizationSchemaProps = {
  locale: string;
};

export function OrganizationSchema({locale}: OrganizationSchemaProps) {
  const base = 'https://systemmaster.in';

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SystemMaster Automations',
    url: base,
    logo: `${base}/logo/systemmaster.png`,
    email: 'Connect@systemmaster.in',
    telephone: '+91 90279 65956',
    founder: {
      '@type': 'Person',
      name: 'Sunil Tiwari'
    },
    sameAs: [],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91 90279 65956',
        contactType: 'sales',
        availableLanguage: ['English', 'Hindi']
      }
    ]
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SystemMaster Automations',
    url: base,
    inLanguage: locale === 'hi' ? 'hi-IN' : 'en-IN'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(organization)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(website)}}
      />
    </>
  );
}
