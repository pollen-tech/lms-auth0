<template>
  <!--is_authenticated-->
  <div>
    <div class="landing-bg h-100">
      <v-container>
        <v-card elevation="0" class="px-1">
          <v-breadcrumbs
            class="text-caption text-purple text-capitalize mb-2"
            :items="['home']"
          >
            <template #prepend>
              <v-icon size="small">mdi-home</v-icon>
            </template>
          </v-breadcrumbs>
          <LandingBanner v-if="!is_authenticated" />

          <div v-if="!is_authenticated">
          </div>
        </v-card>

        <CommonEmpty :user_authenticated="is_authenticated" />
        {{ console.log('is_authenticated: ', is_authenticated) }}
      </v-container>

      <CommonConfirm ref="confirm" />
    </div>

    <!--not_authenticate-->
    <!--<div v-else>
      <p>not_authenticate</p>
    </div>-->
  </div>
</template>

<script setup>
const confirm = ref(null);
import { useNuxtApp } from "#app";
import { useAuth } from "~/composables/auth0";
import { useSellerStore } from "~/stores/seller";

const { is_user_authenticated } = useAuth();
const is_authenticated = computed(() => {
  return is_user_authenticated();
});
const nuxtApp = useNuxtApp();
const runtimeConfig = useRuntimeConfig();

const isAuthenticated = ref(false);
const userProfile = ref({ firstName: "" });

const showDialog = async () => {
  if (isAuthenticated) {
    const options = {
      title: `Congratulations ${userProfile.value.firstName}!`,
      message: `You are now a member of Pollen Pass with access to Pollen LMS (Liquidation Management System). <br/><br/> Start listing excess and obsolete inventory, and receive offers from Pollen's verified buyers around the world.`,
      icon: "mdi-lightbulb-on-20",
      color: "purple darken-2",
      actionText1: "Explore",
      actionText2: "",
      actionIcon2: "",
      rejection: false,
    };
    if (await confirm.value.open(options)) {
    }
  }
};

const onSignUp = () => {};

onMounted(() => {
  // showDialog();
});
</script>

<style lang="scss" scoped></style>