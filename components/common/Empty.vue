<template>
  <div class="py-8">
    <div class="d-flex justify-center">
      <img
        class="pa-4"
        width="100%"
        src="../../assets/image/landing-empty.png"
      />
    </div>
    <div class="text-center text-body-2">
      <v-btn
        variant="outlined"
        class="my-4 mx-2 me-auto text-capitalize"
        color="purple-darken-3"
        @click="goToLogin"
        >Login</v-btn
      >
      <v-btn
        class="my-4 mx-2 me-auto text-capitalize bg-purple-darken-3"
        @click="goToLogin"
        >Sign Up with Pollen Pass</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      phoneLocal: "",
      salesTeamNumber: "",
      config: null,
    };
  },
  mounted() {
    const config = useRuntimeConfig();
    this.phoneLocal = "";
  },
  methods: {
    goToLogin() {
      navigateTo("/auth/login");
    },
  },
});
</script>

<style scoped></style>
