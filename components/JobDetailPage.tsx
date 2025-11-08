"use client";

import { useState } from "react";
import { MapPin, DollarSign, Briefcase, Calendar, Users, Clock, Star, CheckCircle2, XCircle } from "lucide-react";
import ApplicationModal from "./ApplicationModal";

// Mock job data
const mockJob = {
  id: 1,
  title: "Senior Frontend Developer",
  company: {
    name: "TechCorp Inc.",
    logo: "",
    industry: "Technology",
    size: "1000-5000 employees",
    founded: "2010",
    website: "techcorp.com",
    description: "TechCorp is a leading technology company specializing in innovative software solutions. We're committed to creating cutting-edge products that transform how businesses operate."
  },
  matchPercentage: 92,
  skills: {
    required: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    niceToHave: ["Docker", "Kubernetes", "CI/CD", "Agile"],
    missing: ["Docker", "Kubernetes"]
  },
  salary: "$120k - $150k",
  location: "San Francisco, CA (Remote)",
  employmentType: "Full-time",
  experience: "5+ years",
  posted: "2 days ago",
  applicants: 45,
  description: `We are looking for an experienced Senior Frontend Developer to join our growing team at TechCorp. You will be responsible for building and maintaining our web applications using modern React and TypeScript.

**Key Responsibilities:**
• Develop and maintain responsive web applications using React and TypeScript
• Collaborate with designers and backend developers to create seamless user experiences
• Implement complex UI components and animations
• Optimize applications for maximum speed and scalability
• Participate in code reviews and mentor junior developers
• Stay up-to-date with emerging technologies and best practices

**Requirements:**
• 5+ years of experience in frontend development
• Strong proficiency in React, TypeScript, and modern JavaScript
• Experience with state management (Redux, Context API, or similar)
• Knowledge of REST APIs and GraphQL
• Understanding of responsive design and cross-browser compatibility
• Excellent communication and teamwork skills

**Nice to Have:**
• Experience with Docker and containerization
• Knowledge of CI/CD pipelines
• Familiarity with cloud platforms (AWS, Azure, or GCP)
• Experience with testing frameworks (Jest, React Testing Library)`,
  benefits: [
    "Health, dental, and vision insurance",
    "401(k) with company matching",
    "Flexible work arrangements",
    "Professional development budget",
    "Gym membership reimbursement",
    "Stock options"
  ]
};

// Mock user skills for match calculation
const userSkills = ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "PostgreSQL", "Git"];

export default function JobDetailPage() {
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const calculateSkillMatch = () => {
    const requiredSkills = mockJob.skills.required;
    const matchingSkills = requiredSkills.filter(skill => userSkills.includes(skill));
    const missingSkills = requiredSkills.filter(skill => !userSkills.includes(skill));
    
    return {
      matching: matchingSkills,
      missing: missingSkills,
      percentage: Math.round((matchingSkills.length / requiredSkills.length) * 100)
    };
  };

  const skillMatch = calculateSkillMatch();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                      {mockJob.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{mockJob.company.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{mockJob.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {mockJob.matchPercentage}% Match
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                  <DollarSign className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Salary</p>
                  <p className="text-sm font-semibold">{mockJob.salary}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                  <Clock className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Experience</p>
                  <p className="text-sm font-semibold">{mockJob.experience}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                  <Calendar className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Posted</p>
                  <p className="text-sm font-semibold">{mockJob.posted}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                  <Users className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Applicants</p>
                  <p className="text-sm font-semibold">{mockJob.applicants}</p>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setShowApplicationModal(true)}
                className="w-full rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg active:scale-[0.98]"
              >
                Apply Now
              </button>
            </div>

            {/* Job Description */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xl font-bold mb-4">Job Description</h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <div className="whitespace-pre-line text-zinc-700 dark:text-zinc-300">
                  {mockJob.description}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xl font-bold mb-4">Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockJob.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Match Widget */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-bold mb-4">Skill Match Analysis</h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Match</span>
                  <span className="text-sm font-bold text-green-600">{skillMatch.percentage}%</span>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2 dark:bg-zinc-700">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skillMatch.percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Matching Skills ({skillMatch.matching.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillMatch.matching.map((skill, index) => (
                      <span key={index} className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {skillMatch.missing.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-600 mb-2 flex items-center gap-1">
                      <XCircle className="h-4 w-4" />
                      Missing Skills ({skillMatch.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillMatch.missing.map((skill, index) => (
                        <span key={index} className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Company Profile Card */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-bold mb-4">About {mockJob.company.name}</h3>
              <div className="mb-4">
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-indigo-400 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl mb-3">
                  {mockJob.company.name.charAt(0)}
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  {mockJob.company.description}
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Industry</span>
                  <span className="font-medium">{mockJob.company.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Company Size</span>
                  <span className="font-medium">{mockJob.company.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Founded</span>
                  <span className="font-medium">{mockJob.company.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Website</span>
                  <a href={`https://${mockJob.company.website}`} className="font-medium text-indigo-600 hover:underline">
                    {mockJob.company.website}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">4.2/5</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">(127 reviews)</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Great place to work with excellent benefits and work-life balance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <ApplicationModal
          job={mockJob}
          onClose={() => setShowApplicationModal(false)}
          onSuccess={() => {
            setShowApplicationModal(false);
            alert('Application submitted successfully!');
          }}
        />
      )}
    </div>
  );
}