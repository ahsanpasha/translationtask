"use client";

import { useState, lazy, Suspense, useEffect } from "react";
import {
  fetchUsers,
  fetchPosts,
  transformUserToTableData,
  transformPostToMessage,
  type User,
  type Post
} from "@/services/api";

const DashboardStats = lazy(() => import("@/components/dashboard/DashboardStats"));
const DashboardTable = lazy(() => import("@/components/dashboard/DashboardTable"));
const RecentMessages = lazy(() => import("@/components/dashboard/RecentMessages"));
const CallLogsPanel = lazy(() => import("@/components/dashboard/CallLogsPanel"));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        <p className="text-sm font-medium text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

function ErrorDisplay({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md text-center">
        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-red-900 mb-2">Error Loading Data</h3>
        <p className="text-sm text-red-700 mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"stats" | "messages" | "calls">("stats");

  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [errorUsers, setErrorUsers] = useState<string | null>(null);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);

  const statsCards = [
    { label: "Active Users", value: "2,350", change: "+180.1% from last month", changeType: "positive" as const },
    { label: "New Messages", value: "12,234", change: "+19% from last month", changeType: "positive" as const },
    { label: "Call Volume", value: "573", change: "-12% from last month", changeType: "negative" as const },
  ];

  const callLogsData = [
    { id: "LOG-1", type: "Incoming" as const, contact: "Ahsan Khan", duration: "12m 30s", timestamp: "10:15 AM", status: "Completed" as const },
    { id: "LOG-2", type: "Outgoing" as const, contact: "Zain Ali", duration: "05m 12s", timestamp: "09:45 AM", status: "Completed" as const },
    { id: "LOG-3", type: "Missed" as const, contact: "Unknown", duration: "00m 00s", timestamp: "08:20 AM", status: "Missed" as const },
    { id: "LOG-4", type: "Incoming" as const, contact: "Tayyab Ahmed", duration: "25m 00s", timestamp: "Yesterday", status: "Completed" as const },
    { id: "LOG-5", type: "Outgoing" as const, contact: "Iqra Noor", duration: "02m 45s", timestamp: "Yesterday", status: "Cancelled" as const },
    { id: "LOG-6", type: "Incoming" as const, contact: "Hamza Sheikh", duration: "08m 15s", timestamp: "Yesterday", status: "Completed" as const },
    { id: "LOG-7", type: "Missed" as const, contact: "Ayesha Malik", duration: "00m 00s", timestamp: "2 days ago", status: "Missed" as const },
    { id: "LOG-8", type: "Outgoing" as const, contact: "Usman Raza", duration: "15m 45s", timestamp: "2 days ago", status: "Completed" as const },
    { id: "LOG-9", type: "Incoming" as const, contact: "Fatima Zahra", duration: "03m 20s", timestamp: "2 days ago", status: "Completed" as const },
    { id: "LOG-10", type: "Outgoing" as const, contact: "Bilal Hussain", duration: "10m 10s", timestamp: "3 days ago", status: "Completed" as const },
    { id: "LOG-11", type: "Incoming" as const, contact: "Sara Ahmed", duration: "07m 50s", timestamp: "3 days ago", status: "Completed" as const },
    { id: "LOG-12", type: "Missed" as const, contact: "Unknown", duration: "00m 00s", timestamp: "3 days ago", status: "Missed" as const },
  ];

  const loadUsers = async () => {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const data = await fetchUsers();
      const transformed = data.map((user, index) => transformUserToTableData(user, index));
      setUsers(transformed);
    } catch (error) {
      setErrorUsers(error instanceof Error ? error.message : "Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadPosts = async () => {
    setLoadingPosts(true);
    setErrorPosts(null);
    try {
      const data = await fetchPosts(30); // Fetch more for pagination demonstration
      const transformed = data.map((post, index) => transformPostToMessage(post, index));
      setPosts(transformed);
    } catch (error) {
      setErrorPosts(error instanceof Error ? error.message : "Failed to load messages");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadUsers();
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="mx-auto max-w-7xl">


        <div className="mb-8">
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100 max-w-md">
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === "stats"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
              User Stats
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === "messages"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              Messages
            </button>
            <button
              onClick={() => setActiveTab("calls")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === "calls"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Call Logs
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <section className="transition-all duration-300">
          {activeTab === "stats" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Suspense fallback={<div className="h-32 bg-white rounded-xl animate-pulse" />}>
                <DashboardStats stats={statsCards} />
              </Suspense>

              {loadingUsers ? (
                <LoadingSpinner />
              ) : errorUsers ? (
                <ErrorDisplay message={errorUsers} onRetry={loadUsers} />
              ) : (
                <Suspense fallback={<LoadingSpinner />}>
                  <DashboardTable data={users} />
                </Suspense>
              )}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {loadingPosts ? (
                <LoadingSpinner />
              ) : errorPosts ? (
                <ErrorDisplay message={errorPosts} onRetry={loadPosts} />
              ) : (
                <Suspense fallback={<LoadingSpinner />}>
                  <RecentMessages messages={posts} />
                </Suspense>
              )}
            </div>
          )}

          {activeTab === "calls" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Suspense fallback={<LoadingSpinner />}>
                <CallLogsPanel logs={callLogsData} />
              </Suspense>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
