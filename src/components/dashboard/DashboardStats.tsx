"use client";

import React, { useState } from "react";
import { Tooltip } from "../ui/Tooltip";

interface StatCardProps {
    label: string;
    value: string;
    change: string;
    changeType: "positive" | "negative" | "neutral";
}

function StatCard({ label, value, change, changeType }: StatCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const changeColor =
        changeType === "positive"
            ? "text-emerald-500"
            : changeType === "negative"
                ? "text-red-500"
                : "text-gray-500";

    const getIcon = () => {
        if (label.includes("Revenue")) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            );
        } else if (label.includes("Users")) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            );
        } else if (label.includes("Messages")) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            );
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            );
        }
    };

    const getTrendIcon = () => {
        if (changeType === "positive") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                </svg>
            );
        } else if (changeType === "negative") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                    <polyline points="17 18 23 18 23 12" />
                </svg>
            );
        }
        return null;
    };

    const tooltipText = `${label}: ${value}\nTrend: ${change}`;

    return (
        <Tooltip text={tooltipText}>
            <div
                className={`relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm cursor-pointer overflow-hidden transition-all duration-300 ${isHovered ? "shadow-xl -translate-y-1 border-blue-200" : ""
                    }`}
                style={{
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Gradient overlay on hover */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                />

                <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {label}
                        </h3>
                        <div className={`transition-all duration-300 ${isHovered ? "text-blue-600 scale-110" : "text-gray-400"}`}>
                            {getIcon()}
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold tracking-tight text-gray-900">
                            {value}
                        </span>
                    </div>
                    <div className={`mt-2 flex items-center gap-1 ${changeColor}`}>
                        {getTrendIcon()}
                        <span className="text-xs font-medium">{change}</span>
                    </div>
                </div>
            </div>
        </Tooltip>
    );
}

interface DashboardStatsProps {
    stats: {
        label: string;
        value: string;
        change: string;
        changeType: "positive" | "negative" | "neutral";
    }[];
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
}
