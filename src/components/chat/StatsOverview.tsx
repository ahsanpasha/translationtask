"use client";

import React, { useState, useEffect } from "react";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface StatItem {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

export default function StatsOverview({ isDarkMode }: { isDarkMode: boolean }) {
    const [agents, setAgents] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const usersRes = await fetch("https://jsonplaceholder.typicode.com/users?_limit=4");
                const users = await usersRes.json();

                const pakistaniNames = ["Ahsan Khan", "Zain Ali", "Tayyab Ahmed", "Abdullah"];
                const transformedUsers = users.map((user: User, index: number) => ({
                    ...user,
                    name: pakistaniNames[index % pakistaniNames.length]
                }));

                setAgents(transformedUsers);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const stats: StatItem[] = [
        {
            label: "Active Projects",
            value: "124",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="m17 5 5 5-5 5" /><path d="m7 19-5-5 5-5" /></svg>,
            color: "text-blue-500"
        },
        {
            label: "Completion Rate",
            value: "98.2%",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
            color: "text-green-500"
        },
        {
            label: "Avg. Response",
            value: "2m 14s",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
            color: "text-purple-500"
        }
    ];

    return (
        <div className={`space-y-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>


            <div>
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">Available User</h4>
                <div className="space-y-3">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-3 animate-pulse">
                                <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                <div className="space-y-2">
                                    <div className="h-2 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="h-2 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        agents.map(agent => (
                            <div key={agent.id} className="group flex items-center justify-between transition-all hover:translate-x-1">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center font-bold text-xs shadow-sm">
                                        {agent.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold group-hover:text-blue-500 transition-colors">{agent.name}</p>
                                    </div>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
