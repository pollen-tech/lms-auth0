import { useAuth } from "~/composables/auth0";
import { useSellerStore } from "~/stores/seller";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const seller_store = useSellerStore();

  const { get_user_id, is_token_expired } = useAuth();
  const user_id = get_user_id();

  if (!is_token_expired()) {
    const req = await seller_store.get_company_profile(user_id);

    if (req.id) {
      return navigateTo("/"); // Redirect to home if not authenticated
    }
  } else {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  }
});
