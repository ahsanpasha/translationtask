"use client";

import React, { useState, useMemo } from "react";
import { Tooltip } from "../ui/Tooltip";
import Link from "next/link";

interface Record {
    id: string;
    user: string;
    status: "Active" | "Inactive" | "Pending";
    type: string;
    date: string;
}

interface DashboardTableProps {
    data: Record[];
}

export default function DashboardTable({ data }: DashboardTableProps) {
    const [filter, setFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch =
                item.user.toLowerCase().includes(filter.toLowerCase()) ||
                item.type.toLowerCase().includes(filter.toLowerCase());
            const matchesStatus =
                statusFilter === "All" || item.status === statusFilter;
            const matchesType =
                typeFilter === "All" || item.type === typeFilter;
            return matchesSearch && matchesStatus && matchesType;
        });
    }, [data, filter, statusFilter, typeFilter]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const textOffset = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(textOffset, textOffset + itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="mt-6 rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:p-5 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                    Data Records
                </h2>
                <div className="flex gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <select
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white transition-all"
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <select
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white transition-all"
                        value={typeFilter}
                        onChange={(e) => {
                            setTypeFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="All">All Types</option>
                        <option value="Subscription">Subscription</option>
                        <option value="One-time">One-time</option>
                        <option value="Refund">Refund</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-[#f9fafb] uppercase text-[10px] font-bold tracking-wider text-gray-400">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {currentData.length > 0 ? (
                            currentData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-[#f9fafb] transition-colors"
                                >
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        {item.user}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.status === "Active"
                                                ? "bg-green-50 text-green-700"
                                                : item.status === "Inactive"
                                                    ? "bg-gray-50 text-gray-600"
                                                    : "bg-yellow-50 text-yellow-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{item.type}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-1">
                                            <Tooltip text="View Details">
                                                <Link
                                                    href={`/details/${item.id}`}
                                                    className="rounded-lg p-2 hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-all flex items-center justify-center font-bold"
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
                                            <Tooltip text="Delete Record">
                                                <button className="rounded-lg p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all">
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
                                                        <path d="M3 6h18" />
                                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">
                                    No records found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 px-6 py-4 bg-[#f9fafb]/50">
                <span className="text-xs font-medium text-gray-500">
                    Showing <span className="text-gray-900 font-bold">{textOffset + 1}</span> to{" "}
                    <span className="text-gray-900 font-bold">
                        {Math.min(textOffset + itemsPerPage, filteredData.length)}
                    </span>{" "}
                    of <span className="text-gray-900 font-bold">{filteredData.length}</span> results
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        Previous
                    </button>

                    <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${currentPage === pageNum
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
