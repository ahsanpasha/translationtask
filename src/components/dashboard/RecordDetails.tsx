"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface RecordDetailsProps {
    id: string;
}

export default function RecordDetails({ id }: RecordDetailsProps) {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUserData = async () => {
            try {
                // Extract numeric ID if it starts with USR-
                const numericIdString = id.startsWith("USR-") ? id.split("-")[1] : id;
                const numericId = parseInt(numericIdString);

                if (isNaN(numericId)) {
                    throw new Error("Invalid ID format");
                }

                // Fetch user data from the same mock API as the dashboard
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${numericId}`);
                if (!response.ok) throw new Error("User not found");
                const user = await response.json();

                // Apply the same transformation logic as in DashboardTable
                const pakistaniNames = [
                    "Ahsan Khan", "Zain Ali", "Tayyab Ahmed", "Abdullah", "Hamza Sheikh",
                    "Ayesha Malik", "Iqra Ahsan", "Fatima Zahra", "Bilal Hussain", "Sara Ahmed"
                ];

                const index = (numericId - 1) % 10;
                const statusList = ["Active", "Inactive", "Pending"];
                const roles = ["Premium Member", "Standard User", "Gold Partner"];

                setUserData({
                    id: id,
                    name: pakistaniNames[index],
                    email: user.email,
                    role: roles[index % 3],
                    status: statusList[index % 3],
                    joined: "2024-0" + (Math.floor(Math.random() * 9) + 1) + "-" + (Math.floor(Math.random() * 20) + 10),
                    lastLogin: "2025-12-" + (Math.floor(Math.random() * 7) + 20) + " 14:30",
                    bio: `Experienced professional in translation services with a focus on cross-cultural communication. Currently working with ${user.company.name} as a ${user.company.bs}.`,
                    phone: user.phone,
                    website: user.website,
                    company: user.company.name
                });
            } catch (err) {
                console.error("Error loading user details:", err);
                setError("Failed to load user details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent shadow-lg shadow-blue-200"></div>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="mx-auto max-w-4xl p-6 text-center">
                <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-red-600">
                    <p className="text-lg font-bold">Error</p>
                    <p>{error || "User record not found."}</p>
                    <Link href="/" className="mt-4 inline-block text-blue-600 font-bold hover:underline">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Profile</h1>
                </div>
                <Link
                    href="/"
                    className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Dashboard
                </Link>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xl shadow-gray-200/50">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-gray-50 text-center md:text-left">
                    <div className="h-28 w-28 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-4xl shadow-2xl shadow-blue-500/20">
                        {userData.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold text-gray-900">{userData.name}</h2>

                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">Email Address</p>
                        <p className="text-lg font-bold text-gray-900">{userData.email}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">Phone Number</p>
                        <p className="text-lg font-bold text-gray-900">{userData.phone}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">Joined Date</p>
                        <p className="text-lg font-bold text-gray-900">{userData.joined}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">Last Activity</p>
                        <p className="text-lg font-bold text-gray-900">{userData.lastLogin}</p>
                    </div>

                </div>

                <div className="mt-12 pt-10 border-t border-gray-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-3">Professional Biography</p>
                    <p className="text-gray-600 leading-relaxed font-medium text-lg">
                        {userData.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}
