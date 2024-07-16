<template>
  <div>
    <div class="d-flex flex-column align-center">
      <h3>Complete your Company Information</h3>

      <v-card
        :width="$vuetify.display.mobile ? 300 : 450"
        elevation="0"
        class="align-center my-4"
      >
        <v-form ref="form">
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
              :items="sellerStore.companyType"
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

            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="item.country"
                  item-value="id"
                  item-title="name"
                  :items="[]"
                  :return-object="false"
                  placeholder="Choose One"
                  variant="outlined"
                  :rules="required"
                  clearable
                  @update:model-value="fetchCity"
              /></v-col>
              <v-col>
                <v-autocomplete
                  v-model="item.city"
                  item-value="id"
                  item-title="name"
                  :items="cities"
                  :return-object="false"
                  placeholder="Choose One"
                  hint="*Optional"
                  variant="outlined"
                  :disabled="!item.country"
                  persistent-hint
                ></v-autocomplete
              ></v-col>
            </v-row>
          </div>
          <div class="mb-2 mt-4 text-start flex-1-0">
            <label class="font-weight-medium"
              >How much are you looking to liquidate monthly?*
              <span class="red--text">*</span></label
            >
            <v-autocomplete
              v-model="item.companyType"
              item-value="id"
              item-title="name"
              :items="[]"
              :return-object="false"
              placeholder="Choose Multiple"
              variant="outlined"
              :rules="required"
              multiple
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
import { ref } from 'vue';
import { useSellerStore } from '~/stores/seller';

const emit = defineEmits(['submit']);
const sellerStore = useSellerStore();
const companyType = ref([
  {
    id: 1,
    name: 'Type A',
    title: 'Type A',
    description: 'Description for Type A',
  },
  {
    id: 2,
    name: 'Type B',
    title: 'Type B',
    description: 'Description for Type B',
  },
  {
    id: 3,
    name: 'Type C',
    title: 'Type C',
    description: 'Description for Type C',
  },
]);

const items = ref(['Programming', 'Design', 'Vue', 'Vuetify']);
const item = ref({ items: [] });
const cities = ref([]);
const required = [(v) => !!v || 'Field is required'];
const isLoading = ref(false);
const showDialog = ref(false);
const validateCompanyName = ref(0);
const selectedItem = ref(null);
const checkAcceptTerms = ref(false);

const fetchCity = () => {};
const submit = () => {
  emit('submit');
};
const onValidateCompanyName = () => {
  console.log(item.value);
  validateCompanyName.value = 2;
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
  content: '◀'; /* Unicode arrow left character */
  font-family: 'Material Icons'; /* Material Icons font family */
  color: #6b7280; /* Match this with your tooltip background color */
  position: absolute;
  top: 55%;
  left: -12px; /* Position arrow on the right side */
  transform: translateY(-50%);
  font-size: 16px; /* Adjust the size of the arrow icon */
}
</style>
