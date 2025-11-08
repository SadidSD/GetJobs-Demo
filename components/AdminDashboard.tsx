"use client";

import { useState } from "react";
import { Users, TrendingUp, CheckCircle, XCircle, Clock, FileText, Eye, UserCheck, UserX, MoreVertical, Shield, Award, Building2, Mail, Calendar, Star } from "lucide-react";

// Mock platform statistics
const mockStats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "blue"
  },
  {
    title: "Active Jobs",
    value: "3,421",
    change: "+8.2%",
    trend: "up",
    icon: FileText,
    color: "green"
  },
  {
    title: "Matches Made",
    value: "8,932",
    change: "+23.1%",
    trend: "up",
    icon: TrendingUp,
    color: "purple"
  },
  {
    title: "Verification Rate",
    value: "94.2%",
    change: "+2.3%",
    trend: "up",
    icon: CheckCircle,
    color: "orange"
  }
];

// Mock user management data
const mockUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    role: "Job Seeker",
    status: "active",
    verificationStatus: "verified",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    matchScore: 87
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    role: "Employer",
    status: "active",
    verificationStatus: "pending",
    joinDate: "2024-02-20",
    lastActive: "1 day ago",
    matchScore: 92
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    role: "Job Seeker",
    status: "suspended",
    verificationStatus: "rejected",
    joinDate: "2024-01-10",
    lastActive: "1 week ago",
    matchScore: 78
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    role: "Job Seeker",
    status: "active",
    verificationStatus: "verified",
    joinDate: "2024-03-05",
    lastActive: "30 minutes ago",
    matchScore: 95
  }
];

// Mock verification queue
const mockVerificationQueue = [
  {
    id: 1,
    user: {
      name: "Emma Thompson",
      email: "emma.thompson@email.com",
      avatar: null,
      role: "Job Seeker"
    },
    type: "Identity Verification",
    submittedAt: "2 hours ago",
    documents: ["Government ID", "Proof of Address"],
    status: "pending"
  },
  {
    id: 2,
    user: {
      name: "Frank Miller",
      email: "frank.miller@email.com",
      avatar: null,
      role: "Employer"
    },
    type: "Company Verification",
    submittedAt: "4 hours ago",
    documents: ["Business License", "Tax ID"],
    status: "pending"
  },
  {
    id: 3,
    user: {
      name: "Grace Lee",
      email: "grace.lee@email.com",
      avatar: null,
      role: "Job Seeker"
    },
    type: "Skill Verification",
    submittedAt: "6 hours ago",
    documents: ["Certificates", "Portfolio"],
    status: "pending"
  }
];

// Mock recent activity
const mockActivity = [
  {
    id: 1,
    type: "user_verified",
    user: "Alice Johnson",
    action: "completed identity verification",
    timestamp: "30 minutes ago",
    icon: CheckCircle,
    color: "green"
  },
  {
    id: 2,
    type: "job_posted",
    user: "TechCorp Inc.",
    action: "posted 3 new job positions",
    timestamp: "1 hour ago",
    icon: FileText,
    color: "blue"
  },
  {
    id: 3,
    type: "match_made",
    user: "Bob Smith",
    action: "matched with Senior Developer role",
    timestamp: "2 hours ago",
    icon: TrendingUp,
    color: "purple"
  },
  {
    id: 4,
    type: "user_suspended",
    user: "John Doe",
    action: "account suspended due to policy violation",
    timestamp: "3 hours ago",
    icon: XCircle,
    color: "red"
  },
  {
    id: 5,
    type: "verification_submitted",
    user: "Emma Thompson",
    action: "submitted identity verification documents",
    timestamp: "4 hours ago",
    icon: Clock,
    color: "orange"
  }
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "suspended":
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "green":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "purple":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
      case "orange":
        return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Admin Header */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Platform management and oversight
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
                Export Report
              </button>
            </div>
          </div>

          {/* Admin Navigation */}
          <div className="flex space-x-8 border-b border-zinc-200 dark:border-zinc-800">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "users", label: "Users", icon: Users },
              { id: "verification", label: "Verification", icon: CheckCircle },
              { id: "activity", label: "Activity", icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition ${
                  selectedTab === tab.id
                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                    : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mockStats.map((stat, index) => (
                <div key={index} className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {stat.title}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                        {stat.value}
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <span className={`text-sm font-medium ${
                          stat.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          from last month
                        </span>
                      </div>
                    </div>
                    <div className={`rounded-lg p-3 ${getColorClasses(stat.color)}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Recent Activity
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {mockActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${getColorClasses(activity.color)}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-900 dark:text-zinc-100">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {selectedTab === "users" && (
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  User Management
                </h2>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                  <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
                    Filter
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Verification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-medium">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {user.name}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-zinc-900 dark:text-zinc-100">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(user.verificationStatus)}`}>
                          {user.verificationStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-zinc-900 dark:text-zinc-100">
                          {user.joinDate}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-zinc-900 dark:text-zinc-100">
                          {user.lastActive}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800">
                            <UserCheck className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800">
                            <UserX className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Verification Tab */}
        {selectedTab === "verification" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Verification Queue ({mockVerificationQueue.length})
                </h2>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-500">
                    Batch Approve
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {mockVerificationQueue.map((item) => (
                  <div key={item.id} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-medium">
                          {item.user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-zinc-900 dark:text-zinc-100">
                            {item.user.name}
                          </p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {item.user.email} • {item.user.role}
                          </p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                            {item.type}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.documents.map((doc, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                              >
                                {doc}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                            Submitted {item.submittedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-500">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-500">
                          <XCircle className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {selectedTab === "activity" && (
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                System Activity
              </h2>
              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                  Filter
                </button>
                <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
                  Export
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {mockActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`rounded-full p-2 ${getColorClasses(activity.color)}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-900 dark:text-zinc-100">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}