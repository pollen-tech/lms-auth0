<template>
  <div class="h-100">
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
            <OnboardingCompanyInformation @submit="goToHomePage" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const user = ref();

onBeforeMount(async () => {});
const goToHomePage = () => {
  navigateTo("/");
};
</script>

<style lang="scss" scoped></style>
