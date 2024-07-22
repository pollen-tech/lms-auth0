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
                    <b style="letter-spacing: 0.03em"
                      >Pollen Pass Profile Settings</b
                    >
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
              <v-tabs
                v-model="tab"
                align-tabs="start"
                color="deep-purple-accent-4"
              >
                <v-tab value="1" class="text-capitalize"
                  >Pollen Pass Profile Settings</v-tab
                >
                <v-tab value="2" class="text-capitalize"
                  >Channel Profiles</v-tab
                >
              </v-tabs>

              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="1">
                  <v-container fluid>
                    <v-row>
                      <v-col class="ma-2">
                        <p class="font-weight-bold text-body-1 mb-6">
                          Company Information
                        </p>
                        <v-sheet class="bg-white pa-6">
                          <p class="font-weight-bold text-body-1 mb-6">
                            Company Information
                            <span class="text-caption"> (Not Available)</span>
                          </p>
                          <div class="my-2">
                            <label class="font-weight-medium text-body-2"
                              >First Name
                              <span class="red--text">*</span></label
                            >

                            <v-text-field
                              v-model="profile.first_name"
                              variant="outlined"
                              placeholder="Enter First Name"
                              :rules="required"
                              :disabled="!isAvailable"
                            ></v-text-field>
                          </div>
                          <div class="my-2">
                            <label class="font-weight-medium text-body-2"
                              >Last Name <span class="red--text">*</span></label
                            >

                            <v-text-field
                              v-model="profile.last_name"
                              variant="outlined"
                              placeholder="Enter Last Name"
                              :rules="required"
                              :disabled="!isAvailable"
                            ></v-text-field>
                          </div>
                          <div class="my-2">
                            <label class="font-weight-medium text-body-2"
                              >Phone Number
                              <span class="red--text">*</span></label
                            >
                            <VueTelInput
                              v-model="profile.phone"
                              mode="international"
                              :required="true"
                              :maxLen="20"
                              :value="phone"
                              :disabledFormatting="true"
                              :validCharactersOnly="true"
                              :class="phoneValid ? 'phoneStyle' : 'hasError'"
                              :dropdownOptions="{
                                showDialCodeInSelection: true,
                                showSearchBox: true,
                                showFlags: true,
                              }"
                              @validate="phoneObject"
                              :disabled="!isAvailable"
                            />
                            <p
                              v-if="!phoneValid"
                              class="red--text text-caption ml-3 mt-1"
                            >
                              Field is required
                            </p>
                          </div>
                          <div class="my-2">
                            <label class="font-weight-medium text-body-2"
                              >Email <span class="red--text">*</span></label
                            >

                            <v-text-field
                              v-model="profile.email"
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
                        <div class="profile-card py-4 px-8 mt-12">
                          <div class="d-flex justify-end">
                            <img
                              src="../../assets/image/avatar_pollen_white.webp"
                              style="height: 80px; width: auto"
                            />
                          </div>

                          <div class="d-flex ga-3">
                            <img
                              src="../../assets/image/profile_card_user.png"
                            />
                            <div class="text-white">
                              <p class="font-weight-bold">
                                {{ profile?.first_name || "-" }}
                                {{ profile?.last_name || "-" }}
                              </p>
                              <p class="text-caption">
                                {{ profile?.email }}
                              </p>
                              <p class="text-caption">
                                {{ profile?.phone_no }}
                              </p>
                            </div>
                          </div>

                          <div
                            class="d-flex justify-space-between text-white mt-8"
                          >
                            <div>
                              <p class="font-weight-bold">Pollen Pass ID #:</p>
                              <p class="font-weight-bold">
                                {{ profile?.id }}
                              </p>
                            </div>
                            <div>
                              <p class="font-weight-bold text-caption">
                                Pollen Member since:
                              </p>
                              <p class="font-weight-bold text-body-2">
                                {{
                                  moment(profile?.created_at).format(
                                    "DD/MM/YYYY"
                                  )
                                }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tabs-window-item>
                <v-tabs-window-item value="2">
                  <v-container fluid>
                    <v-table class="bg-white">
                      <thead>
                        <tr class="">
                          <th class="text-left font-weight-bold">Channel</th>
                          <th class="text-left font-weight-bold">Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ CHANNEL[profile.channel] || "unknown" }}</td>
                          <td>
                            {{
                              moment(profile?.created_at).format("DD/MM/YYYY")
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-container>
                </v-tabs-window-item>
              </v-tabs-window>
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
import { CHANNEL } from "~/utils/constant";

const props = defineProps({
  dialog_value: { type: Boolean, default: false },
  user_id: { type: String, default: "" },
});
const emit = defineEmits(["close"]);

const runtimeConfig = useRuntimeConfig();

const seller_store = useSellerStore();
const { get_user_profile } = seller_store;

const tab = ref(null);
const dialogVisible = ref(false);
const phoneValid = ref(true);
const isAvailable = ref(false);
const profile = ref({
  id: "",
  first_name: "",
  last_name: "",
  country_code: "",
  phone_no: "",
  phone_verified: false,
  email: "",
  channel: "",
  status: "",
  created_at: "",
});
const required = [(v) => !!v || "Field is required"];

onMounted(async () => {
  // await getUserInfo(""); TODO
});
onUpdated(async () => {
  console.log(props.dialog_value && !profile.value.id);
  if (props.dialog_value && !profile.value.id) {
    await get_profile();
  }
});

const get_profile = async () => {
  const req = await get_user_profile(props.user_id);
  if (req) {
    if (JSON.stringify(profile.value) !== JSON.stringify(req)) {
      profile.value = req;
      console.log(profile.value);
    }
  }
};
const phoneObject = (object) => {
  phoneValid.value = object.valid;
  profile.value.phone = object?.number;
};

const closeDialog = () => {
  dialogVisible.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped></style>
