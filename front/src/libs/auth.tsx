import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getUserIdFromToken } from "./jwtUtils";

/**
 * 認証で利用するトークン群。
 * access_token と id_token は必須、refresh_token は任意です。
 */
type Tokens = {
    access_token: string;
    id_token: string;
    refresh_token?: string;
};

/**
 * AuthContext が提供する値の型定義。
 * isAuthenticated はログイン済み判定、loading は初期読み込み中フラグ。
 */
type AuthContextType = {
    isAuthenticated: boolean;
    tokens: Tokens | null;
    userId: string | null;
    login: (tokens: Tokens) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

/**
 * 認証情報をアプリ全体へ共有するためのコンテキスト。
 * 初期値は undefined にして、Provider 外で使った場合に気付けるようにする。
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 認証情報を保持する Provider コンポーネント。
 * 起動時に SecureStore から保存済みトークンを読み込みます。
 */
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

    /**
     * ログイン処理。
     * トークンを SecureStore に保存し、userId を JWT から取り出して state に反映します。
     * @param newTokens 認証で取得したトークン一式
     */
    const login = async (newTokens: Tokens) => {
        await SecureStore.setItemAsync("access_token", newTokens.access_token);
        await SecureStore.setItemAsync("id_token", newTokens.id_token);

        if (newTokens.refresh_token) {
            await SecureStore.setItemAsync("refresh_token", newTokens.refresh_token);
        }

        // user_id を JWT から抜き出して保存
        const userId = getUserIdFromToken(newTokens.id_token);
        if (!userId) throw new Error("userId が取得できません");

        await SecureStore.setItemAsync("user_id", userId);

        setTokens(newTokens);
        setUserId(userId);
    };

    /**
     * ログアウト処理。
     * SecureStore のトークンを削除し、state を初期化します。
     */
    const logout = async () => {
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("id_token");
        await SecureStore.deleteItemAsync("refresh_token");
        await SecureStore.deleteItemAsync("user_id");

        setTokens(null);
        setUserId(null);
    };

    return (
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

/**
 * AuthContext から認証情報を取得するカスタムフック。
 * Provider の外で呼ばれた場合は明示的にエラーにします。
 */
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
