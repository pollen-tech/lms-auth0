<template>
  <v-dialog v-model="dialog_visible" width="auto">
    <v-form ref="formRef">
      <v-container class="">
        <v-card
          class="mx-auto py-6"
          :width="$vuetify.display.mobile ? 'auto' : '500'"
        >
          <v-card-item>
            <div class="pa-2">
              <div
                class="text-body-1 font-weight-bold text-center text-bold mb-1"
              >
                {{ title }}
              </div>
            </div>
          </v-card-item>
          <v-card-item class="pa-8 pt-0">
            <div class="my-2">
              <label class="font-weight-medium text-body-2"
                >First Name <span class="red--text">*</span></label
              >

              <v-text-field
                v-model="member.first_name"
                variant="outlined"
                placeholder="Enter First Name"
                :rules="required"
              ></v-text-field>
            </div>
            <div class="my-2">
              <label class="font-weight-medium text-body-2"
                >Last Name <span class="red--text">*</span></label
              >

              <v-text-field
                v-model="member.last_name"
                variant="outlined"
                placeholder="Enter Last Name"
                :rules="required"
              ></v-text-field>
            </div>
            <div class="my-2">
              <label class="font-weight-medium text-body-2"
                >Email <span class="red--text">*</span></label
              >

              <v-text-field
                v-model="member.email"
                variant="outlined"
                placeholder="Enter Email"
                :rules="required_email"
              ></v-text-field>
            </div>

            <div class="my-2">
              <label class="font-weight-medium text-body-2"
                >Phone Number
                <span class="text-gray text-caption">(Optional)</span></label
              >
              <VueTelInput
                v-model="member.phone_no"
                mode="international"
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
              />
            </div>
            <div class="my-2">
              <label class="font-weight-medium text-body-2">Role </label>
              <v-select
                v-model="member.role"
                item-value="role_id"
                item-title="role_name"
                :items="roles"
                :return-object="true"
                variant="outlined"
                :rules="required"
                :placeholder="member.memberRole ? '' : 'Choose one'"
              ></v-select>
            </div>

            <v-row>
              <v-col cols="6">
                <v-btn
                  variant="outlined"
                  class="text-body-1 font-weight-medium w-100"
                  @click="$emit('close')"
                >
                  Cancel
                </v-btn>
              </v-col>

              <v-col cols="6">
                <v-btn
                  :loading="is_loading"
                  variant="flat"
                  color="#8431E7"
                  class="text-body-1 font-weight-medium w-100 rounded-6"
                  @click="invite_member"
                  >Invite
                </v-btn>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-container>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

import { useMemberStore } from "~/stores/member";

const emit = defineEmits(["close", "loadfn", "error"]);
const props = defineProps({
  value: Boolean,
  profile: { type: Object, default: {} },
  company: { type: Object, default: {} },
});

watch(
  () => props.value,
  (newValue) => {
    dialog_visible.value = newValue;
  }
);

const member_store = useMemberStore();
const { submit_invite, members } = member_store;
const roles = computed(() => member_store.member_roles);

const title = ref("Invite Team Member");
const formRef = ref(null);
const dialog_visible = ref(false);
const member = ref({});
const phoneValid = ref(true);
const phone = ref();
const is_loading = ref(false);
const required = [(v) => !!v || "Field is required"];
const required_email = [
  (v) => /^[\w+.-]+@[\w.-]+\.\w{2,}$/.test(v) || "E-mail must be valid",
];

const invite_member = async () => {
  try {
    is_loading.value = true;
    const { valid } = await formRef.value.validate();
    if (valid) {
      const body = {
        last_name: member.value.last_name,
        first_name: member.value.first_name,
        phone_no: phone.value ? parseInt(phone.value) : member.value.phone_no,
        country_code: member.value.country_code
          ? parseInt(member.value.country_code)
          : 0,
        email: member.value.email,
        company_id: props.company.id,
        role_id: member.value.role.role_id,
        role_name: member.value.role.role_name,
      };
      const req = await submit_invite(props.profile.user_id, body);
      if (!req.statusCode) {
        emit("close");
        emit("loadfn", true);
        await form_ref.value.reset();
      } else {
        emit("error", req);
      }
    }
    is_loading.value = false;
  } catch (err) {
    is_loading.value = false;
  }
};

const phoneObject = (object) => {
  phoneValid.value = object.valid;
  phone.value = object?.nationalNumber;
  member.value.phone_no = object?.nationalNumber;
  member.value.country_code = object?.countryCallingCode
    ? object?.countryCallingCode
    : 0;
};
</script>

<style></style>
