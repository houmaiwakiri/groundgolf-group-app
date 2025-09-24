// src/libs/auth.ts
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

type Tokens = {
    access_token: string;
    id_token: string;
    refresh_token?: string;
};

type AuthContextType = {
    isAuth: boolean;
    tokens: Tokens | null;
    login: (tokens: Tokens) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tokens, setTokens] = useState<Tokens | null>(null);

    // 起動時に SecureStore からトークンを復元
    useEffect(() => {
        (async () => {
            const access = await SecureStore.getItemAsync("access_token");
            const id = await SecureStore.getItemAsync("id_token");
            const refresh = await SecureStore.getItemAsync("refresh_token");

            if (access && id) {
                setTokens({ access_token: access, id_token: id, refresh_token: refresh || undefined });
            }
        })();
    }, []);

    const login = async (newTokens: Tokens) => {
        await SecureStore.setItemAsync("access_token", newTokens.access_token);
        await SecureStore.setItemAsync("id_token", newTokens.id_token);
        if (newTokens.refresh_token) {
            await SecureStore.setItemAsync("refresh_token", newTokens.refresh_token);
        }
        setTokens(newTokens);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("id_token");
        await SecureStore.deleteItemAsync("refresh_token");
        setTokens(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuth: !!tokens,
                tokens,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
