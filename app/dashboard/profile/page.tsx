"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, X, Plus, Trash2 } from "lucide-react";

type Tab = "personal" | "skills" | "experience" | "education";

type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
};

type Skill = {
  id: string;
  name: string;
  proficiency: "beginner" | "intermediate" | "advanced" | "expert";
};

type Experience = {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
};

export default function ProfileEditorPage() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [hasChanges, setHasChanges] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer with 5+ years of experience building scalable web applications.",
  });

  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "React", proficiency: "expert" },
    { id: "2", name: "TypeScript", proficiency: "advanced" },
    { id: "3", name: "Node.js", proficiency: "advanced" },
    { id: "4", name: "GraphQL", proficiency: "intermediate" },
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      startDate: "2021-01",
      endDate: "",
      current: true,
      description: "Led frontend development for multiple products, mentored junior developers.",
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "StartupXYZ",
      startDate: "2019-06",
      endDate: "2020-12",
      current: false,
      description: "Built and maintained React applications, collaborated with cross-functional teams.",
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      institution: "Stanford University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
    },
  ]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "personal", label: "Personal Info" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
  ];

  const handleSave = () => {
    // Save logic here
    setHasChanges(false);
    alert("Profile saved successfully!");
  };

  const handleCancel = () => {
    // Reset to original values
    setHasChanges(false);
    window.location.reload();
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      proficiency: "intermediate",
    };
    setSkills([...skills, newSkill]);
    setHasChanges(true);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
    setHasChanges(true);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setSkills(
      skills.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
    setHasChanges(true);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setExperiences([...experiences, newExp]);
    setHasChanges(true);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
    setHasChanges(true);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(
      experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
    setHasChanges(true);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    };
    setEducation([...education, newEdu]);
    setHasChanges(true);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter((e) => e.id !== id));
    setHasChanges(true);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(
      education.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
    setHasChanges(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Edit Profile</h1>
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 p-6">
        {/* Main Editor */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="mb-6 border-b border-zinc-200 dark:border-zinc-800">
            <nav className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => {
                      setPersonalInfo({ ...personalInfo, name: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => {
                      setPersonalInfo({ ...personalInfo, email: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => {
                      setPersonalInfo({ ...personalInfo, phone: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Location</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => {
                      setPersonalInfo({ ...personalInfo, location: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Bio</label>
                  <textarea
                    value={personalInfo.bio}
                    onChange={(e) => {
                      setPersonalInfo({ ...personalInfo, bio: e.target.value });
                      setHasChanges(true);
                    }}
                    rows={4}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                      />
                    </div>
                    <select
                      value={skill.proficiency}
                      onChange={(e) => updateSkill(skill.id, "proficiency", e.target.value)}
                      className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addSkill}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 px-4 py-3 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  <Plus className="h-4 w-4" />
                  Add Skill
                </button>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="mb-4 flex items-start justify-between">
                      <h3 className="font-semibold">Experience Entry</h3>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium">Job Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">Start Date</label>
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">End Date</label>
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          disabled={exp.current}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="mb-2 flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                          className="rounded border-zinc-300"
                        />
                        <span className="text-sm">Current position</span>
                      </label>
                    </div>
                    <div className="mt-4">
                      <label className="mb-1 block text-sm font-medium">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        rows={3}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addExperience}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 px-4 py-3 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  <Plus className="h-4 w-4" />
                  Add Experience
                </button>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="mb-4 flex items-start justify-between">
                      <h3 className="font-semibold">Education Entry</h3>
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium">Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">Field of Study</label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">Start Date</label>
                        <input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">End Date</label>
                        <input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addEducation}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 px-4 py-3 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  <Plus className="h-4 w-4" />
                  Add Education
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview Sidebar */}
        <aside className="hidden w-96 shrink-0 lg:block">
          <div className="sticky top-24">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-lg font-semibold">Live Preview</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Personal Information</h4>
                  <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <p><strong>Name:</strong> {personalInfo.name}</p>
                    <p><strong>Email:</strong> {personalInfo.email}</p>
                    <p><strong>Location:</strong> {personalInfo.location}</p>
                    <p className="mt-2">{personalInfo.bio}</p>
                  </div>
                </div>

                {activeTab === "skills" && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills
                        .filter((s) => s.name)
                        .map((skill) => (
                          <span
                            key={skill.id}
                            className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
                          >
                            {skill.name} ({skill.proficiency})
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {activeTab === "experience" && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Experience</h4>
                    <div className="space-y-3">
                      {experiences
                        .filter((e) => e.title && e.company)
                        .map((exp) => (
                          <div key={exp.id} className="border-l-2 border-indigo-200 pl-3 dark:border-indigo-800">
                            <p className="font-medium text-zinc-900 dark:text-zinc-100">{exp.title}</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{exp.company}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-500">
                              {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {activeTab === "education" && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Education</h4>
                    <div className="space-y-2">
                      {education
                        .filter((e) => e.institution)
                        .map((edu) => (
                          <div key={edu.id}>
                            <p className="font-medium text-zinc-900 dark:text-zinc-100">{edu.degree}</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{edu.institution}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-500">{edu.field}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

