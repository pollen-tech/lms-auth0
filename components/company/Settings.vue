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
                  :items="[company.name, 'Contact Information']"
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
                          :disabled="!is_available"
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
                      <div class="my-2 text-start flex-1-0">
                        <label class="font-weight-medium"
                          >Company Type <span class="red--text">*</span>
                        </label>
                        <v-combobox
                          v-model="company.company_type_id"
                          :items="seller_store.sellerCompanyTypes"
                          item-value="id"
                          item-title="name"
                          :return-object="true"
                          placeholder="Select Company Type"
                          variant="outlined"
                          :rules="required"
                          :disabled="form_disabled"
                        >
                          <template v-slot:item="data">
                            <v-list-item
                              :key="data.item.id"
                              @click="
                                () => {
                                  console.log(data);
                                  data.props.onClick(data.item);
                                }
                              "
                              v-bind="data.attrs"
                            >
                              <template v-slot:prepend> </template>

                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ data.item.title }}

                                  <v-tooltip class="custom-icon">
                                    <div
                                      class="multiline-text d-flex flex-column"
                                      style="width: 250px"
                                    >
                                      <b>{{ data.item.title }}</b>
                                      <span>{{
                                        data.item.raw.description
                                      }}</span>
                                    </div>
                                    <template v-slot:activator="{ props }">
                                      <v-icon
                                        v-bind="props"
                                        size="x-small"
                                        color="grey"
                                        icon="mdi-information-outline"
                                      ></v-icon>
                                    </template>
                                  </v-tooltip>
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                        </v-combobox>
                      </div>

                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Country of Operations
                          <span class="red--text">*</span></label
                        >
                        <v-autocomplete
                          v-model="company.country"
                          item-value="id"
                          item-title="name"
                          :items="countries"
                          :return-object="true"
                          placeholder="Choose One"
                          variant="outlined"
                          :rules="required"
                          clearable
                          :disabled="form_disabled"
                        />
                      </div>

                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >How much are you looking to liquidate monthly?
                          <span class="red--text">*</span></label
                        >
                        <v-autocomplete
                          v-model="company.liquidate_unit_id"
                          item-value="id"
                          item-title="name"
                          :items="seller_store.sellerLiquidate"
                          :return-object="true"
                          placeholder="Choose Multiple"
                          variant="outlined"
                          :rules="required"
                          clearable
                          :disabled="form_disabled"
                        />
                      </div>
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
                    <v-sheet class="ma-2 pa-6 bg-white">
                      <v-btn
                        block
                        text="Save Changes"
                        color="#8431e7"
                        class="ma-1 me-auto w-50 text-capitalize rounded-lg"
                        :disabled="!isAvailable"
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
import "vue-tel-input/vue-tel-input.css";
import { useSellerStore } from "~/stores/seller";
import { useCountryStore } from "~/stores/country";

const props = defineProps({
  dialog_value: { type: String, default: false },
  user_id: { type: String, default: "" },
});
const emit = defineEmits(["close"]);

const runtimeConfig = useRuntimeConfig();

const seller_store = useSellerStore();
const { get_company_profile } = seller_store;
const countryStore = useCountryStore();
const { countries } = storeToRefs(countryStore);

const dialogVisible = ref(false);
const is_available = ref(false);
const form_disabled = ref(true);
const company = ref({
  id: "",
  name: "",
  company_type_id: "",
  country: "",
  liquidate_unit_id: "",
});
const required = [(v) => !!v || "Field is required"];

onUpdated(async () => {
  if (props.dialog_value && !company.value.id) {
    seller_store.getCompanyTypes();
    seller_store.getLiquidateUnit();
    countryStore.getCountries();
    await getCompany();
  }
});

const getCompany = async () => {
  const req = await get_company_profile(props.user_id);
  if (req) {
    if (JSON.stringify(company.value) !== JSON.stringify(req)) {
      company.value = req;
    }
  }
};

const closeDialog = () => {
  dialogVisible.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped></style>
