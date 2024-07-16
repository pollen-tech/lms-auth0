<template>
  <div></div>
</template>

<script setup>
definePageMeta({
  layout: false,
});

onMounted(() => {
  setTimeout(async () => {
    navigateTo("/onboarding");
  }, 500);
});
</script>

<style lang="scss" scoped></style>
