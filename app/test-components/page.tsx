"use client";

import { useState } from "react";
import JobDetailPage from "@/components/JobDetailPage";
import ApplicationModal from "@/components/ApplicationModal";
import AdminDashboard from "@/components/AdminDashboard";

// Mock job data for testing
const mockJob = {
  id: 1,
  title: "Senior Frontend Developer",
  company: {
    name: "TechCorp Inc.",
    logo: null,
    industry: "Technology",
    size: "1000-5000",
    founded: "2015",
    website: "techcorp.com"
  },
  description: `We are looking for an experienced Senior Frontend Developer to join our innovative team at TechCorp Inc. You will be responsible for building and maintaining our cutting-edge web applications using modern JavaScript frameworks and technologies.

**Key Responsibilities:**
• Design and develop user-facing features using React and TypeScript
• Build reusable components and front-end libraries for future use
• Translate designs and wireframes into high-quality code
• Optimize components for maximum performance across a vast array of web-capable devices and browsers
• Collaborate with cross-functional teams to define, design, and ship new features

**Requirements:**
• 5+ years of experience in frontend development
• Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model
• Thorough understanding of React.js and its core principles
• Experience with popular React.js workflows (such as Flux or Redux)
• Familiarity with newer specifications of EcmaScript
• Experience with data structure libraries (e.g., Immutable.js)
• Knowledge of isomorphic React is a plus
• Familiarity with RESTful APIs
• Knowledge of modern authorization mechanisms, such as JSON Web Token
• Familiarity with modern front-end build pipelines and tools
• Experience with common front-end development tools such as Babel, Webpack, NPM, etc.
• Ability to understand business requirements and translate them into technical requirements
• A knack for benchmarking and optimization

**Benefits:**
• Competitive salary ($120k - $150k)
• Remote work flexibility
• Health, dental, and vision insurance
• 401(k) with company matching
• Professional development budget
• Latest MacBook Pro and equipment
• Flexible PTO policy`,
  salary: "$120k - $150k",
  location: "San Francisco, CA (Remote)",
  experience: "5+ years",
  employmentType: "Full-time",
  posted: "2 days ago",
  applicants: 45,
  matchPercentage: 92,
  requiredSkills: ["React", "TypeScript", "JavaScript", "Node.js", "GraphQL", "AWS", "Docker", "Kubernetes"],
  niceToHaveSkills: ["Vue.js", "Python", "MongoDB", "Redis"]
};

// Mock user skills for match analysis
const mockUserSkills = ["React", "TypeScript", "JavaScript", "Node.js", "GraphQL", "AWS", "HTML", "CSS", "Git"];

export default function TestComponents() {
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const handleApplyNow = () => {
    setShowApplicationModal(true);
  };

  const handleApplicationSuccess = () => {
    setShowApplicationModal(false);
    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Component Testing Hub
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Test all the new components we've created
          </p>
        </div>

        {/* Component Selection Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-3 w-fit">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Job Detail Page
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Comprehensive job listing with skill matching and company information
            </p>
            <button
              onClick={() => setShowJobDetail(true)}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Test Job Detail
            </button>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-4 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 p-3 w-fit">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Application Modal
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Multi-step application process with AI summary and file uploads
            </p>
            <button
              onClick={() => setShowApplicationModal(true)}
              className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-500"
            >
              Test Application Modal
            </button>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-4 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-3 w-fit">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Admin Dashboard
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Platform management with statistics and user verification
            </p>
            <button
              onClick={() => setShowAdminDashboard(true)}
              className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500"
            >
              Test Admin Dashboard
            </button>
          </div>
        </div>

        {/* Responsive Design Test */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Responsive Design Test
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            All components are fully responsive and work seamlessly across desktop, tablet, and mobile devices.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <div className="text-2xl mb-2">💻</div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Desktop</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">1200px+</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <div className="text-2xl mb-2">📱</div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Tablet</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">768px-1199px</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <div className="text-2xl mb-2">📱</div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Mobile</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">320px-767px</p>
            </div>
          </div>
        </div>
      </div>

      {/* Component Modals */}
      {showJobDetail && (
        <JobDetailPage
          job={mockJob}
          userSkills={mockUserSkills}
          onApplyNow={handleApplyNow}
          onClose={() => setShowJobDetail(false)}
        />
      )}

      {showApplicationModal && (
        <ApplicationModal
          job={mockJob}
          onClose={() => setShowApplicationModal(false)}
          onSuccess={handleApplicationSuccess}
        />
      )}

      {showAdminDashboard && (
        <div className="fixed inset-0 z-50 bg-zinc-50 dark:bg-zinc-900">
          <AdminDashboard />
          <button
            onClick={() => setShowAdminDashboard(false)}
            className="fixed top-4 right-4 rounded-full bg-zinc-900 dark:bg-zinc-700 p-2 text-white transition hover:bg-zinc-800 dark:hover:bg-zinc-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}