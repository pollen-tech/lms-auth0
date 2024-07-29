<template>
  <div class="mt-16 d-flex flex-column justify-space-between text-center align-center">
    <img src="~/assets/image/under_construction.svg" alt="" class="img_under_construction">
    <h4 class="mt-10">Something awesome will be up soon! <br> Under Construction.</h4>
    
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

<style lang="scss" scoped>
.img_under_construction {
  width: auto;
}
@media (max-width: 500px) {
  .img_under_construction {
    width: 100%;
  }
}
</style>
