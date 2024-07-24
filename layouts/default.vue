<template>
  <!--<v-layout :class="is_authenticated ? 'auth' : 'not_auth'">-->
    <v-layout :class="{ 'auth': isAuthenticated, 'not_auth': !isAuthenticated }">
  
    <CommonLoading v-if="is_loading" :loading="true" />
    <v-app-bar
      fixed
      app
      :class="$vuetify.display.mobile ? 'py-2' : 'pt-1'"
      class="mb-3 bg-white"
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.display.mobile"
        @click.stop="showNavMobile()"
      />
      <div>
        <v-list-item class="pl-1">
          <v-list-item-title v-if="isAuthenticated" class="d-flex align-center">
            <img src="../assets/image/pollen-lms.svg" />

            <p
              v-if="!$vuetify.display.mobile"
              class="font-weight-bold text-caption ml-1"
            >
              {{ title }}{{ 'ok' }}
            </p>
          </v-list-item-title>
          <v-list-item-title v-else class="d-flex align-center">
            <img src="../assets/image/pollen-logo-white.svg" width="40px" style="padding: 5px;"/>

            <p
              v-if="!$vuetify.display.mobile"
              class="font-weight-bold text-caption ml-1 text-white"
            >
              {{ title }}
            </p>
          </v-list-item-title>
        </v-list-item>
      </div>
      <v-spacer />
      <v-skeleton-loader :loading="is_loading" type="list-item-two-line">
        <v-menu v-if="$vuetify.display.mobile && !is_authenticated">
          <template #activator="{ props }">
            <div>
              <v-btn icon="mdi-dots-vertical" v-bind="props"> </v-btn>
            </div>
          </template>

          <v-card class="rounded pa-1">
            <v-card-text class="pa-0">
              <v-list density="compact">
                <v-list-item>
                  <NuxtLink
                    class="text-grey-darken-1 text-body-2 cursor-pointer text-decoration-none"
                    @click="onSignUp()"
                  >
                    Sign Up with Pollen Pass
                  </NuxtLink>
                </v-list-item>
                <v-list-item>
                  <NuxtLink
                    class="text-grey-darken-1 text-body-2 cursor-pointer text-decoration-none"
                    @click="onLogin()"
                  >
                    Login
                  </NuxtLink>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-menu>
        <div v-else class="my-10" :class="{'bg-white': is_authenticated, 'bg-purple-lms': !is_authenticated}">
          <v-btn
            v-if="!is_authenticated"
            variant="outlined"
            class="my-4 mx-2 me-auto text-capitalize"
            color="#374151"
            @click="onLogin()"
            style="background-color: #fff;"
            >Login</v-btn
          >
          <v-btn
            v-if="!is_authenticated"
            class="my-4 mx-2 me-auto text-capitalize bg-purple-darken-3"
            @click="onSignUp()"
            >Sign Up with Pollen Pass</v-btn
          >
        </div>

        <v-menu v-if="is_authenticated">
          <template #activator="{ props }">
            <div>
              <v-btn
                icon="mdi-account-outline"
                variant="tonal"
                color="primary"
                rounded="lg"
                v-bind="props"
              />
            </div>
          </template>

          <v-card class="rounded pa-1">
            <v-card-text class="pa-0">
              <v-list density="compact">
                <v-list-item
                  class="text-grey-darken-1 text-body-2"
                  @click="showProfileSetting()"
                >
                  <v-icon>mdi-account-details-outline</v-icon> Profile
                </v-list-item>
                <v-list-item>
                  <NuxtLink
                    class="text-grey-darken-1 text-body-2 cursor-pointer text-decoration-none"
                    @click="onLogout()"
                  >
                    <v-icon>mdi-logout</v-icon> Logout
                  </NuxtLink>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-menu>
        <div
          v-if="is_authenticated && !$vuetify.display.mobile"
          class="d-flex flex-column ma-2"
        >
          <h5>
            {{ prolfile?.first_name || prolfile?.name }}
          </h5>
          <h6 v-if="userProfile?.id" class="font-weight-regular">
            Member ID:
            {{ profile?.id }}
          </h6>
        </div>
      </v-skeleton-loader>
    </v-app-bar>
    <v-navigation-drawer
      v-if="show_side_nav && is_authenticated"
      v-model="drawer"
      :rail="rail"
      :permanent="!$vuetify.display.mobile"
      :temporary="$vuetify.display.mobile"
      color="#782CD1"
    >
      <v-list-item v-if="!$vuetify.display.mobile" nav>
        <template #title>
          <div class="py-2 d-flex align-center">
            <v-btn
              v-if="rail"
              variant="text"
              icon="mdi-chevron-right"
              @click.stop="rail = !rail"
            ></v-btn>
            <v-btn
              v-else
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>

            Hide Navigation Bar
          </div>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item nav>
        <template #title>
          <div
            :class="$vuetify.display.mobile ? 'pt-6' : 'pt-1'"
            class="py-2 pl-1 d-flex align-center"
          >
            <v-avatar color="purple-lighten-5 " size="33">
              <span class="purple--text text-h6 text-capitalize">
                {{ "-" }}
              </span>
            </v-avatar>
            <div class="pl-6">
              <div
                class="text-body-2 multiline-text text-white"
                style="width: 160px"
              >
                {{ prolfile?.first_name || "" }}
                {{ prolfile?.last_name || "" }}
              </div>
              <v-chip class="ma-2" variant="outlined" size="x-small"
                >{{ company?.name }}
              </v-chip>
            </div>
          </div>
        </template>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
        density="compact"
        nav
        class="sidebar-list"
        :style="{
          height: $vuetify.display.height <= 430 ? '105%!important' : '',
        }"
      >
        <template v-for="(items, index) in sidebar">
          <v-list-item
            v-if="!items.children"
            :key="index"
            :prepend-icon="items?.icon"
            :title="items.title"
            :value="items.name"
            :to="items.to"
            NuxtLink
            @click="items.name === 'company' ? showCompanySetting() : ''"
          >
          </v-list-item>
          <template v-else>
            <v-list-group :key="index" :value="items.name">
              <template #activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :prepend-icon="items.icon"
                  :title="items.title"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(child, i) in items.children"
                :key="i"
                :value="child.title"
                :to="child.to"
                NuxtLink
              >
                <template v-slot:prepend>
                  <v-icon
                    v-if="rail"
                    :icon="child.icon"
                    class="ml-n14"
                    size="small"
                  ></v-icon>
                  <v-tooltip v-if="rail" activator="parent" location="start">
                    <span>
                      {{ child.title }}
                    </span>
                  </v-tooltip>
                  <div v-if="!rail">
                    <v-icon :icon="child.icon" size="small"></v-icon>
                    <span class="text-body-2 ml-2"> {{ child.title }}</span>
                  </div>
                </template>
              </v-list-item>
            </v-list-group>
          </template>
        </template>
        <v-spacer v-if="$vuetify.display.height > 390"></v-spacer>
        <v-list-item
          class="logout-item w-100"
          :class="{
            'logout-item': $vuetify.display.height > 390,
          }"
        >
          <template #title>
            <div class="d-flex text-center align-center">
              <v-icon
                color="gray"
                size="large"
                @click="onLogout()"
                class="rotate-icon mr-2"
                >mdi-logout</v-icon
              >
              <p class="text-caption pl-6">Logout</p>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex flex-column align-center justify-center"
      style="background: #f9fafb"
    >
      <div class="h-100 w-100 overflow-hidden">
        <slot :user_authenticated="is_authenticated" />
        <ProfileSettings
          v-model="dialogVisible"
          :dialog_value="dialogVisible"
          :user_id="user_id"
          @close="dialogVisible = false"
        />
        <CompanySettings
          v-model="dialogVisibleCompany"
          :dialog_value="dialogVisibleCompany"
          :user_id="user_id"
          @close="dialogVisibleCompany = false"
        />
      </div>
      <v-footer class="pa-0 w-100 d-flex justify-end bg-transparent">
        <p class="text-caption text-grey pr-4 pb-2">
          {{ title }} v{{ version }}
        </p>
      </v-footer>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "~/composables/auth0";
