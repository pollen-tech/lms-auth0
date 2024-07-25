<template>
  <v-row
		align="start"
		class="rounded-lg align-center pa-4 pb-6 mx-2 feature_list"
	>
	<v-col cols="12" sm="12" md="4" >
		<v-sheet class="pa-2 ma-2 feature_list_sheet">
			<h2 class="feature_list_title">01</h2>
			<div class="feature_list_devide"></div>
			<p class="feature_list_sub">PREDICT DEMAND</p>
			<p class="feature_list_para">Understand recovery cost ranges by category, SKU, target market, and more thanks to Pollen's proprietary data over thousands of successful trades</p>
		</v-sheet>
	</v-col>
	<v-col cols="12" sm="12" md="4">
		<v-sheet class="pa-2 ma-2 feature_list_sheet">
			<h2 class="feature_list_title">02</h2>
			<div class="feature_list_devide"></div>
			<p class="feature_list_sub">PLAN PRICE</p>
			<p class="feature_list_para">Model offer and order scenarios intuitively and easily within Pollen's Liquidation Management System, to identify a data-backed path to sustainable liquidation.</p>
		</v-sheet>
	</v-col>
	<v-col cols="12" sm="12" md="4">
		<v-sheet class="pa-2 ma-2 feature_list_sheet">
			<h2 class="feature_list_title">03</h2>
			<div class="feature_list_devide"></div>
			<p class="feature_list_sub">PRIORITIZE SALES</p>
			<p class="feature_list_para">Choose your channels and markets to maximize cost recovery by SKU and time to expiry, then activate your liquidation strategy with the touch of a button in PollenOS. Learn More</p>
		</v-sheet>
	</v-col>
	
	</v-row>
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
</script>

<style lang="scss" scoped>
	.feature_list {
		margin-top: 0 !important;

		&_title {
			color: var(--Neutral-300, #D1D5DB);
			font-family: Ramaraja !important;
			font-size: 96px;
			font-style: normal;
			font-weight: 400;
			line-height: 100%; /* 20.833% */
		}	
		&_sub {
			color: var(--Neutral-900, #111827);
			font-feature-settings: 'salt' on;
			font-family: Poppins !important;
			font-size: 20px;
			font-style: normal;
			font-weight: 600;
			line-height: 33px; /* 100% */
		}	
		&_para {
			color: var(--Neutral-900, #111827);
			font-feature-settings: 'salt' on;

			/* Paragraph/XSmall/Regular */
			font-family: Inter !important;
			font-size: 12px;
			font-style: normal;
			font-weight: 400;
			line-height: 20px; /* 166.667% */
		}
		&_devide {
			width: 100%;
			height: 1px;
			background-color: #E5E7EB;
			margin: 5px 0;
		}
	}
</style>