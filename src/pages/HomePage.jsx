import React, { Suspense, lazy } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Benefits from "../components/Benefits";
import Categories from "../components/Categories";

// Code splitting with React.lazy for performance optimization (Core Web Vitals)
const SignupPaths = lazy(() => import("../components/SignupPaths"));
const HowItWorks = lazy(() => import("../components/HowItWorks"));
const HowItWorksOrg = lazy(() => import("../components/HowItWorksOrg"));
const MultiOrg = lazy(() => import("../components/MultiOrg"));
const Comparison = lazy(() => import("../components/Comparison"));
const Features = lazy(() => import("../components/Features"));
const DashboardPreview = lazy(() => import("../components/DashboardPreview"));
const OrgFeatures = lazy(() => import("../components/OrgFeatures"));
const Tracking = lazy(() => import("../components/Tracking"));
const Analytics = lazy(() => import("../components/Analytics"));
const WorkflowExample = lazy(() => import("../components/WorkflowExample"));
const DownloadApp = lazy(() => import("../components/DownloadApp"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const FAQ = lazy(() => import("../components/FAQ"));
const Contact = lazy(() => import("../components/Contact"));
const CTA = lazy(() => import("../components/CTA"));
const Footer = lazy(() => import("../components/Footer"));

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <MultiOrg />
      <Analytics />
      <Categories />
      <DashboardPreview />
      <Comparison />
      <Contact />
      <CTA />
      <Tracking />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
