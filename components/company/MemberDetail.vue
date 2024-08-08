<template>
  <v-dialog
    v-model="dialog_visible"
    fullscreen
    absolute
    persistent
    scrollable
    :width="$vuetify.display.mobile ? '100%' : '45%'"
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
                <v-col sm="2" md="1" class="d-flex justify-start mx-2 mr-4">
                  <v-avatar rounded="0" color="purple-lighten-5" size="55">
                    <span class="purple--text text-h6 text-capitalize">
                      <v-icon size="small" color="purple">mdi-plus</v-icon>
                    </span>
                  </v-avatar>
                </v-col>

                <v-col sm="11" md="8" class="d-flex flex-row">
                  <div class="d-flex flex-column">
                    <v-sheet class="ma-1 bg-white">
                      <b>Team Member Details</b></v-sheet
                    >
                    <v-sheet class="ma-1 text-caption bg-white">
                      Update details, assign seller or change roles
                    </v-sheet>
                  </div>
                </v-col>
              </v-row>
            </div>
            <v-form ref="form_ref">
              <v-sheet class="ma-2 pa-6">
                <div class="my-2">
                  <label class="font-weight-medium text-body-2"
                    >First Name
                  </label>
                  <v-text-field
                    v-model="selected_member.first_name"
                    variant="outlined"
                    placeholder="Enter first name"
                    required
                    :rules="required_email"
                  ></v-text-field>
                </div>
                <div class="my-2">
                  <label class="font-weight-medium text-body-2"
                    >Last Name
                  </label>
                  <v-text-field
                    v-model="selected_member.last_name"
                    variant="outlined"
                    placeholder="Enter last name"
                    required
                    :rules="required_email"
                  ></v-text-field>
                </div>
                <div class="my-2">
                  <label class="font-weight-medium text-body-2">Email </label>

                  <v-text-field
                    v-model="selected_member.email"
                    variant="outlined"
                    placeholder="Enter Email"
                    :rules="required_email"
                  ></v-text-field>
                </div>
                <div class="my-2">
                  <label class="font-weight-medium text-body-2"
                    >Phone Number
                    <span class="text-gray text-caption"
                      >(Optional)</span
                    ></label
                  >
                  <VueTelInput
                    v-model="selected_member.phone_no"
                    mode="international"
                    :maxLen="20"
                    :value="phone"
                    :disabledFormatting="true"
                    :validCharactersOnly="true"
                    :class="phone_valid ? 'phoneStyle' : 'hasError'"
                    :dropdownOptions="{
                      showDialCodeInSelection: true,
                      showSearchBox: true,
                      showFlags: true,
                    }"
                    @validate="phoneObject"
                  />
                </div>
                <div class="my-2">
                  <label class="font-weight-medium text-body-2">Role </label>

                  <v-select
                    v-model="role"
                    item-value="role_id"
                    item-title="role_name"
                    :items="roles"
                    :return-object="true"
                    variant="outlined"
                    :rules="required"
                    :placeholder="role ? '' : 'Choose one'"
                  ></v-select>
                </div>
                <div class="my-2">
                  <label class="font-weight-medium text-body-2">Status </label>

                  <div class="mt-2 text-start">
                    <v-chip
                      v-if="selected_member.status === 'Active'"
                      color="green"
                      size="small"
                    >
                      Active
                    </v-chip>
                    <v-chip
                      v-else-if="selected_member.status === 'Incomplete'"
                      color="orange-lighten-1"
                      size="small"
                    >
                      Incomplete
                    </v-chip>
                    <v-chip
                      v-else-if="
                        selected_member.status === 'Suspended' ||
                        selected_member.status === 'Inactive'
                      "
                      size="small"
                      color="red-darken-3"
                    >
                      {{ selected_member.status }}
                    </v-chip>
                    <v-chip v-else size="small" color="gray">
                      {{ selected_member?.status }}
                    </v-chip>
                  </div>
                </div>
              </v-sheet>
              <v-sheet class="mx-2 px-6 w-100 d-flex justify-space-between">
                <v-btn
                  v-if="selected_member.id"
                  text="Revoke Access"
                  prepend-icon="mdi-account-cancel"
                  variant="outlined"
                  color="red-darken-1"
                  class="mb-2 mx-2 me-auto w-50 text-capitalize"
                  @click="addBuyerContact"
                />
                <v-btn
                  text="Save Changes"
                  color="#8431e7"
                  class="mb-2 mx-2 me-auto w-50 text-capitalize"
                  :loading="is_loading"
                  :block="!selected_member.id"
                  @click="submit"
                />
              </v-sheet>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { debounce } from "lodash";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import { useMemberStore } from "~/stores/member";

const props = defineProps({
  value: Boolean,
  selected_member: { type: Object, required: false },
  show_member: { type: Boolean, required: false, default: false },
});

const emit = defineEmits(["close", "loadfn", "error"]);

const member_store = useMemberStore();
const { update_member } = member_store;
const roles = computed(() => member_store.member_roles);

const dialog_visible = ref(false);
const is_loading = ref(false);
const required = [(v) => !!v || "Field is required"];
const required_email = [
  (v) => /^[\w+.-]+@[\w.-]+\.\w{2,}$/.test(v) || "E-mail must be valid",
];
const phone_valid = ref(true);
const phone = ref();
const confirm = ref(null);
const role = ref();
const form_ref = ref(null);

const submit = async () => {
  try {
    is_loading.value = true;
    const { valid } = await form_ref.value.validate();
    if (valid) {
      // pollen_pass_id: props.selected_member.pollen_pass_id,
      // email: props.selected_member.email,
      const body = {
        user_id: props.selected_member.user_id,
        last_name: props.selected_member.last_name,
        first_name: props.selected_member.first_name,
        country_code: props.selected_member.country_code, // TODO
        phone_no: props.selected_member.phone_no || 0,
        company_id: props.selected_member.id,
        role_id: role.value.role_name
          ? role.value.role_id
          : props.selected_member.role_id,
        role_name: role.value.role_name
          ? role.value.role_name
          : props.selected_member.role_name,
      };
      const req = await update_member(props.selected_member.user_id, body);
      if (!req.statusCode) {
        emit("close");
        emit("loadfn", true);
      } else {
        emit("error", req);
      }
    }
    is_loading.value = false;
  } catch (err) {
    emit("error", err);
    is_loading.value = false;
  }
};

const closeDialog = () => {
  dialog_visible.value = false;
  emit("close");
};

const phoneObject = (object) => {
  phone_valid.value = object.valid;
  props.selected_member.phone_no = object?.number;
  props.selected_member.country_code = object?.countryCallingCode || 0;
};

watch(
  () => props.value,
  (newValue) => {
    dialog_visible.value = newValue;
  }
);

onUpdated(async () => {
  const currMember = props.selected_member;
  if (currMember && currMember?.first_name && props.show_member) {
    // TODO
    role.value = props.selected_member.role_id;
  }
}),
  onMounted(async () => {});
</script>

<style scoped></style>
