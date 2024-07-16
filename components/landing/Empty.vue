<template>
  <div class="mt-16 d-flex justify-space-between">
    <v-sheet
      class="mt-16 px-2 d-flex justify-end bg-transparent"
      style="margin-top: 10% !important"
    >
      <div
        :class="height <= 400 ? 'text-center' : 'text-right'"
        class="d-flex flex-column text-right w-100 mx-auto px-10"
      >
        <p
          :class="height <= 400 ? ' text-h3' : 'text-h2'"
          class="font-weight-black text-purple-darken-3 h-auto"
          :style="
            height <= 400
              ? ' letter-spacing: 0.12rem !important; line-height: 4rem'
              : 'letter-spacing: 0.12rem !important; line-height: 5rem'
          "
        >
          Something great is about to come!
        </p>
        <p class="text-subtitle-1 my-4">
          This page is under construction, We are still wrapping the gift nicely
          as of this moment, you’ll get notified once it’s ready.
        </p>
        <p>
          Need Help?
          <a
            href="mailto:contact@pollen.tech"
            class="text-purple cursor-pointer text-decoration-none"
            >Contact Us</a
          >
        </p>
      </div>
    </v-sheet>
    <v-sheet class="pa-2 align-center d-none d-md-block bg-transparent">
      <img class="pl-4" src="~/assets/image/empty-page-1.png" />
    </v-sheet>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { name } = useDisplay();

const height = computed(() => {
  // name is reactive and
  // must use .value
  switch (name.value) {
    case "xs":
      return 220;
    case "sm":
      return 400;
    case "md":
      return 500;
    case "lg":
      return 600;
    case "xl":
      return 800;
    case "xxl":
      return 1200;
  }

  return undefined;
});
// import { emptyPage } from '~/assets/image/empty-page.png';
</script>

<style lang="scss" scoped></style>
