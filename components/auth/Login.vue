<template>
  <div>
    <div
      class="d-flex flex-column align-center mx-xs-4 mx-16 "
      :style="{
        'margin-top': $vuetify.display.mobile ? '20px' : '10%',
      }"
    >
      <div class="text-caption justify-center mb-12 d-flex d-sm-flex flex-column flex-sm-row">
        <img
          src="~/assets/image/pollen-logo.svg"
          class="mx-4"
          style="width: 50px"
        />
        <div style="font-size: 14px;">
          <p class="font-weight-bold font-">
            {{ notification.title }}
          </p>
          <p>
            {{ notification.desc }}
          </p>
        </div>
      </div>
      <h3 style="color: #111827; font-size: 20px">{{ title }}</h3>
      <p style="color: #111827; font-size: 14x">{{ subtitle }}</p>

      <v-card
        :width="$vuetify.display.mobile ? 300 : 450"
        elevation="0"
        class="align-center my-4"
      >
        <v-form ref="formRef">
          <div class="my-4 text-start flex-1-0">
            <label class="font-weight-medium" style="font-size: 14px"
              >Enter your Pollen Pass registered email <span class="red--text">*</span>
            </label>

            <v-text-field
              v-model="email"
              variant="outlined"
              placeholder="Enter Email"
              :rules="required_email"
              class="custom-text-field"
              @input="validateEmail"
              autocomplete="email"
            ></v-text-field>
          </div>
          <v-btn
            class="custom-button my-4 me-auto text-capitalize rounded-lg"
            color="#8431E7"
            block
            :loading="is_loading"
            @click="onValidateExistEmail()"
            :color="isEmailValid ? 'success' : 'default'"
            :disabled="!isEmailValid"
            >Sign in</v-btn>
            <p class="text-center" style="color: #111827; font-size: 14px">
              Want to access Pollen LMS?
              <a href="#" @click="onSignUp()" class="link">Sign Up with Pollen Pass</a>
            </p>
        </v-form>
      </v-card>
      <SmallDialog />


      <!--<v-dialog
        v-model="show_dialog"
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
      </v-dialog>-->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { lmsApi } from "~/services/api";
import { useDialogStore } from "@/stores/dialog";
import SmallDialog from "@/components/common/SmallDialog.vue";


const dialogStore = useDialogStore();

const emit = defineEmits(["submit"]);

const data = ref(null);
const item = ref({ items: [] });
const title = ref("Login");
const subtitle = ref("Login to LMS using your pollen pass email");

const notification = ref({
  title: "How to Start Selling with Pollen's Liquidation Management System",
  desc: "Sign up and get a free LMS account to start listing excess and obsolete inventory, and receive offers from Pollen's verified buyers around the world",
});
const email = ref("");
const required_email = [
  (v) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) ||
    "E-mail must be valid",
];
const is_loading = ref(false);
const show_dialog = ref(false);
const isEmailValid = ref(false);
const formRef = ref(null);
const config = useRuntimeConfig();

const validateEmail = () => {
  isEmailValid.value = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(
    email.value
  );
};

const showDialog = () => {
  dialogStore.showDialog(
    "Email Not Registered",
    'It looks like the email address you entered is not registered in our system. Please check the email address and try again. If you are new here, you can sign up to create a new Pollen Pass  account. For assistance please send us a message at <a href="mailto:cs@pollen.tech">cs@pollen.tech.</a>'
  );
};

const onValidateExistEmail = async () => {
  //let email = this.email.value;
  console.log("onValidateExistEmail -", email.value);

  try {
    //const req = await lmsApi("/onboard-company", "POST", body);
    const body = '';

    //const response = await lmsApi(`/users/pollen-pass-by-email/${email}`, "GET", body);

    const response = await fetch(
      `${config.public.lmsBackendUrl}/users/pollen-pass-by-email/${email.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data.value = await response.json();

    console.log(data.value.status_code);

    if (data.value.status_code === "OK") {
      console.log("submit");
      submit();
    } else {
      //console.log("showDialog");
      showDialog();
    }
  } catch (err) {
    error.value = "Failed to fetch data";
    console.log(err);
  }
};

const submit = async () => {
  is_loading.value = true;
  const { valid } = await formRef.value.validate();
  if (valid) {
    emit("submit", email.value);
    setTimeout(() => {
      is_loading.value = false;
    }, 1500);
  }
};

const onSignUp = () => {
  navigateToPollenPass("signup");
};

const navigateToPollenPass = (param) => {
  const url = new URL(config.public.pollenPassUrl);
  url.searchParams.append("channel", "CH_LMS");
  url.searchParams.append("action", param);
  navigateTo(url.toString(), { external: true });
};

onMounted(async () => {});
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
