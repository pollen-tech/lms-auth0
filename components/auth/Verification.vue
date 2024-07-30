<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" md="6" class="text-left">
        <v-sheet>
          <v-btn
            variant="text"
            prepend-icon="mdi-chevron-left"
            style="color: #6b7280"
            class="text-capitalize"
            @click="$emit('previousPage')"
            alt="Back"
          >
            <template v-slot:prepend>
              <v-icon color="#6B7280"></v-icon>
            </template>
            Previous
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
    <div
      class="d-flex flex-column align-center mx-16"
      :style="{
        'margin-top': $vuetify.display.mobile ? '20px' : '10%',
      }"
    >
      <h3>{{ title }}</h3>

      <p class="my-4">{{ desc }}</p>
      <p class="my-2 font-weight-bold">{{ email }}</p>
      <v-card
        :width="$vuetify.display.mobile ? 300 : 450"
        elevation="0"
        class="align-center my-4"
      >
        <v-form ref="form">
          <div class="my-4 text-start flex-1-0">
            <v-otp-input
              v-model="otp"
              :length="otpLength"
              :loading="isOtpLoading"
            ></v-otp-input>
          </div>

          <p v-if="!isOtpValid" class="red--text text-caption mt-2 text-center">
            OTP is invalid
          </p>

          <div class="text-center my-4 grey--text">
            <p>
              Didn’t receive a code?
              <span v-if="timerRunning" class="black--text">
                Resend in <span class="font-weight-bold">{{ formatTime }}</span>
              </span>
              <v-btn
                v-else
                class="purple-text text-capitalize text-body-1 pa-0"
                variant="text"
                @click="resendOtp"
                >Resend OTP</v-btn
              >
            </p>

            <p>
              Incorrect email address?
              <v-btn
                class="purple-text text-capitalize text-body-1 pa-0"
                variant="text"
                @click="$emit('previousPage')"
              >
                Return to Login/Sign Up form</v-btn
              >
            </p>
          </div>
          <v-btn
            class="custom-button my-4 me-auto text-capitalize rounded-lg"
            color="#8431E7"
            block
            :loading="isLoading"
            @click="submit"
            >Continue</v-btn
          >
        </v-form>
      </v-card>

      <v-dialog
        v-model="showDialog"
        persistent
        class="mx-auto pa-2"
        :width="$vuetify.display.mobile ? 'auto' : '550'"
      >
        <v-card :title="dialogTitle">
          <v-card-text>
            <p>
              Acknowledgment that the user has successfully filled out the
              onboarding form, indicating readiness to proceed with the next
              steps in the user journey.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              class="ma-2 text-capitalize"
              href="/profile"
              >Go to Profile</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["verifyOtpEvent", "sendOtpEvent", "previousPage"]);

const props = defineProps({
  email: { type: String, default: "-" },
  referenceId: { type: String, default: "" },
  isOtpValid: { type: Boolean, default: true },
  isOtpLoading: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  otpType: { type: String, default: "sms" },
});

const title = ref("Enter Verification Code");
const desc = ref("We have sent a 6-digit code to:");
const item = ref({ items: [] });
const required = [(v) => !!v || "Field is required"];
const isLoading = ref(false);
const showDialog = ref(false);

const otp = ref("");
const otpLength = ref(6);
const totalTime = ref(120);
const remainingTime = ref(120);
const timerRunning = ref(false);
const timerInterval = ref(null);

const submit = () => {
  isLoading.value = true;
  emit("verifyOtpEvent", otp.value);
};
const formatTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
});

const startTimer = () => {
  if (!timerRunning.value) {
    timerRunning.value = true;
    timerInterval.value = setInterval(updateTimer, 1000);
  }
};

const updateTimer = () => {
  if (remainingTime.value > 0) {
    remainingTime.value--;
  } else {
    timerRunning.value = false;
    clearInterval(timerInterval.value);
  }
};

const resendOtp = async () => {
  remainingTime.value = totalTime.value;
  await emit("sendOtpEvent", props.email);
  startTimer();
  otp.value = "";
};
</script>
<style>
.custom-icon > .v-overlay__content {
  background: #6b7280 !important; /* Change this to your desired background color */
  color: #fff; /* Change this to your desired text color */
  border-radius: 8px !important;
  padding: 8px !important;
  font-size: 12px !important;
}

/* Optional: Customize the tooltip arrow */
.custom-icon .v-overlay__content::after {
  content: "◀"; /* Unicode arrow left character */
  font-family: "Material Icons"; /* Material Icons font family */
  color: #6b7280; /* Match this with your tooltip background color */
  position: absolute;
  top: 55%;
  left: -12px; /* Position arrow on the right side */
  transform: translateY(-50%);
  font-size: 16px; /* Adjust the size of the arrow icon */
}
</style>
