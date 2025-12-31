"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Container, Paper, IconButton, Fab, Avatar, Badge, Chip, Zoom, Fade } from "@mui/material";
import {
    Mic as MicIcon,
    MicOff as MicOffIcon,
    Videocam as VideocamIcon,
    VideocamOff as VideocamOffIcon,
    CallEnd as CallEndIcon,
    Call as CallIcon,
    VolumeUp as VolumeUpIcon,
    Person as PersonIcon,
} from "@mui/icons-material";

type CallStatus = "Idle" | "Ringing" | "Connected" | "Ended";

export default function VideoPage() {
    const [status, setStatus] = useState<CallStatus>("Idle");
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [timer, setTimer] = useState(0);

    const startCall = () => {
        setStatus("Ringing");
        setTimer(0);
        // Simulate picking up after 2 seconds
        setTimeout(() => {
            setStatus("Connected");
        }, 3000);
    };

    const endCall = () => {
        setStatus("Ended");
        // Reset after 3 seconds to Idle
        setTimeout(() => {
            setStatus("Idle");
            setTimer(0);
        }, 3000);
    };

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === "Connected") {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const getStatusColor = () => {
        switch (status) {
            case "Ringing": return "warning";
            case "Connected": return "success";
            case "Ended": return "error";
            default: return "default";
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper
                elevation={3}
                className="relative overflow-hidden w-full aspect-video bg-neutral-900 rounded-2xl flex flex-col items-center justify-center transition-all duration-500"
                sx={{
                    background: status === 'Connected' && isVideoOn
                        ? 'linear-gradient(45deg, #1e293b 0%, #0f172a 100%)'
                        : '#111827',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                {/* Status Indicator */}
                <Box className="absolute top-6 flex items-center gap-2 z-10">
                    <Chip
                        label={status.toUpperCase()}
                        color={getStatusColor()}
                        size="small"
                        variant="filled"
                        className={`${status === 'Ringing' ? 'animate-pulse' : ''} font-bold`}
                    />
                    {status === 'Connected' && (
                        <Typography className="text-white font-mono text-lg bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                            {formatTime(timer)}
                        </Typography>
                    )}
                </Box>

                <Box className="flex flex-col items-center justify-center flex-1">
                    <Zoom in={status !== 'Idle'}>
                        <Box className="relative">
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                color={getStatusColor()}
                                sx={{ '& .MuiBadge-badge': { width: 20, height: 20, borderRadius: '50%', border: '3px solid #111827' } }}
                            >
                                <Avatar
                                    sx={{
                                        width: 140,
                                        height: 140,
                                        bgcolor: 'primary.main',
                                        fontSize: '4rem',
                                        boxShadow: '0 0 40px rgba(0,0,0,0.5)'
                                    }}
                                    className={`${status === 'Ringing' ? 'animate-bounce' : ''}`}
                                >
                                    <PersonIcon fontSize="inherit" />
                                </Avatar>
                            </Badge>
                        </Box>
                    </Zoom>

                    <Fade in={status !== 'Idle'}>
                        <Box className="mt-6 text-center">
                            <Typography variant="h5" className="text-white font-semibold">
                                {status === 'Idle' ? 'Ready to Call' : 'Support Agent'}
                            </Typography>
                            <Typography variant="body2" className="text-neutral-400 mt-1">
                                {status === 'Ringing' ? 'Incoming request...' : status === 'Connected' ? 'Voice & Video encrypted' : 'Call finished'}
                            </Typography>
                        </Box>
                    </Fade>
                </Box>

                {/* Video Overlay simulation */}
                {status === 'Connected' && isVideoOn && (
                    <Box className="absolute inset-0 z-0 bg-blue-500/10 opacity-30 pointer-events-none animate-pulse" />
                )}

                {/* Controls Area */}
                <Box className="absolute bottom-8 w-full px-8 flex justify-center items-center gap-6 z-10">
                    <Fade in={status === 'Idle'}>
                        <Fab
                            color="primary"
                            variant="extended"
                            onClick={startCall}
                            sx={{ px: 4, height: 56 }}
                        >
                            <CallIcon sx={{ mr: 1 }} />
                            Start Call
                        </Fab>
                    </Fade>

                    {status !== 'Idle' && status !== 'Ended' && (
                        <>
                            <IconButton
                                onClick={() => setIsMuted(!isMuted)}
                                sx={{
                                    bgcolor: isMuted ? 'error.main' : 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    '&:hover': { bgcolor: isMuted ? 'error.dark' : 'rgba(255,255,255,0.2)' },
                                    width: 56,
                                    height: 56
                                }}
                            >
                                {isMuted ? <MicOffIcon /> : <MicIcon />}
                            </IconButton>

                            <IconButton
                                onClick={() => setIsVideoOn(!isVideoOn)}
                                sx={{
                                    bgcolor: !isVideoOn ? 'error.main' : 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    '&:hover': { bgcolor: !isVideoOn ? 'error.dark' : 'rgba(255,255,255,0.2)' },
                                    width: 56,
                                    height: 56
                                }}
                            >
                                {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
                            </IconButton>

                            <IconButton
                                onClick={endCall}
                                sx={{
                                    bgcolor: 'error.main',
                                    color: 'white',
                                    '&:hover': { bgcolor: 'error.dark' },
                                    width: 72,
                                    height: 72,
                                    boxShadow: '0 8px 16px rgba(244, 67, 54, 0.4)'
                                }}
                            >
                                <CallEndIcon sx={{ fontSize: 32 }} />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Paper>

        </Container>
    );
}
