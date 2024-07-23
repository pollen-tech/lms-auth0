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
          <AuthLogin v-if="!isEmailSent" @submit="send_otp" />
          <AuthVerification
            v-else
            :email="email"
            @previous-page="go_to_login"
            @verify-otp-event="verify_otp"
            @send-otp-event="send_otp"
          />
        </div>
      </v-col>
    </v-row>
    <NotificationStatus />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { lmsApi } from "~/services/api";
import { useAuth } from "~/composables/auth0";
import { useCommonStore } from "~/stores/common";

definePageMeta({
  layout: false,
  middleware: "auth",
});

const router = useRouter();
const auth = useAuth();
const commonStore = useCommonStore();

const isEmailSent = ref(false);
const email = ref("");
const otp = ref("");
const isOtpValid = ref(false);
const isLoading = ref(false);
const showLogin = ref(false);
const is_authenticated = computed(() => auth.is_user_authenticated());

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    showLogin.value = !is_authenticated.value;
    if (is_authenticated.value) {
      router.push("/");
    }
  }, 800);
});

const verify_otp = async (param) => {
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
      go_to_redirect();
    } else {
      getErrorMessage(req);
      console.log(req);
    }
  } catch (err) {
    console.log(err);
  }
};

const go_to_login = () => {
  isEmailSent.value = false;
};

const send_otp = async (param) => {
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

const getErrorMessage = (req) => {
  let errorMsg = req.message;
  if (typeof req.message !== "string") {
    const formattedMessages = req.message.map((message) => {
      const words = message.split(" ");
      words[0] = "• " + words[0];
      return words.join(" ");
    });

    errorMsg = formattedMessages.join(",<br/>");
  }

  commonStore.setShowNotification({
    display: true,
    status: "error",
    msg: errorMsg,
  });
};
const go_to_redirect = () => {
  navigateTo("/onboarding");
};
</script>

<style lang="scss" scoped></style>
