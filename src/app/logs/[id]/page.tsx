"use client";

import dynamic from "next/dynamic";
import React from "react";

const CallLogs = dynamic(() => import("@/components/dashboard/CallLogs"), {
    loading: () => (
        <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
    ),
    ssr: false,
});

export default function Page({ params }: { params: { id: string } }) {
    return <CallLogs id={params.id} />;
}
