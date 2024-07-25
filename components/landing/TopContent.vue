<template>
	<div class="topcontent">
		<v-container>
			<v-row
				class="align-center pa-4 pb-6 mx-2"
			>
				<v-col xs="12" sm="4">
					<h1 class="topcontent_title font-weight-bold text-h4 text-md-h2 text-sm-h3">Liquidation <br/> Management <br/> System</h1>
					<p class="topcontent_sub">PREDICT - PLAN - PRIORITIZE</p>
					<p class="topcontent_para">Avoid business waste and destruction by automating workstreams, unlocking the power of pricing analytics, and empowering teams to take action for more sustainable outcomes.
					</p>
					<v-btn
						class="my-4 me-auto text-capitalize" 
						style="background-color: #8431E7; color: #FFF; height: 55px;"
						@click="on_login"
						>Sign Up with Pollen Pass</v-btn
					>
				</v-col>

				<v-col xs="12" sm="8" class="topcontent_img">
					<img src="~/assets/image/lms_banner_people.png" alt="delivery_guy">
				</v-col>
			</v-row>
	</v-container>
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
</script>

<style lang="scss" scoped>
	.topcontent {
		padding-top: 20px;
    background-image: url('@/assets/image/lms_banner_vector.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
		display: flex;
    justify-content: space-around;

		&_title {
			color: var(--Neutral-50, #F9FAFB);
			font-family: Poppins;
			font-size: 50px;
			font-style: normal;
			font-weight: 600;
			line-height: 60px; /* 116.667% */
		}
		&_sub {
			color: var(--Warning-100, #FEF3C7);
			font-family: Poppins;
			font-size: 20px;
			font-style: normal;
			font-weight: 600;
			line-height: 70px; /* 350% */
		}
		&_para {
			color: var(--Primary-Purple-50, #FAF5FF);
			font-family: Inter;
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: 24px; /* 171.429% */
		}
		&_img {
			display: flex;
    	justify-content: space-around;
		}
	}
</style>