import { useSidebarStore } from "~/stores/sidebar";
import { useSellerStore } from "~/stores/seller";

import { useNuxtApp } from "#app";

const nuxtApp = useNuxtApp();
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const { is_user_authenticated, get_user_id } = useAuth();
const user_id = get_user_id();

const sidebarStore = useSidebarStore();
const sidebar = sidebarStore.sidebarData;

const seller_store = useSellerStore();
const { get_company_profile, get_user_profile } = seller_store;

const currentUrl = computed(() => route.fullPath);
const userProfile = ref({ id: null });
const title = ref("Pollen LMS");
const rail = ref(true);
const zIndex = ref(999);
const drawer = ref(true);
const version = ref("2.0.0");
const dialogVisible = ref(false);
const loading = ref(true);
const showSideNav = ref(true);
const excludeSideNav = ref(["/onboarding"]);
const dialogVisibleCompany = ref(false);
const is_loading = ref(false);
const is_authenticated = computed(() => {
  return is_user_authenticated();
});
const isAuthenticated = ref(false);
const company = ref({
  id: "",
  name: "",
});

const profile = ref({
  auth_id: "",
  first_name: "",
  last_name: "",
});
const show_side_nav = computed(() => {
  if (excludeSideNav.value.includes(currentUrl.value)) {
    return false;
  }
  return true;
});

onMounted(async () => {

  await get_company();
  await get_profile();
  isAuthenticated.value = is_user_authenticated();

  //setInterval(() => {
  //  console.log('is_authenticated',is_authenticated.value);
  //}, 800);

  //is_loading.value = true;
  //const req_company = await get_company();
  //const req_profile = await get_profile();
  //if (!req_company && !req_profile) {
  //  is_loading.value = false;
  //} else {
  //  is_loading.value = true;
  //}
});

const get_company = async () => {
  const req = await get_company_profile(user_id);
  if (req) {
    if (JSON.stringify(company.value) !== JSON.stringify(req)) {
      company.value = req;
    }
  }
};
const get_profile = async () => {
  const req = await get_user_profile(user_id);
  if (req) {
    if (JSON.stringify(profile.value) !== JSON.stringify(req)) {
      profile.value = req.data ? req.data : req;
    }
  }
};
const showProfileSetting = () => {
  dialogVisible.value = true;
};

const showCompanySetting = () => {
  dialogVisibleCompany.value = true;
};

const showNavMobile = () => {
  drawer.value = !drawer.value;
  rail.value = false;
};

const onLogin = () => {
  navigateTo("/auth/login");
};

const onSignUp = () => {
  navigateTo("/auth/login");
};

const onLogout = () => {
  localStorage.clear();
  window.location.reload();
};

const getUserInfo = async (param) => {
  try {
  } catch (err) {}
};
</script>

<style lang="scss" scoped>
</style>