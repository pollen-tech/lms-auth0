<template>
  <div class="py-8">
    <div class="d-flex justify-center">
      <img
        class="pa-4"
        width="100%"
        src="../../assets/image/landing-empty.jpg"
      />
    </div>
    <div v-if="!user_authenticated" class="text-center text-body-2">
      <v-btn
        variant="outlined"
        class="my-4 mx-2 me-auto text-capitalize"
        color="purple-darken-3"
        @click="on_login"
        >Login</v-btn
      >
      <v-btn
        class="my-4 mx-2 me-auto text-capitalize bg-purple-darken-3"
        @click="on_login"
        >Sign Up with Pollen Pass</v-btn
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  user_authenticated: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const on_login = () => {
  navigateTo("/auth/login");
};
const phoneLocal = ref("");
const salesTeamNumber = ref("");
</script>

<style scoped></style>
