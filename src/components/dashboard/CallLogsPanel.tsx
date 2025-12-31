"use client";

import React, { useState, useMemo } from "react";
import { Tooltip } from "../ui/Tooltip";
import Link from "next/link";

interface CallLog {
    id: string;
    type: "Incoming" | "Outgoing" | "Missed";
    contact: string;
    duration: string;
    timestamp: string;
    status: "Completed" | "Missed" | "Cancelled";
}

interface CallLogsPanelProps {
    logs: CallLog[];
}

export default function CallLogsPanel({ logs }: CallLogsPanelProps) {
    const [typeFilter, setTypeFilter] = useState<"All" | "Incoming" | "Outgoing" | "Missed">("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter logs
    const filteredLogs = useMemo(() => {
        return logs.filter((log) => {
            if (typeFilter === "All") return true;
            return log.type === typeFilter;
        });
    }, [logs, typeFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    const offset = (currentPage - 1) * itemsPerPage;
    const currentLogs = filteredLogs.slice(offset, offset + itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const getTypeIcon = (type: string) => {
        if (type === "Incoming") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    <polyline points="23 7 16 7 16 0" />
                    <line x1="16" y1="7" x2="23" y2="0" />
                </svg>
            );
        } else if (type === "Outgoing") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    <polyline points="15 1 22 1 22 8" />
                    <line x1="15" y1="8" x2="22" y2="1" />
                </svg>
            );
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2.03V20a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                    <line x1="22" y1="2" x2="2" y2="22" />
                </svg>
            );
        }
    };

    return (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {/* Header & Filter */}
            <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:p-5 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-gray-900">Call Logs</h2>
                <div className="flex gap-2 flex-wrap">
                    {(["All", "Incoming", "Outgoing", "Missed"] as const).map((filterOption) => (
                        <button
                            key={filterOption}
                            onClick={() => {
                                setTypeFilter(filterOption);
                                setCurrentPage(1);
                            }}
                            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${typeFilter === filterOption
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {filterOption}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-[#f9fafb] uppercase text-[10px] font-bold tracking-wider text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {currentLogs.length > 0 ? (
                            currentLogs.map((log) => (
                                <tr
                                    key={log.id}
                                    className="hover:bg-[#f9fafb] transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <span
                                            className={`flex items-center gap-2 font-medium ${log.type === "Incoming"
                                                    ? "text-green-600"
                                                    : log.type === "Outgoing"
                                                        ? "text-blue-600"
                                                        : "text-red-600"
                                                }`}
                                        >
                                            {getTypeIcon(log.type)}
                                            {log.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        {log.contact}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-medium">
                                        {log.duration}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{log.timestamp}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${log.status === "Completed"
                                                    ? "bg-green-50 text-green-700"
                                                    : log.status === "Missed"
                                                        ? "bg-red-50 text-red-700"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-1">
                                            <Tooltip text="View Details">
                                                <Link
                                                    href={`/logs/${log.id}`}
                                                    className="rounded-lg p-2 hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-all"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip text="Call Back">
                                                <button className="rounded-lg p-2 hover:bg-green-50 text-gray-400 hover:text-green-600 transition-all">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">
                                    No call logs found matching your filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {filteredLogs.length > itemsPerPage && (
                <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 bg-[#f9fafb]/50">
                    <span className="text-xs font-medium text-gray-500">
                        Showing <span className="text-gray-900 font-bold">{offset + 1}</span> to{" "}
                        <span className="text-gray-900 font-bold">
                            {Math.min(offset + itemsPerPage, filteredLogs.length)}
                        </span>{" "}
                        of <span className="text-gray-900 font-bold">{filteredLogs.length}</span> logs
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
                        >
                            Previous
                        </button>
                        <span className="flex items-center px-3 text-xs font-bold text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
