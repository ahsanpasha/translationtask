"use client";

import CallInterface from "@/components/call/CallInterface";

export default function CallPage() {
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 sm:p-8 font-sans">
            <div className="w-full max-w-4xl">
                <main>
                    <CallInterface />
                </main>
            </div>
        </div>
    );
}
