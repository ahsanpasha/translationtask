"use client";

import React from "react";
import Link from "next/link";

interface CallLogsProps {
    id: string;
}

export default function CallLogs({ id }: CallLogsProps) {
    // Mock logs for display
    const logs = [
        { id: 1, type: "Incoming", duration: "12m 30s", date: "2025-12-28 10:15", status: "Completed" },
        { id: 2, type: "Outgoing", duration: "05m 12s", date: "2025-12-27 15:45", status: "Completed" },
        { id: 3, type: "Missed", duration: "00m 00s", date: "2025-12-27 09:20", status: "Missed" },
        { id: 4, type: "Incoming", duration: "25m 00s", date: "2024-12-26 18:30", status: "Completed" },
        { id: 5, type: "Outgoing", duration: "02m 45s", date: "2024-12-26 14:10", status: "Cancelled" },
    ];

    return (
        <div className="mx-auto max-w-4xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Call Logs</h1>
                    <p className="text-gray-500">History for ID: {id}</p>
                </div>
                <Link
                    href="/"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                >
                    Back to Dashboard
                </Link>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-[#f9fafb] uppercase text-[10px] font-bold tracking-wider text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">Date & Time</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 font-medium">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className={`flex items-center gap-2 ${log.type === "Incoming" ? "text-green-600" : log.type === "Outgoing" ? "text-blue-600" : "text-red-600"
                                        }`}>
                                        {log.type === "Incoming" ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /><polyline points="23 7 16 7 16 0" /><line x1="16" y1="7" x2="23" y2="0" /></svg>
                                        ) : log.type === "Outgoing" ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /><polyline points="15 1 22 1 22 8" /><line x1="15" y1="8" x2="22" y2="1" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2.03V20a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" /><line x1="22" y1="2" x2="2" y2="22" /></svg>
                                        )}
                                        {log.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-bold">{log.duration}</td>
                                <td className="px-6 py-4 text-gray-500">{log.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${log.status === "Completed" ? "bg-green-50 text-green-700" : log.status === "Missed" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-600"
                                        }`}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
