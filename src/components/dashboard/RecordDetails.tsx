"use client";

import React from "react";
import Link from "next/link";

interface RecordDetailsProps {
    id: string;
}

export default function RecordDetails({ id }: RecordDetailsProps) {
    // Mock data for display
    const details = {
        id: id,
        name: "Alice Freeman",
        email: "alice@example.com",
        role: "Premium Member",
        status: "Active",
        joined: "2024-01-15",
        lastLogin: "2025-12-28 14:30",
        bio: "Experienced professional in translation services with a focus on cross-cultural communication.",
    };

    return (
        <div className="mx-auto max-w-4xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
                    <p className="text-gray-500">Record ID: {id}</p>
                </div>
                <Link
                    href="/"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                >
                    Back to Dashboard
                </Link>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                        {details.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{details.name}</h2>
                        <p className="text-blue-600 font-medium">{details.role}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Email Address</p>
                        <p className="text-lg font-semibold text-gray-900">{details.email}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Status</p>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 uppercase tracking-widest border border-green-100">
                            {details.status}
                        </span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Joined Date</p>
                        <p className="text-lg font-semibold text-gray-900">{details.joined}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Last Login</p>
                        <p className="text-lg font-semibold text-gray-900">{details.lastLogin}</p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Biography</p>
                    <p className="text-gray-600 leading-relaxed font-medium">
                        {details.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}
