// app/callback.tsx
import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { exchangeCodeForToken } from "../src/libs/auth";
import LoadingIndicator from "../src/components/LoadingIndicator";
import Constants from "expo-constants";

type ExpoExtra = {
  cognitoClientId: string;
  cognitoDomain: string;
  cognitoRedirectUri: string;
  cognitoResponseType: string;
  cognitoScope: string;
};

export default function callback() {
  const router = useRouter();
  const { code } = useLocalSearchParams<{ code?: string }>();
  const extra = Constants.expoConfig?.extra as ExpoExtra;

  useEffect(() => {
    if (code) {
      exchangeCodeForToken(code, extra).then(() => {
        router.replace("/home");
      });
    }
  }, [code]);

  return <LoadingIndicator />;
}
