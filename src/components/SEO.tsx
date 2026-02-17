import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { SEOData } from '@/types';

interface SEOProps {
  seo: SEOData;
  schema?: object | object[];
}

export const SEO: React.FC<SEOProps> = ({ seo, schema }) => {
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:type" content={seo.ogType || 'website'} />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content={seo.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}

      {/* Schema.org JSON-LD */}
      {schemas.map((s, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
