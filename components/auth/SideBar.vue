<template>
  <v-sheet
    class="ma-2 pa-2 w-90 text-start d-flex align-start flex-column text--white"
    style="background-color: transparent"
  >
    <img
      src="~/assets/image/avatar_pollen_white.webp"
      alt="Pollen image"
      width="70px"
    />
    <p class="font-weight-bold mt-8 mb-8 text-white" style="font-size: 24px">
      Liquidation Management System:<br/> Predict Demands, Plan Prices &<br/> Prioritize Sales<br/>
    </p>
    <ul class="pl-4 pt-4" style="font-size: 18px; color: white">
      <li v-for="text in context" v-bind:key="text" class="pb-4">
        {{ text }}
      </li>
    </ul>
    <p class="text-start text-white font-weight-medium mt-4">
      - Powered by
      <a href=" https://www.pollen.tech" class="text-decoration-underline font-weight-bold" style="color: #FDE68A;
"
        >Pollen Pass</a
      >
    </p>
  </v-sheet>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
    default:
      "<p>Your passport to<br/> More Transparency,<br/> More Optionality,<br/> More Sustainability</p>"
      
  },
  context: {
    type: Array,
    required: false,
    default: [
      "Avoid business waste and destruction by automating work-streams",
      "Unlock the power of pricing analytics",
      "Empowering teams to take action for more sustainable outcomes.",
    ],
  },
  type: { type: String, required: false, default: "pollenpass" },
});
</script>