import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { getBlogPostBySlug } from '@/data/blog';
import { generateBreadcrumbSchema } from '@/utils/seo';
import { Clock, ArrowLeft, User, Calendar } from 'lucide-react';
// ReactMarkdown removed - using custom renderer

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');

  if (!post) {
    return <div>Blog post not found</div>;
  }

  const seo = {
    title: `${post.title} | Metric Finance Blog`,
    description: post.excerpt,
    canonical: `https://metricfinance.com/blog/${post.slug}`,
    ogType: 'article',
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://metricfinance.com/' },
    { name: 'Blog', url: 'https://metricfinance.com/blog' },
    { name: post.title, url: `https://metricfinance.com/blog/${post.slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Metric Finance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://metricfinance.com/logo.png',
      },
    },
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('## ')) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc pl-6 mb-4 space-y-2">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc pl-6 mb-4 space-y-2">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-slate-900 mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        inList = true;
        listItems.push(
          <li key={index} className="text-slate-600">
            {trimmed.replace('- ', '')}
          </li>
        );
      } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc pl-6 mb-4 space-y-2">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(
          <p key={index} className="font-semibold text-slate-900 mb-4">
            {trimmed.replace(/\*\*/g, '')}
          </p>
        );
      } else if (trimmed === '') {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc pl-6 mb-4 space-y-2">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
      } else if (trimmed) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc pl-6 mb-4 space-y-2">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(
          <p key={index} className="text-slate-600 mb-4 leading-relaxed">
            {trimmed}
          </p>
        );
      }
    });

    if (inList && listItems.length > 0) {
      elements.push(<ul key="final-list" className="list-disc pl-6 mb-4 space-y-2">{listItems}</ul>);
    }

    return elements;
  };

  return (
    <>
      <SEO seo={seo} schema={[breadcrumbSchema, articleSchema]} />
      
      <main>
        {/* Back Link */}
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="metric-container py-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <section className="bg-white py-12 md:py-16">
          <div className="metric-container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min read
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="metric-section bg-white">
          <div className="metric-container">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="metric-section bg-slate-50">
          <div className="metric-container">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              More Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                to="/blog/understanding-piti-mortgage-payments"
                className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Understanding PITI: What Goes Into Your Mortgage Payment
                </h3>
                <p className="text-sm text-slate-600">
                  Break down the four components of your mortgage payment.
                </p>
              </Link>
              <Link
                to="/blog/401k-contribution-limits-2026"
                className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  401(k) Contribution Limits for 2025 & 2026
                </h3>
                <p className="text-sm text-slate-600">
                  Stay up-to-date with the latest contribution limits.
                </p>
              </Link>
              <Link
                to="/blog/understanding-marginal-vs-effective-tax-rate"
                className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Marginal vs. Effective Tax Rate
                </h3>
                <p className="text-sm text-slate-600">
                  Learn what you actually pay in taxes.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPost;
