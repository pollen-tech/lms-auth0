<template>
  <v-row
		align="start"
		class="rounded-lg align-center pa-4 pb-6 mx-2 text_w_image"
	>
	<v-col>
		<v-sheet class="pa-2 ma-2">
			<p class="text_w_image_sub">Pollen Pass on Pollen LMS</p>
			<h2 class="text_w_image_title">How to Start Selling with Pollen's Liquidation <br/>Management System</h2>
			<div class="text_w_image_img"><img src="~/assets/image/lms_image_men_safe.jpg" alt=""></div>
			<p class="text_w_image_para">Sign up and get a free LMS account to start listing excess and obsolete inventory, and receive offers from Pollen's verified buyers around the world</p>
		</v-sheet>
		
	</v-col>
	<v-col>
		<v-sheet class="text-center align-center mx-auto"> 
				<v-btn
					v-if="!is_authenticated"
					class="my-4 mx-2 me-auto text-capitalize bg-purple-darken-3"
					@click="onSignUp()"
					>Sign Up with Pollen Pass</v-btn
				>
				<v-btn
					v-if="!is_authenticated"
					variant="outlined"
					class="my-4 mx-2 me-auto text-capitalize"
					color="#374151"
					@click="onLogin()"
					style="background-color: #fff;"
					>Login</v-btn
				>
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
	.text_w_image {
		margin-top: 0 !important;

		&_title {
			color: var(--Neutral-900, #111827);
			text-align: center;

			/* Heading/H3/Bold/Desktop */
			font-family: Inter;
			font-size: 32px;
			font-style: normal;
			font-weight: 700;
			line-height: 40px; /* 125% */
			letter-spacing: -0.64px;
			margin-bottom: 10p;
		}	
		&_sub {
			color: var(--primary-purple-500-main, #8431E7);
			text-align: center;
			font-feature-settings: 'salt' on;

			/* Paragraph/Small/Semibold */
			font-family: Inter;
			font-size: 14px;
			font-style: normal;
			font-weight: 600;
			line-height: 20px; /* 142.857% */
		}	
		&_para {
			color: var(--Neutral-900, #111827);
			text-align: center;
			font-feature-settings: 'salt' on;

			/* Paragraph/Small/Regular */
			font-family: Inter;
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: 20px; /* 142.857% */
		}
		&_img {
			width: 100%;
			height: 250px;
			background-color: #E5E7EB;
			margin: 5px 0;
			border-radius: 20px;
			overflow: hidden;
			margin: 20px 0;
		}
	}
</style>