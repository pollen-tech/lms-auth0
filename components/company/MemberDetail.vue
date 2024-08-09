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
      @click="close_dialog()"
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
            @click="close_dialog"
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
                    :rules="required"
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
                    :rules="required"
                  ></v-text-field>
                </div>

                <div class="my-2">
                  <label class="font-weight-medium text-body-2">Email </label>

                  <v-text-field
                    v-model="selected_member.email"
                    variant="outlined"
                    placeholder="Enter Email"
                    :disabled="true"
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
                <div class="mt-6">
                  <label class="font-weight-medium text-body-2">Role </label>

                  <v-select
                    v-model="role"
                    item-value="role_id"
                    item-title="role_name"
                    :items="roles"
                    :return-object="true"
                    variant="outlined"
                    :rules="required"
                    :disabled="
                      profile.pollen_pass_id == selected_member?.pollen_pass_id
                    "
                    :placeholder="role ? '' : 'Choose one'"
                  ></v-select>
                </div>
                <div class="my-2">
                  <label class="font-weight-medium text-body-2">Status </label>
                  <div class="mt-2 text-start">
                    <v-chip
                      :color="get_color(selected_member.status.toLowerCase())"
                    >
                      {{ STATUS[selected_member.status] }}
                    </v-chip>
                  </div>
                </div>
              </v-sheet>
              <v-row class="mx-4">
                <v-col>
                  <v-btn
                    text="Revoke Access"
                    prepend-icon="mdi-account-cancel"
                    block
                    variant="outlined"
                    color="red-darken-1"
                    class="mb-2 mx-2 me-auto w-50 text-capitalize"
                    :disabled="
                      profile.pollen_pass_id == selected_member?.pollen_pass_id
                    "
                    @click="revoke_access"
                  />
                </v-col>
                <v-col>
                  <v-btn
                    text="Save Changes"
                    color="#8431e7"
                    class="mb-2 mx-2 me-auto w-50 text-capitalize"
                    :loading="is_loading"
                    :block="!selected_member.id"
                    @click="submit"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
    <CommonConfirm ref="confirm" />
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import { useMemberStore } from "~/stores/member";
import { STATUS } from "~/utils/constant";

const props = defineProps({
  value: Boolean,
  selected_member: { type: Object, required: false },
  show_member: { type: Boolean, required: false, default: false },
  profile: { type: Object, default: {} },
});

const emit = defineEmits(["close", "loadfn", "error"]);

const member_store = useMemberStore();
const { update_member, revoke_member } = member_store;
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
        country_code: parseInt(props.selected_member.country_code) || 0, // TODO
        phone_no: extract_phone(props.selected_member.phone_no),
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
        close_dialog();
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

const extract_phone = (param) => {
  if (param == undefined || param == " " || !param) {
    return 0;
  }
  if (phone.value) {
    return parseInt(phone.value);
  }
  if (param.includes(" ")) {
    const cn = param.replace(/ /g, "");
    return parseInt(cn);
  }
};

const revoke_access = async () => {
  try {
    const options = {
      title: `Are you sure you want to remove access this account ${props.selected_member.first_name}?`,
      message: `Removing access to this contact means that we will set the user inactive. Are you sure you want to proceed?`,
      icon: "mdi-help-circle-outline",
      color: "purple darken-2",
      actionText1: "Back",
      actionText2: "Remove",
      actionIcon2: "",
      rejection: false,
    };
    if (await confirm.value.open(options)) {
      const req = await revoke_member(props.selected_member.user_id);
      if (!req.statusCode) {
        close_dialog();
      } else {
        emit("error", req);
      }
    }
  } catch (err) {
    emit("error", err);
  }
};

const close_dialog = () => {
  dialog_visible.value = false;
  emit("loadfn");
  emit("close");
};

const phoneObject = (object) => {
  if (object.nationalNumber) {
    phone_valid.value = object.valid;
    phone.value = object.nationalNumber;
    props.selected_member.phone_no = object.nationalNumber;
    props.selected_member.country_code = object?.countryCallingCode || 0;
  }
};

const get_color = (status) => {
  switch (status) {
    case "active":
      return "green";
    case "incomplete":
      return "orange-lighten-1";
    case "unverified phone":
    case "unverified email":
      return "orange-lighten-1";
    case "suspended":
    case "inactive":
      return "red-darken-3";
    default:
      return "grey-darken-2";
  }
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
    phone.value = null;
    role.value = props.selected_member.role_id;
  }
}),
  onMounted(async () => {});
</script>

<style scoped></style>
