<template>
  <div class="h-100">
    <CommonLoading v-if="isLoading" :loading="true" />
    <OnboardingHeader />
    <v-container>
      <div class="d-flex justify-space-between my-6">
        <NuxtLink
          to="/onboarding"
          variant="plain"
          class="text-grey-darken-1 cursor-pointer text-decoration-none text-capitalize text-body-2"
          external
        >
          <v-icon>mdi-chevron-left</v-icon> Previous</NuxtLink
        >
      </div>
      <v-row
        no-gutters
        class="h-100 rounded-lg"
        style="border: #e5e7eb solid 1px"
      >
        <v-col v-if="!$vuetify.display.mobile" cols="12" md="5">
          <OnboardingSideBar />
        </v-col>
        <v-col cols="12" md="7" class="d-flex justify-center">
          <div class="w-75 d-flex flex-column h-100 py-8 mt-10">
            <OnboardingCompanyInformation
              :user-id="userId"
              @submit="goToHomePage"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/auth0";
import { useSellerStore } from "~/stores/seller";

const router = useRouter();

const { getUserId } = useAuth();
const userId = getUserId();

const { validateUserOnboard } = useSellerStore();

const isLoading = ref(false);
const isUserOnboard = ref(false);

onMounted(async () => {
  isLoading.value = true;
  const req = await validateUserOnboard(userId);
  console.log(req);
  if (!req?.id) {
    isLoading.value = false;
    isUserOnboard.value = true;
  } else {
    isLoading.value = false;
    goToHomePage();
  }
});
const goToHomePage = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped></style>
