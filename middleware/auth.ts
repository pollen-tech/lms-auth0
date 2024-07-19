import { useAuth } from "~/composables/auth0";
import { useSellerStore } from "~/stores/seller";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const seller_store = useSellerStore();

  const { get_user_id } = useAuth();
  const user_id = get_user_id();
  // Define your protected routes here
  const protectedRoutes = ["/onboarding"];

  const req = await seller_store.get_company_profile(user_id);

  if (req.id) {
    return navigateTo("/"); // Redirect to home if not authenticated
  }
});
