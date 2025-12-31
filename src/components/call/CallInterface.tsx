"use client";

import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "../ui/Tooltip";

type CallStatus = "idle" | "ringing" | "connected" | "ended";

interface CallInterfaceProps {
    contactName?: string;
    contactImage?: string;
}

export default function CallInterface({
    contactName = "Sarah Wilson",
    contactImage = "SW"
}: CallInterfaceProps) {
    const [callStatus, setCallStatus] = useState<CallStatus>("idle");
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [callDuration, setCallDuration] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    useEffect(() => {
        if (callStatus === "connected") {
            timerRef.current = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [callStatus]);

    const startCall = () => {
        setCallStatus("ringing");
        setCallDuration(0);

        setTimeout(() => {
            setCallStatus("connected");
        }, 3000);
    };

    const endCall = () => {
        setCallStatus("ended");
        setTimeout(() => {
            setCallStatus("idle");
            setCallDuration(0);
            setIsMuted(false);
            setIsVideoOn(true);
        }, 3000);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleVideo = () => {
        setIsVideoOn(!isVideoOn);
    };

    return (
        <div className="relative w-full h-[650px] rounded-[2.5rem] overflow-hidden  border border-white/5 group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a2e_0%,#0f0f1a_100%)] opacity-50"></div>

            <div className="relative w-full h-full z-10 transition-all duration-700 ease-in-out">
                {callStatus === "connected" ? (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <div className={`absolute inset-0 transition-all duration-1000 ${isVideoOn ? 'bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-blue-900/40 backdrop-blur-3xl' : 'bg-neutral-900'}`}>
                            {isVideoOn && (
                                <>
                                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
                                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
                                </>
                            )}
                        </div>

                        <div className="text-center z-20 transform transition-all duration-500 scale-100">
                            <div className={`relative mx-auto h-48 w-48 rounded-full flex items-center justify-center text-white font-bold text-6xl shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 ${isVideoOn ? 'bg-gradient-to-tr from-blue-500 to-indigo-600 ring-4 ring-white/10' : 'bg-neutral-800 ring-4 ring-white/5 grayscale'}`}>
                                {contactImage}
                                {isVideoOn && (
                                    <span className="absolute -bottom-2 -right-2 bg-green-500 h-6 w-6 rounded-full border-4 border-neutral-950"></span>
                                )}
                            </div>
                            <h2 className="mt-8 text-white text-4xl font-extrabold tracking-tight drop-shadow-lg">{contactName}</h2>
                            <p className="mt-2 text-blue-200/60 font-medium tracking-widest uppercase text-xs">Simulated Connection</p>
                        </div>
                    </div>
                ) : null}

                {callStatus === "ringing" && (
                    <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="absolute h-[300px] w-[300px] rounded-full border border-blue-500/20 animate-ping"></div>
                            <div className="absolute h-[450px] w-[450px] rounded-full border border-blue-500/10 animate-ping [animation-delay:0.5s]"></div>
                            <div className="absolute h-[600px] w-[600px] rounded-full border border-blue-500/5 animate-ping [animation-delay:1s]"></div>
                        </div>

                        <div className="text-center z-20">
                            <div className="h-44 w-44 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-5xl shadow-2xl mb-8 animate-bounce ring-4 ring-blue-500/30">
                                {contactImage}
                            </div>
                            <p className="text-white text-3xl font-bold mb-3 tracking-tight">{contactName}</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                                <p className="text-blue-400 text-lg font-semibold tracking-wide">Calling...</p>
                            </div>
                        </div>
                    </div>
                )}

                {callStatus === "ended" && (
                    <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center z-50">
                        <div className="text-center animate-in fade-in zoom-in duration-500">
                            <div className="h-32 w-32 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    <line x1="23" y1="1" x2="1" y2="23" />
                                </svg>
                            </div>
                            <h3 className="text-white text-3xl font-bold mb-2">Call Ended</h3>
                            <div className="px-6 py-2 rounded-full bg-neutral-900 inline-block border border-white/5">
                                <p className="text-neutral-400 text-sm font-bold uppercase tracking-widest whitespace-nowrap">Duration: {formatDuration(callDuration)}</p>
                            </div>
                        </div>
                    </div>
                )}

                {callStatus === "idle" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/50">
                        <div className="text-center group-hover:scale-105 transition-transform duration-500">
                            <div className="h-44 w-44 rounded-full bg-neutral-800 flex items-center justify-center text-white/50 font-bold text-5xl mb-8 ring-8 ring-white/5 grayscale group-hover:grayscale-0 group-hover:ring-blue-500/10 transition-all duration-500">
                                {contactImage}
                            </div>
                            <h2 className="text-white text-3xl font-extrabold mb-2 tracking-tight">{contactName}</h2>
                            <p className="text-neutral-500 text-lg font-medium">Ready to start session</p>
                        </div>
                    </div>
                )}

                {callStatus === "connected" && isVideoOn && (
                    <div className="absolute top-8 right-8 w-44 h-32 bg-neutral-800 rounded-3xl overflow-hidden border border-white/10 shadow-3xl z-30 animate-in slide-in-from-right-8 duration-500">
                        <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white/5">
                                YOU
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white/80 font-bold uppercase tracking-tighter">
                                Camera ON
                            </div>
                        </div>
                    </div>
                )}

                {callStatus === "connected" && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
                        <div className="bg-black/40 backdrop-blur-2xl px-8 py-3 rounded-full border border-white/10 shadow-2xl flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-white font-mono text-xl font-black tracking-tighter">{formatDuration(callDuration)}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-10 left-0 right-0 z-40 px-8">
                <div className="max-w-md mx-auto bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 shadow-2xl transform transition-all duration-500 hover:bg-white/10">
                    <div className="flex items-center justify-center gap-6">
                        {callStatus === "idle" ? (
                            <button
                                onClick={startCall}
                                className="group relative h-16 px-12 rounded-full bg-blue-600 text-white font-black text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center gap-3"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <span className="tracking-tight uppercase text-sm">Start Call</span>
                                </div>
                            </button>
                        ) : callStatus === "connected" ? (
                            <>
                                <Tooltip text={isMuted ? "Unmute Mic" : "Mute Mic"}>
                                    <button
                                        onClick={toggleMute}
                                        className={`h-16 w-16 rounded-full transition-all duration-300 shadow-xl flex items-center justify-center border-2 ${isMuted
                                            ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse"
                                            : "bg-white/10 border-transparent text-white hover:bg-white/20"
                                            }`}
                                    >
                                        {isMuted ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                                                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                                                <line x1="12" y1="19" x2="12" y2="23" />
                                                <line x1="8" y1="23" x2="16" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                                <line x1="12" y1="19" x2="12" y2="22" />
                                            </svg>
                                        )}
                                    </button>
                                </Tooltip>

                                <Tooltip text={isVideoOn ? "Turn Off Video" : "Turn On Video"}>
                                    <button
                                        onClick={toggleVideo}
                                        className={`h-16 w-16 rounded-full transition-all duration-300 shadow-xl flex items-center justify-center border-2 ${!isVideoOn
                                            ? "bg-amber-500/20 border-amber-500 text-amber-500"
                                            : "bg-white/10 border-transparent text-white hover:bg-white/20"
                                            }`}
                                    >
                                        {!isVideoOn ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m22 8-6 4 6 4V8Z" />
                                                <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                                                <line x1="2" y1="2" x2="22" y2="22" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m22 8-6 4 6 4V8Z" />
                                                <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                                            </svg>
                                        )}
                                    </button>
                                </Tooltip>

                                <Tooltip text="End Session">
                                    <button
                                        onClick={endCall}
                                        className="h-18 w-18 rounded-full bg-red-600 text-white shadow-[0_0_40px_rgba(220,38,38,0.5)] hover:bg-red-700 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="rotate-[135deg]">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </button>
                                </Tooltip>
                            </>
                        ) : callStatus === "ringing" ? (
                            <button
                                onClick={endCall}
                                className="h-18 w-18 rounded-full bg-red-600 text-white shadow-2xl hover:bg-red-700 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center animate-pulse"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="rotate-[135deg]">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
