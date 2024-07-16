<template>
  <div>
    <v-sheet
      class="w-75 text-start d-flex align-start flex-column bg-white"
      style="background-color: transparent"
    >
      <div class="pa-12">
        <p class="text-h5 font-weight-bold">LMS</p>
        <p style="color: #782cd1" class="text-body-2 font-weight-medium">
          LIQUIDATION MANAGEMENT SYSTEM
        </p>
        <ul class="pt-4" style="font-size: 18px; list-style-type: none">
          <li
            v-for="i in columnContext"
            :key="i"
            class="pb-4 text-body-2 mb-2"
            style="line-height: 22px"
          >
            <p class="text-body-1 font-weight-bold mb-1">{{ i.title }}</p>
            {{ i.description }}
          </li>
        </ul>
        <p class="text-start font-weight-medium mt-4">
          - Powered by
          <a
            class="text-decoration-underline font-weight-bold"
            style="color: #782cd1"
            >Pollen.tech</a
          >
        </p>
      </div>
      <img
        src="../../assets/image/onboarding-side-bar-bg.svg"
        alt="Pollen image"
        class="w-100"
      />
    </v-sheet>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: 'OnboardingSideBar',
  data() {
    return {
      columnTitle: 'PollenOS',
      columnContext: [
        {
          title: 'Predict',
          description:
            "Understand recovery cost ranges by category, SKU, target market, and more thanks to Pollen's proprietary data over thousands of successful trades",
        },
        {
          title: 'Plan',
          description:
            "Model offer and order scenarios intuitively and easily within Pollen's Liquidation Management System, to identify a data-backed path to sustainable liquidation.",
        },
        {
          title: 'Prioritize',
          description:
            'Choose your channels and markets to maximize cost recovery by SKU and time to expiry, then activate your liquidation strategy with the touch of a button in PollenOS. Learn More',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped></style>
