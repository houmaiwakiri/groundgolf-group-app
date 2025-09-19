export default ({ config }: { config: Record<string, any> }) => ({
  ...config,
  extra: {
    apiBaseUrl: process.env.API_BASE_URL,
    cognitoClientId: process.env.COGNITO_CLIENT_ID,
    cognitoDomain: process.env.COGNITO_DOMAIN,
    cognitoRedirectUri: process.env.COGNITO_REDIRECT_URI,
    cognitoResponseType: process.env.COGNITO_RESPONSE_TYPE,
    cognitoScope: process.env.COGNITO_SCOPE,
  },
});
