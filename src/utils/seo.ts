import type { SEOData, FAQ } from '@/types';

export const generateMetaTags = (seo: SEOData): string => {
  const tags = [
    `<title>${seo.title}</title>`,
    `<meta name="description" content="${seo.description}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<meta property="og:title" content="${seo.title}" />`,
    `<meta property="og:description" content="${seo.description}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:type" content="${seo.ogType || 'website'}" />`,
    seo.ogImage ? `<meta property="og:image" content="${seo.ogImage}" />` : '',
    `<meta name="twitter:card" content="${seo.twitterCard || 'summary_large_image'}" />`,
    `<meta name="twitter:title" content="${seo.title}" />`,
    `<meta name="twitter:description" content="${seo.description}" />`,
    seo.ogImage ? `<meta name="twitter:image" content="${seo.ogImage}" />` : '',
  ];
  
  return tags.filter(Boolean).join('\n');
};

export const generateFAQSchema = (faqs: FAQ[]): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateCalculatorSchema = (name: string, description: string, url: string): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
};

export const generateOrganizationSchema = (): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Metric Finance',
    url: 'https://metricfinance.com',
    logo: 'https://metricfinance.com/logo.png',
    description: 'Precision-driven financial decision tools. Free calculators for mortgages, taxes, retirement, and investments.',
    sameAs: [
      'https://twitter.com/metricfinance',
      'https://linkedin.com/company/metricfinance',
    ],
  };
};

export const defaultSEO: SEOData = {
  title: 'Metric Finance | Free Financial Calculators for Smarter Decisions',
  description: 'Plan mortgages, taxes, retirement, and investments with accurate, instant financial calculators. 100% free, no signup required.',
  canonical: 'https://metricfinance.com',
  ogType: 'website',
  twitterCard: 'summary_large_image',
};

export const getCalculatorSEO = (
  name: string,
  region: string,
  slug: string
): SEOData => ({
  title: `${name} | Metric Finance`,
  description: `Free ${name.toLowerCase()}. Calculate accurately and instantly with Metric Finance's professional financial tools. No signup required.`,
  canonical: `https://metricfinance.com/${region}/${slug}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
});
