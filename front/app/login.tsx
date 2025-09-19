import { Button, View } from "react-native";
import * as Linking from "expo-linking";
import Constants from "expo-constants";

type ExpoExtra = {
  cognitoClientId: string;
  cognitoDomain: string;
  cognitoRedirectUri: string;
  cognitoResponseType: string;
  cognitoScope: string;
};

export default function LoginScreen() {
  const extra = Constants.expoConfig?.extra as ExpoExtra;

  const loginUrl = `https://${extra.cognitoDomain}/login?client_id=${extra.cognitoClientId}&response_type=${extra.cognitoResponseType}&scope=${extra.cognitoScope}&redirect_uri=${encodeURIComponent(
    extra.cognitoRedirectUri
  )}`;

  const handleLogin = () => {
    Linking.openURL(loginUrl);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="ログイン" onPress={handleLogin} />
    </View>
  );
}
