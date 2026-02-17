import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { getCalculatorsByRegion } from '@/data/regions';
import type { Region } from '@/types';

interface NavCategory {
  name: string;
  region: Region;
  href: string;
  calculators: { name: string; href: string; category: string }[];
}

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build navigation categories with calculators
  const navCategories: NavCategory[] = [
    {
      name: 'US Tools',
      region: 'us',
      href: '/us',
      calculators: getCalculatorsByRegion('us').map(c => ({
        name: c.shortName,
        href: `/us/${c.slug}`,
        category: c.category,
      })),
    },
    {
      name: 'UK Tools',
      region: 'uk',
      href: '/uk',
      calculators: getCalculatorsByRegion('uk').map(c => ({
        name: c.shortName,
        href: `/uk/${c.slug}`,
        category: c.category,
      })),
    },
    {
      name: 'Canada',
      region: 'ca',
      href: '/ca',
      calculators: getCalculatorsByRegion('ca').map(c => ({
        name: c.shortName,
        href: `/ca/${c.slug}`,
        category: c.category,
      })),
    },
    {
      name: 'Australia',
      region: 'au',
      href: '/au',
      calculators: getCalculatorsByRegion('au').map(c => ({
        name: c.shortName,
        href: `/au/${c.slug}`,
        category: c.category,
      })),
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Handle dropdown hover with delay for better UX
  const handleMouseEnter = (categoryName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(categoryName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Handle accordion toggle (auto-close others)
  const toggleAccordion = (categoryName: string) => {
    setExpandedAccordion(expandedAccordion === categoryName ? null : categoryName);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedAccordion(null);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="metric-container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo variant="full" size="md" />
          </Link>

          {/* Desktop Navigation with Hover Dropdowns */}
          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {navCategories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={category.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(category.href)
                      ? 'text-slate-900 bg-slate-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {category.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === category.name ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {/* Dropdown Menu with 10px invisible bridge */}
                {activeDropdown === category.name && (
                  <div className="absolute top-full left-0 pt-2.5 z-50">
                    {/* Invisible bridge to prevent flicker */}
                    <div className="absolute -top-2.5 left-0 right-0 h-2.5 bg-transparent" />
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 py-2 min-w-[240px]">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          {category.name} Calculators
                        </span>
                      </div>
                      {category.calculators.map((calc) => (
                        <Link
                          key={calc.href}
                          to={calc.href}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <span>{calc.name}</span>
                          <span className="text-xs text-slate-400">{calc.category}</span>
                        </Link>
                      ))}
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <Link
                          to={category.href}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          View All
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/blog"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/blog')
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Blog
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/us/mortgage-calculator"
              className="metric-btn-primary text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Slide-out Drawer with Accordions */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {/* Home Link */}
              <Link
                to="/"
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {/* Category Accordions */}
              {navCategories.map((category) => (
                <div key={category.name} className="border-b border-slate-100 last:border-0">
                  <button
                    onClick={() => toggleAccordion(category.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(category.href)
                        ? 'text-slate-900 bg-slate-100'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    aria-expanded={expandedAccordion === category.name}
                  >
                    <span>{category.name}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        expandedAccordion === category.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Accordion Content */}
                  {expandedAccordion === category.name && (
                    <div className="px-4 pb-3 space-y-1">
                      {category.calculators.map((calc) => (
                        <Link
                          key={calc.href}
                          to={calc.href}
                          className="flex items-center justify-between py-2.5 pl-4 pr-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                        >
                          <span>{calc.name}</span>
                          <span className="text-xs text-slate-400">{calc.category}</span>
                        </Link>
                      ))}
                      <Link
                        to={category.href}
                        className="flex items-center gap-2 py-2.5 pl-4 text-sm font-medium text-blue-600"
                      >
                        View All {category.name}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              {/* Blog Link */}
              <Link
                to="/blog"
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                  isActive('/blog')
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Blog
              </Link>

              {/* CTA */}
              <div className="pt-4 mt-4 border-t border-slate-200">
                <Link
                  to="/us/mortgage-calculator"
                  className="metric-btn-primary w-full justify-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
