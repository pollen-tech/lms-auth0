import { ref } from "vue";
import { Auth0Client } from "@auth0/auth0-spa-js";

export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig();
  const auth0 = new Auth0Client({
    domain: runtimeConfig.public.auth0_domain,
    clientId: runtimeConfig.public.auth0_client_id,
    authorizationParams: {
      redirect_uri: runtimeConfig.public.auth0_redirect_uri,
    },
    cacheLocation: "localstorage",
  });

  const handleAuth0Response = (response: {
    access_token: string;
    id_token: string;
    user_id: string;
    expires_in: number;
  }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("id_token", response.id_token);
      localStorage.setItem("user_id", response?.user_id);
      localStorage.setItem(
        "expires_at",
        JSON.stringify(response.expires_in * 1000 + new Date().getTime())
      );
    }
  };

  const getUserId = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user_id");
    }
    return null;
  };

  const isUserAuthenticated = () => {
    if (typeof window !== "undefined") {
      const expiresAt = localStorage.getItem("expires_at");
      if (!expiresAt) {
        return false;
      }
      return new Date().getTime() < JSON.parse(expiresAt);
    }
    return false;
  };

  const getToken = async () => {
    try {
      const accessToken = await auth0.getTokenSilently();
      console.log(accessToken);
      return accessToken;
    } catch (error: any) {
      console.error("Error getting token silently:", error);
      if (error?.error === "login_required") {
        await auth0.loginWithRedirect();
      }
      return null;
    }
  };

  return {
    getUserId,
    handleAuth0Response,
    isUserAuthenticated,
    getToken,
  };
};
