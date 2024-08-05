<template>
  <div>
    <div class="d-flex flex-column align-center">
      <h3>Complete your Company Information</h3>

      <v-card
        :width="$vuetify.display.mobile ? 300 : 450"
        elevation="0"
        class="align-center my-4"
      >
        <v-form ref="formRef">
          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium"
                >Company Name <span class="red--text">*</span>
                <v-icon
                  icon="mdi-information-outline"
                  size="x-small"
                  color="grey"
                  class="custom-icon"
                />
                <v-tooltip activator="parent" class="custom-icon">
                  Legal name of the company
                </v-tooltip>
              </label>
              <v-spacer />
              <v-chip
                v-if="validateCompanyName == 1"
                variant="tonal"
                color="#15803D"
                density="comfortable"
                size="x-small"
                text="Available"
              />
              <v-chip
                v-if="validateCompanyName == 2"
                variant="tonal"
                color="#B45309"
                density="comfortable"
                size="x-small"
                text="Already Exist"
              />
            </div>

            <v-text-field
              v-model="item.companyName"
              variant="outlined"
              placeholder="Enter Company Name"
              :rules="required"
              @blur="onValidateCompanyName"
            ></v-text-field>
          </div>
          <div class="my-2 text-start flex-1-0">
            <label class="font-weight-medium"
              >Company Type <span class="red--text">*</span>
            </label>
            <v-combobox
              v-model="item.types"
              :items="sellerStore.sellerCompanyTypes"
              item-value="id"
              item-title="name"
              :return-object="false"
              placeholder="Select Company Type"
              variant="outlined"
              :rules="required"
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
                          <span>{{ data.item.raw.description }}</span>
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

          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium"
                >Country of Operation <span class="red--text">*</span>
                <v-icon
                  icon="mdi-information-outline"
                  size="x-small"
                  color="grey"
                  class="custom-icon"
                />
                <v-tooltip activator="parent" class="custom-icon">
                  where your company is registered
                </v-tooltip>
              </label>
            </div>
            <v-autocomplete
              v-model="item.country"
              item-value="id"
              item-title="name"
              :items="countries"
              :return-object="true"
              placeholder="Choose One"
              variant="outlined"
              :rules="required"
              clearable
              @update:model-value="fetchCity"
            />
          </div>
          <div class="mb-2 mt-4 text-start flex-1-0">
            <label class="font-weight-medium"
              >How much are you looking to liquidate monthly?*
              <span class="red--text">*</span></label
            >
            <v-autocomplete
              v-model="item.liquidate"
              item-value="id"
              item-title="name"
              :items="sellerStore.sellerLiquidate"
              :return-object="true"
              placeholder="Choose Multiple"
              variant="outlined"
              :rules="required"
              clearable
            />
          </div>
          <v-checkbox
            v-model="checkAcceptTerms"
            hide-details
            @change="checkTerms()"
          >
            <template v-slot:label>
              <div>
                Accept Pollen
                <a
                  href="https://www.pollen.tech/privacy"
                  target="_blank"
                  style="color: #6a27b9"
                  v-bind="props"
                  @click.stop
                >
                  Terms and Conditions
                </a>
              </div>
            </template>
          </v-checkbox>
          <v-btn
            :disabled="!checkAcceptTerms"
            class="my-4 me-auto text-capitalize rounded-lg"
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
import { useSellerStore } from "~/stores/seller";
import { useCountryStore } from "~/stores/country";
import { lmsApi } from "~/services/api";

const emit = defineEmits(["submit"]);
const props = defineProps({
  userId: { type: String, default: "" },
  companyId: { type: String, default: "" },
});

const profile = ref({
  auth_id: "",
  first_name: "",
  last_name: "",
  country_code: "",
  phone_no: "",
  phone_verified: false,
  email: "",
  channel: "",
  status: "",
  created_at: "",
  pollen_pass_id: "",
});

const sellerStore = useSellerStore();
const { get_company_profile, get_user_profile } = sellerStore;

const countryStore = useCountryStore();
const { countries } = storeToRefs(countryStore);

const item = ref({ items: [] });
const required = [(v) => !!v || "Field is required"];
const isLoading = ref(false);
const showDialog = ref(false);
const validateCompanyName = ref(0);
const checkAcceptTerms = ref(false);
const formRef = ref(null);
const company = ref({});

onMounted(async () => {
  sellerStore.getCompanyTypes();
  sellerStore.getLiquidateUnit();
  countryStore.getCountries();
  await getCompany();
  await get_profile();
});

const fetchCity = () => {};
const submit = async () => {
  try {
    const { valid } = await formRef.value.validate();
    console.log(item.value);
    if (valid) {
      const body = {
        name: item.value.companyName,
        company_type_id: item.value.types,
        operation_country_id: item.value.country.country_id,
        operation_country_name: item.value.country.name,
        liquidate_unit_id: item.value.liquidate.id,
        liquidate_unit_name: item.value.liquidate.name,
        user_id: props.userId,
      };

      const req = await lmsApi("/onboard-company", "POST", body);

      if (req) {
        props.companyId = req.id;
        emit("submit");
        console.log('submit: ', req);
        sendAdminOnboardingCompleteEmail(req.id);
      } else {
        console.log(req);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const onValidateCompanyName = async () => {
  try {
    const req = await sellerStore.validateCompanyNameExist(
      item.value.companyName
    );

    if (req?.id) {
      validateCompanyName.value = 2;
    } else {
      validateCompanyName.value = 1;
    }
  } catch (err) {
    console.log(err);
  }
};

const sendAdminOnboardingCompleteEmail = async (companyId) => {
  //console.log('sendAdminOnboardingCompleteEmail', companyId);
  try {
    const body = {
      first_name: profile.value.first_name,
      last_name: profile.value.last_name,
      email: profile.value.email,
      country_code: profile.value.country_code,
      phone_no: profile.value.phone_no,
    };
    const req = await lmsApi(
      `/onboard-company/${companyId}/notify-admin-by-email`,
      "POST",
      body
    );
    if (req.status_code != "OK") {
      emit("error", req);
    }
  } catch (err) {
    console.log(err);
  }
};
const getCompany = async () => {
  const req = await get_company_profile(props.userId);
  if (req) {
    if (JSON.stringify(company?.value) !== JSON.stringify(req)) {
      company.value = req;
      console.log(company.value);
    }
  } else {
    console.log('error: ', req);
  }
};
const get_profile = async () => {
  const req = await get_user_profile(props.userId);
  if (req) {
    if (JSON.stringify(profile.value) !== JSON.stringify(req)) {
      profile.value = req.data ? req.data : req;
      if (profile.value?.phone_verified) {
        profile.value.phone_no =
          "+" + profile.value.country_code + profile.value.phone_no;
      }
    }
  }
};
const checkTerms = () => {};
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
