<template>
  <div class="h-screen">
    <CommonLoading v-if="isLoading" :loading="true" />
    <v-row v-if="showLogin" no-gutters>
      <v-col
        v-if="!$vuetify.display.mobile"
        cols="12"
        md="4"
        lg="4"
        class="pa-12 side-container h-screen"
      >
        <AuthSideBar />
      </v-col>
      <v-col cols="12" md="8">
        <div class="ma-8">
          <AuthLogin v-if="!isEmailSent" @submit="sendOtp" />
          <AuthVerification
            v-else
            :email="email"
            @previous-page="goToLogin"
            @verify-otp-event="verifyOtp"
            @send-otp-event="sendOtp"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { lmsApi } from "~/services/api";
import { useAuth } from "~/composables/auth0";

definePageMeta({
  layout: false,
});

const router = useRouter();
const auth = useAuth();

const isEmailSent = ref(false);
const email = ref("");
const otp = ref("");
const isOtpValid = ref(false);
const isLoading = ref(false);
const showLogin = ref(false);
const isAuthenticated = computed(() => auth.isUserAuthenticated());

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    console.log(isAuthenticated.value);
    isLoading.value = false;
    showLogin.value = !isAuthenticated.value;
    if (isAuthenticated.value) {
      router.push("/");
    }
  }, 2000);
});

const verifyOtp = async (param) => {
  try {
    otp.value = param;
    isOtpValid.value = true;
    const body = {
      code: otp.value,
      channel_code: "CH_LMS",
    };
    // http://localhost:3080/auth0/password-less-email-otp-validate/rajesh.hofo%40gmail.com?code=967060&channel_code=CH_LMS
    const url = `/auth0/password-less-email-otp-validate/${encodeURIComponent(
      email.value
    )}`;
    const queryParams = new URLSearchParams(body).toString();
    const fullUrl = `${url}?${queryParams}`;

    const req = await lmsApi(fullUrl, "POST");

    if (req) {
      auth.handleAuth0Response(req);
      isEmailSent.value = true;
      goToRedirect();
    } else {
      console.log(req);
    }
  } catch (err) {
    console.log(err);
  }
};

const goToLogin = () => {
  isEmailSent.value = false;
};

const sendOtp = async (param) => {
  try {
    email.value = param;
    isOtpValid.value = true;
    const req = await lmsApi(
      `/auth0/password-less-email-login/${email.value}`,
      "POST"
    );
    if (req) {
      isEmailSent.value = true;
    }
  } catch (err) {
    console.log(err);
  }
};
const goToRedirect = () => {
  // navigateTo("/redirect");

  navigateTo("/onboarding");
};
</script>

<style lang="scss" scoped></style>
