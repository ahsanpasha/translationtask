"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, getCurrentUser, login as authLogin, signup as authSignup, logout as authLogout } from "@/services/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const result = authLogin({ email, password });
        if (result.success && result.user) {
            setUser(result.user);
        }
        return { success: result.success, message: result.message };
    };

    const signup = async (name: string, email: string, password: string) => {
        const result = authSignup({ name, email, password });
        if (result.success && result.user) {
            setUser(result.user);
        }
        return { success: result.success, message: result.message };
    };

    const logout = () => {
        authLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
