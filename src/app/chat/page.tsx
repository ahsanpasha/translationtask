"use client";

import ChatInterface from "@/components/chat/ChatInterface";

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-8 font-sans">
            <div className="mx-auto max-w-4xl">


                <main>
                    <ChatInterface />
                </main>
            </div>
        </div>
    );
}
