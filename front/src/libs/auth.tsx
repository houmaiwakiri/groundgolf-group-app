import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getUserIdFromToken } from "./jwtUtils";

type Tokens = {
    access_token: string;
    id_token: string;
    refresh_token?: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    tokens: Tokens | null;
    userId: string | null;
    login: (tokens: Tokens) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tokens, setTokens] = useState<Tokens | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const access = await SecureStore.getItemAsync("access_token");
                const id = await SecureStore.getItemAsync("id_token");
                const refresh = await SecureStore.getItemAsync("refresh_token");
                const savedUserId = await SecureStore.getItemAsync("user_id");

                if (access && id) {
                    setTokens({
                        access_token: access,
                        id_token: id,
                        refresh_token: refresh || undefined,
                    });

                    if (savedUserId) {
                        setUserId(savedUserId);
                    }
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = async (newTokens: Tokens) => {
        await SecureStore.setItemAsync("access_token", newTokens.access_token);
        await SecureStore.setItemAsync("id_token", newTokens.id_token);

        if (newTokens.refresh_token) {
            await SecureStore.setItemAsync("refresh_token", newTokens.refresh_token);
        }

        // user_idを抜き出して保存
        const userId = getUserIdFromToken(newTokens.id_token);
        if (!userId) throw new Error("userId が取得できません");

        await SecureStore.setItemAsync("user_id", userId);

        setTokens(newTokens);
        setUserId(userId);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("id_token");
        await SecureStore.deleteItemAsync("refresh_token");
        await SecureStore.deleteItemAsync("user_id");

        setTokens(null);
        setUserId(null);
    };

    return (
        // 他でuseAuth()して使う中身
        <AuthContext.Provider
            value={{
                isAuthenticated: !!tokens,
                tokens,
                userId,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    // 他でuseAuth()を呼ぶと、ctxの中身が使えるようになる。
    return ctx;
}
