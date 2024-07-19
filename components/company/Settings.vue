<template>
  <v-dialog
    v-model="dialogVisible"
    fullscreen
    absolute
    persistent
    scrollable
    :width="$vuetify.display.mobile ? '100%' : '80%'"
    height="100%"
    content-class="dialog-right"
    class="h-100"
  >
    <v-btn
      v-if="$vuetify.display.mobile"
      variant="plain"
      icon="mdi-close"
      class="mt-5 mx-2 floating-close-btn"
      @click="closeDialog()"
    />
    <v-card
      outlined
      color="transparent"
      :class="
        'w-screen' + !$vuetify.display.mobile ? 'float-right' : 'text-center'
      "
    >
      <v-row no-gutters class="h-100">
        <v-col
          v-if="!$vuetify.display.mobile"
          cols="2"
          class="d-flex justify-end"
        >
          <v-btn
            stacked
            variant="tonal"
            class="notification__close rounded-0 rounded-s-lg"
            @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col
          :cols="$vuetify.display.mobile ? 12 : 10"
          style="background: #f9fafb"
        >
          <v-sheet class="rounded-lg h-100" style="background: #f9fafb">
            <div class="py-6 px-4 bg-white">
              <v-row>
                <v-col sm="2" md="1" class="d-flex justify-start mx-2">
                  <v-avatar rounded="0" color="#FAF5FF" size="55">
                    <img src="../../assets/image/pollen-lms.svg" />
                  </v-avatar>
                </v-col>

                <v-col sm="11" md="7" class="d-flex flex-row">
                  <div>
                    <b style="letter-spacing: 0.03em">Company Settings</b>
                    <p class="text-caption text-grey">
                      Here you can update and view your Pollen Pass credentials
                    </p>
                  </div>
                </v-col>
                <v-col
                  sm="12"
                  md="3"
                  :class="
                    !$vuetify.display.mobile ? 'justify-end' : 'justify-start'
                  "
                  class="d-flex"
                >
                </v-col>
              </v-row>
            </div>
            <div class="px-10 py-4">
              <div class="d-flex flex-column mb-2">
                <v-breadcrumbs
                  class="text-caption text-capitalize"
                  color="deep-purple-accent-4"
                  :items="['Company Name', 'Contact Information']"
                >
                  <template #prepend>
                    <v-icon size="small" color="#782CD1">mdi-home</v-icon>
                  </template>
                </v-breadcrumbs>
              </div>
              <v-container fluid>
                <p class="font-weight-bold text-body-1 mb-6 mx-2">
                  Seller Company Information
                </p>
                <v-row>
                  <v-col class="ma-2">
                    <v-sheet class="bg-white pa-6">
                      <p class="font-weight-bold text-body-1 mb-6">
                        Company Information
                      </p>
                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Account ID <span class="red--text">*</span></label
                        >

                        <v-text-field
                          v-model="company.id"
                          variant="outlined"
                          placeholder="Enter First Name"
                          :rules="required"
                          :disabled="!isAvailable"
                        ></v-text-field>
                      </div>
                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Company Name <span class="red--text">*</span></label
                        >

                        <v-text-field
                          v-model="company.name"
                          variant="outlined"
                          placeholder="Enter Last Name"
                          :rules="required"
                          :disabled="!isAvailable"
                        ></v-text-field>
                      </div>
                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Company Type
                        </label>

                        <v-text-field
                          v-model="company.type"
                          variant="outlined"
                          placeholder="Enter Preferred Name"
                          :rules="required"
                          :disabled="!isAvailable"
                        ></v-text-field>
                      </div>

                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Country of Operations
                          <span class="red--text">*</span></label
                        >

                        <v-text-field
                          v-model="company.country"
                          variant="outlined"
                          placeholder="Enter Email"
                          :rules="required"
                          :disabled="!isAvailable"
                        ></v-text-field>
                      </div>

                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >How much are you looking to liquidate monthly?
                          <span class="red--text">*</span></label
                        >

                        <v-text-field
                          v-model="company.liquidate"
                          variant="outlined"
                          placeholder="Enter Email"
                          :rules="required"
                          :disabled="!isAvailable"
                        ></v-text-field>
                      </div>
                    </v-sheet>
                    <v-sheet class="ma-2 pa-6 bg-white">
                      <v-btn
                        text="Save Changes"
                        color="#8431e7"
                        class="mb-2 mx-2 me-auto w-50 text-capitalize"
                        block
                        :disabled="!isAvailable"
                      />
                    </v-sheet>
                  </v-col>
                  <v-col>
                    <v-sheet class="ma-2 pa-6 bg-white">
                      <p class="font-weight-bold text-body-1 mb-6">
                        Company Logo
                      </p>
                      <v-row>
                        <v-col cols="12" md="12" lg="3">
                          <v-avatar color="purple-lighten-5" size="80">
                            <span
                              v-if="!imageSrc"
                              class="text-h4 text-capitalize text-purple"
                            >
                              SC
                            </span>
                            <v-img v-else cover :src="imageSrc" />
                          </v-avatar>
                        </v-col>
                        <v-col cols="12" md="12" lg="7">
                          <p class="text-caption mb-2">
                            Optimal size 300x300, up to 10Mb. Supported file
                            PNG, JPG or JPEG.
                          </p>
                          <v-btn
                            variant="outlined"
                            @click="openFileInput"
                            disabled
                          >
                            Upload Image
                          </v-btn>
                          <input
                            id="fileImport"
                            ref="fileImport"
                            type="file"
                            style="display: none"
                            @change="onFileChange"
                          />
                        </v-col>
                        <v-tooltip activator="parent">
                          Not Available
                        </v-tooltip>
                      </v-row>
                    </v-sheet>
                    <v-sheet class="ma-2 pa-6 w-100 bg-white">
                      <v-btn
                        block
                        text="Save Changes"
                        color="#8431e7"
                        class="ma-1 me-auto w-50 text-capitalize rounded-lg"
                      />
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import moment from "moment";

import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import { lmsApi } from "~/services/api";
import { useSellerStore } from "~/stores/seller";

const props = defineProps({
  userId: { type: String, default: "" },
});
const emit = defineEmits(["close"]);

const runtimeConfig = useRuntimeConfig();

const { getCompanyProfile } = useSellerStore();

const userProfile = ref({ id: null });
const dialogVisible = ref(false);
const isAvailable = ref(false);

onMounted(async () => {
  getCompany();
  // await getUserInfo(""); TODO
});

const getCompany = async () => {
  const req = await getCompanyProfile(props.userId);
  if (req) {
    company.value = req;
  }
};
const company = ref({
  id: "",
  name: "",
  type: "",
  country: "",
  liquidate: "",
});
const required = [(v) => !!v || "Field is required"];

const closeDialog = () => {
  dialogVisible.value = false;
  emit("close");
};

const getUserInfo = async (param) => {
  try {
    const url = `${runtimeConfig.public.lmsApi}/user/reference/${param}`;
    const req = await lmsApi(url, "GET");
    if (!req.statusCode) {
      userProfile.value = req || {};
      profile.value = {
        firstname: req.firstName,
        lastname: req.lastName,
        phone: req.phone,
        email: req.email,
      };
    } else {
    }
  } catch (err) {}
};
</script>

<style lang="scss" scoped></style>
