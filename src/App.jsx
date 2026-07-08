import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import SEO from './components/SEO';
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';

// Lazy-loaded pages
const LoginPortalPage = lazy(() => import('./pages/LoginPortalPage'));
const SignupPortalPage = lazy(() => import('./pages/SignupPortalPage'));
const LegalPage = lazy(() => import('./components/LegalPage'));

// Lazy-loaded footer for legal pages
const Footer = lazy(() => import('./components/Footer'));

const legalRoutes = [
  '/privacy',
  '/terms',
  '/security',
  '/accessibility',
  '/cookies',
  '/acceptable-use',
  '/ai-transparency',
  '/childrens-privacy',
  '/community-guidelines',
  '/contact-support',
  '/content-moderation',
  '/copyright-ip',
  '/data-deletion',
];

// Wrapper for legal pages (includes Navbar + Footer)
const LegalPageWrapper = ({ path }) => (
  <>
    <SEO
      title="CiviSence | Legal Documentation"
      description="Review the CiviSence privacy, security, accessibility, terms, and cookie policies."
      canonical={`https://civisence.in${path}`}
    />
    <Navbar />
    <main id="main-content" aria-label="Main Content">
      <Suspense fallback={<div className="py-24 flex justify-center items-center text-gray-400" aria-live="polite">Loading legal content...</div>}>
        <LegalPage currentPath={path} />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </>
);

// Handles routes that should scroll to a section on the homepage
const ScrollRedirect = ({ hash }) => {
  useEffect(() => {
    window.location.replace(`/${hash}`);
  }, [hash]);
  return null;
};

function App() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <SEO />
              <Navbar />
              <main id="main-content" aria-label="Main Content">
                <HomePage />
              </main>
            </>
          }
        />

        {/* Login Portal */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
              <LoginPortalPage />
            </Suspense>
          }
        />

        {/* Signup Portal */}
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
              <SignupPortalPage />
            </Suspense>
          }
        />

        {/* Section-scroll convenience routes */}
        <Route path="/features" element={<ScrollRedirect hash="#roles" />} />
        <Route path="/how-it-works" element={<ScrollRedirect hash="#how-it-works" />} />
        <Route path="/organizations" element={<ScrollRedirect hash="#for-organizations" />} />
        <Route path="/analytics" element={<ScrollRedirect hash="#dashboard" />} />
        <Route path="/faq" element={<ScrollRedirect hash="#faq" />} />
        <Route path="/contact" element={<ScrollRedirect hash="#contact" />} />

        {/* Legal routes */}
        {legalRoutes.map((path) => (
          <Route
            key={path}
            path={path}
            element={<LegalPageWrapper path={path} />}
          />
        ))}

        {/* Catch-all: redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <VercelAnalytics />
    </>
  );
}

export default App;

