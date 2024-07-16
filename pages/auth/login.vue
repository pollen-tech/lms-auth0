<template>
  <div class="h-screen">
    <v-row no-gutters>
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
          <AuthLogin v-if="!isEmailSent" @submit="goToVerification" />
          <AuthVerification
            v-else
            :email="email"
            @previous-page="goToLogin"
            @verify-otp-event="verifyOtp"
            @send-otp-event="resendOtp"
            @submit="goToRedirect"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { lmsApi } from "~/services/api";

definePageMeta({
  layout: false,
});

const isEmailSent = ref(false);
const email = ref("");
const otp = ref("");
const isOtpValid = ref(false);

const verifyOtp = async (param) => {
  try {
    otp.value = param;
    isOtpValid.value = true;
    const body = {
      otp: otp.value,
    };
    const otpMessage = await lmsApi(url, "POST", body);
    if (!otpMessage.statusCode) {
      return otpMessage;
    } else {
    }
  } catch (err) {}
};

const resendOtp = () => {
  sendOtp();
};
const goToLogin = () => {
  isEmailSent.value = false;
};

const sendOtp = async () => {
  try {
    const body = {
      email: email.value,
    };
    console.log(body);
    // const otpMessage = await lmsApi(url, "POST", body);
    // if (!otpMessage.statusCode) {
    //   return otpMessage;
    // } else {
    // }
  } catch (err) {}
};
const goToVerification = (param) => {
  email.value = param;
  isEmailSent.value = true;
};

const goToRedirect = () => {
  // navigateTo("/redirect");

  navigateTo("/onboarding");
};
</script>

<style lang="scss" scoped></style>
