"use client";

import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "../ui/Tooltip";
import StatsOverview from "./StatsOverview";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: string;
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Welcome to Translation Empire support!", sender: "bot", timestamp: "10:00 AM" },
        { id: "2", text: "How can we assist you with your translation projects today?", sender: "bot", timestamp: "10:00 AM" },
        { id: "3", text: "I have a question about my recent translation task #4512.", sender: "user", timestamp: "10:02 AM" },
        { id: "4", text: "Checking that for you... One moment please.", sender: "bot", timestamp: "10:02 AM" },
    ]);
    const [inputText, setInputText] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputText("");

        // Simulate "Real-time" thinking
        setTimeout(() => {
            setIsTyping(true);

            // Random delay for typing simulation
            const typingTime = 1500 + Math.random() * 2000;

            setTimeout(() => {
                let responseText = "Thank you for your message. Our team is reviewing your request.";

                const lowerInput = userMsg.text.toLowerCase();
                if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
                    responseText = "Hello! How can I help you today?";
                } else if (lowerInput.includes("status") || lowerInput.includes("task")) {
                    responseText = "I'm checking the status of your tasks. It seems everything is on schedule.";
                } else if (lowerInput.includes("price") || lowerInput.includes("cost")) {
                    responseText = "Our pricing varies by language and complexity. I can have a manager send you a quote!";
                }

                const botResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: responseText,
                    sender: "bot",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };

                setMessages((prev) => [...prev, botResponse]);
                setIsTyping(false);
            }, typingTime);
        }, 500);
    };

    const clearChat = () => {
        setShowClearModal(true);
    };

    const confirmClearChat = () => {
        setMessages([]);
        setShowClearModal(false);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex flex-col lg:flex-row h-[700px] w-full overflow-hidden rounded-3xl border transition-all duration-500 ${isDarkMode
            ? "border-gray-800 bg-gray-950/90 text-white backdrop-blur-xl"
            : "border-gray-200 bg-white/80 text-gray-900 backdrop-blur-xl"} shadow-[0_20px_50px_rgba(0,0,0,0.1)]`}>

            {/* Sidebar (Dynamic Stats) */}
            <div className={`w-full lg:w-72 border-r p-6 hidden lg:block ${isDarkMode ? "border-gray-800 bg-gray-900/40" : "border-gray-100 bg-gray-50/40"}`}>
                <StatsOverview isDarkMode={isDarkMode} />
            </div>

            {/* Main Chat Area */}
            <div className="flex flex-1 flex-col h-full overflow-hidden">
                {/* Chat Header */}
                <div className={`flex items-center justify-between border-b px-6 py-4 ${isDarkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-100 bg-gray-50/50"}`}>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                                A
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg tracking-tight">Ali</h3>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Online & Ready</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={toggleTheme}
                            className={`rounded-xl p-2.5 transition-all duration-300 ${isDarkMode ? "hover:bg-gray-800 text-yellow-400 bg-gray-800/50" : "hover:bg-gray-200 text-gray-600 bg-gray-100"}`}
                        >
                            {isDarkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                            )}
                        </button>
                        <button
                            onClick={clearChat}
                            className={`rounded-xl p-2.5 transition-all duration-300 ${isDarkMode ? "hover:bg-red-900/30 text-red-400 bg-gray-800/50" : "hover:bg-red-50 text-red-500 bg-gray-100"}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className={`flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide ${isDarkMode ? "bg-gray-950/20" : "bg-white/10"}`}>
                    {messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                            <div className={`rounded-full p-6 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">No messages yet</p>
                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Start a conversation with our support team.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4">
                            {messages.map((msg, index) => {
                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                                    >
                                        <div className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                                            <div
                                                className={`rounded-2xl px-5 py-3 shadow-md transition-all hover:shadow-lg ${msg.sender === "user"
                                                    ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-sm"
                                                    : isDarkMode
                                                        ? "bg-gray-800 text-gray-100 rounded-tl-sm border border-gray-700"
                                                        : "bg-gray-100 text-gray-800 rounded-tl-sm border border-gray-200"
                                                    }`}
                                            >
                                                <p className="text-[15px] leading-relaxed">{msg.text}</p>
                                            </div>
                                            {!((msg.sender === "user" && messages[index + 1]?.sender === "user") || (msg.sender === "bot" && messages[index + 1]?.sender === "bot")) && (
                                                <span className={`mt-1.5 text-[10px] font-medium uppercase tracking-wider opacity-50 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                                                    {msg.timestamp}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {isTyping && (
                                <div className="flex justify-start animate-pulse">
                                    <div className={`rounded-2xl px-5 py-3 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"} flex gap-1.5 items-center`}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className={`border-t px-6 py-5 ${isDarkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-100 bg-gray-50/50"}`}>
                    <div className="flex gap-3 items-center">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className={`w-full rounded-2xl border px-5 py-3.5 text-[15px] outline-none transition-all duration-300 ${isDarkMode
                                    ? "border-gray-700 bg-gray-800/50 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-500"
                                    : "border-gray-200 bg-white text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400"
                                    } shadow-inner`}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSendMessage();
                                }}
                            />
                        </div>
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isTyping}
                            className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20 hover:scale-105 hover:shadow-blue-500/30 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                            >
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Clear Chat Modal */}
            {showClearModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                        onClick={() => setShowClearModal(false)}
                    />
                    <div className={`relative w-full max-w-sm overflow-hidden rounded-3xl border shadow-2xl animate-in zoom-in-95 duration-300 ${isDarkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900"
                        }`}>
                        <div className="p-8 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold tracking-tight">Clear Chat History?</h3>
                            <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                This will permanently delete all messages in this conversation. This action cannot be undone.
                            </p>
                        </div>
                        <div className={`flex border-t ${isDarkMode ? "border-gray-800" : "border-gray-100"}`}>
                            <button
                                onClick={() => setShowClearModal(false)}
                                className={`flex-1 px-4 py-4 text-sm font-bold transition-colors ${isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-50 text-gray-500"}`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmClearChat}
                                className="flex-1 bg-red-600 px-4 py-4 text-sm font-bold text-white transition-colors hover:bg-red-700"
                            >
                                Clear History
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
