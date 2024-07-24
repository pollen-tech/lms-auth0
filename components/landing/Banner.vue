<template>
	<div class="banner_container">
		<v-container>
			<v-row
				style="background-color: #faf5ff"
				class="rounded-lg align-center pa-4 pb-6 mx-2 my-0"
			>
				<v-col cols="1">
					<img src="~/assets/image/pollen-pass-original.svg" class="mx-4" />
				</v-col>
				<v-col cols="11" md="8">
					<p class="font-weight-bold text-body-2 mb-1">
						Log in/Sign Up to your Pollen Pass account and start Selling with
						Pollen's Liquidation Management System
					</p>
					<p class="text-body-2">
						Sign up and get a free LMS account to start listing excess and
						obsolete inventory, and receive offers from Pollen's verified
						buyers around the world. Not a member?
						<a href="#" class="" style="color: #782CD1; font-weight: 700"> Sign Up now</a>
					</p>
				</v-col>
				<v-col cols="12" md="3">
					<v-btn
						variant="outlined"
						elevation="0"
						class="my-4 mx-2 me-auto text-capitalize"
						style="border-color: #E5E7EB;"
						@click="onSignUp"
					>
						Sign Up with Pollen Pass</v-btn
					>
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
// import { emptyPage } from '~/assets/image/empty-page.png';
</script>

<style lang="scss" scoped>
	.banner_container {
		background-color: #440F83;
	}
</style>