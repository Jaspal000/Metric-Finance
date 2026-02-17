import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { getAllBlogPosts } from '@/data/blog';
import { Clock, ArrowRight } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/utils/seo';

const Blog: React.FC = () => {
  const posts = getAllBlogPosts();
  
  const categories = [...new Set(posts.map(post => post.category))];

  const seo = {
    title: 'Financial Insights & Guides | Metric Finance Blog',
    description: 'Expert articles on mortgages, retirement planning, taxes, and personal finance. Make smarter financial decisions with Metric Finance.',
    canonical: 'https://metricfinance.com/blog',
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://metricfinance.com/' },
    { name: 'Blog', url: 'https://metricfinance.com/blog' },
  ]);

  return (
    <>
      <SEO seo={seo} schema={breadcrumbSchema} />
      
      <main>
        {/* Hero */}
        <section className="bg-slate-900 py-16 md:py-24">
          <div className="metric-container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Financial Insights & Guides
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Expert articles to help you make smarter financial decisions. 
                From mortgages to retirement planning, we've got you covered.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white border-b border-slate-200">
          <div className="metric-container py-6">
            <div className="flex flex-wrap gap-3">
              <Link
                to="/blog"
                className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium"
              >
                All
              </Link>
              {categories.map(category => (
                <Link
                  key={category}
                  to={`/blog?category=${category}`}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="metric-section bg-slate-50">
          <div className="metric-container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} min read
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-sm text-slate-500">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="metric-section bg-white">
          <div className="metric-container">
            <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Get Financial Tips Delivered
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8">
                Subscribe to our newsletter for weekly financial insights, calculator updates, 
                and exclusive guides.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-slate-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
