import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

type Tokens = {
    access_token: string;
    id_token: string;
    refresh_token?: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    tokens: Tokens | null;
    login: (tokens: Tokens) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tokens, setTokens] = useState<Tokens | null>(null);
    const [loading, setLoading] = useState(true);

    // 起動時に SecureStore からトークンを復元
    useEffect(() => {
        (async () => {
            try {
                const access = await SecureStore.getItemAsync("access_token");
                const id = await SecureStore.getItemAsync("id_token");
                const refresh = await SecureStore.getItemAsync("refresh_token");

                if (access && id) {
                    setTokens({
                        access_token: access,
                        id_token: id,
                        refresh_token: refresh || undefined,
                    });
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = async (newTokens: Tokens) => {
        // ログイン成功時に SecureStore に保存
        await SecureStore.setItemAsync("access_token", newTokens.access_token);
        await SecureStore.setItemAsync("id_token", newTokens.id_token);
        if (newTokens.refresh_token) {
            await SecureStore.setItemAsync("refresh_token", newTokens.refresh_token);
        }
        setTokens(newTokens);
    };

    const logout = async () => {
        // ログアウト時に SecureStore を削除
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("id_token");
        await SecureStore.deleteItemAsync("refresh_token");
        setTokens(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!tokens,
                tokens,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/**
 * 認証状態を管理するhook
 * hookとは、状態管理や副作用を関数として切り出して再利用するためのもの
 * @returns 
 */
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
