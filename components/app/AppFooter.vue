<template>
  <v-container>
  <div class="mt-6 mb-8">
    <v-footer class="d-flex flex-column">
      <v-row class="text-caption">
        <v-col cols="12" md="3" lg="3">
          <v-sheet class="d-flex justify-start">
            <img class="mb-4" src="~/assets/image/pollen-logo.svg" />
          </v-sheet>
          <p class="text-grey-darken-1 pr-10">
            Pollen is your liquidation operating system & AI co-pilot for aged,
            unsold, obsolete inventory.
          </p>
        </v-col>
        <v-col>
          <v-row>
            <v-col sm="6" md="4" lg="4">
              <p class="text-body-2 font-weight-bold">Platforms</p>

              <NuxtLink
                to="https://www.pollen.tech/#"
                class="text-decoration-none"
              >
                <p class="text-grey-darken-1 my-2">Buy Liquidation Stock</p></NuxtLink
              >
              <NuxtLink
                to="https://www.pollen.tech/sellers"
                class="text-decoration-none"
                ><p class="text-grey-darken-1 my-2">Sell Excess Inventory</p></NuxtLink
              >
            </v-col>
            <v-col sm="6" md="4" lg="4">
              <p class="text-body-2 font-weight-bold">Resources</p>
              <NuxtLink
                to="https://www.sustainableliquidation.com/"
                class="text-decoration-none"
              >
                <p class="text-grey-darken-1 my-2">Blog</p></NuxtLink
              >
              <NuxtLink
                to="https://www.pollen.tech/press"
                class="text-decoration-none"
              >
                <p class="text-grey-darken-1 my-2">Press</p></NuxtLink
              >
              <NuxtLink
                to="https://www.pollen.tech/faq"
                class="text-decoration-none"
                ><p class="text-grey-darken-1 my-2">FAQs</p></NuxtLink
              >
              <NuxtLink
                to="https://www.pollen.tech/privacy"
                class="text-decoration-none"
              >
                <p class="text-grey-darken-1 my-2">Privacy Policy</p></NuxtLink
              >
            </v-col>
            <v-col sm="6" md="4" lg="4">
              <p class="text-body-2 font-weight-bold">Company</p>
              <NuxtLink
                to="https://www.pollen.tech/about"
                class="text-decoration-none"
                ><p class="text-grey-darken-1 my-2">About</p></NuxtLink
              >
              <NuxtLink
                to="https://careers.pollen.tech/"
                class="text-decoration-none"
              >
                <p class="text-grey-darken-1 my-2">Careers</p></NuxtLink
              >
              <NuxtLink to="https://www.linkedin.com/company/pollen-liquidation/">
                <v-icon color="blue-darken-2 pa-2" size="x-large"
                  >mdi-linkedin</v-icon
                >
              </NuxtLink>
            </v-col>
          </v-row>

          <v-row class="mt-8">
            <v-col>
              <div class="d-flex align-center">
                <p
                  class="text-body-2 font-weight-bold mr-5"
                  style="width: 205px !important"
                >
                  Company Information
                </p>
                <v-divider :thickness="1"></v-divider>
              </div>

              <v-row class="my-2">
                <v-col>
                  <p class="text-grey-darken-1 my-2 font-weight-bold">
                    Singapore (HQ):
                  </p>
                  <p class="text-grey-darken-1 mb-2">
                    Pollen Tech Pte Ltd <br/>(201811278M)
                  </p>
                </v-col>
                <v-col>
                  <p class="text-grey-darken-1 my-2 font-weight-bold">India</p>
                  <p class="text-grey-darken-1 mb-2">
                    Pollen Tech India Private Limited <br/>(U62099KA2023FTC171707)
                  </p>
                </v-col>
                <v-col>
                  <p class="text-grey-darken-1 my-2 font-weight-bold">
                    Malaysia
                  </p>
                  <p class="text-grey-darken-1 mb-2">
                    Pollen Tech Sdn Bhd <br/>(1325151-W)
                  </p>
                </v-col>
                <v-col cols="12">
                  <p class="text-grey-darken-1 my-2 font-weight-bold">
                    Indonesia:
                  </p>
                  <p class="text-grey-darken-1 mb-1">
                    PT. Pollen Tech Indonesia (1010220062121)
                  </p>

                  <p class="text-grey-darken-1 mb-1">
                    Layanan Pengaduan Konsumen Direktorat Jenderal Perlindungan
                    Konsumen dan Tertib Niaga, Kementerian Perdagangan Republik
                    Indonesia
                  </p>
                  <p class="text-grey-darken-1 mb-1">
                    Whatsapp Ditjen PKTN: 0853 1111 1010
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <div class="w-100 text-caption text-grey-darken-1 my-2">
        <v-divider :thickness="2"></v-divider>
        <v-sheet
          :class="$vuetify.display.mobile ? 'd-flex flex-column  ' : 'd-flex  '"
        >
          <v-sheet class="me-auto text-grey-darken-1 mt-5">
            <div>
              <span class="border-right pr-4">
                © Copyright 2024 Pollen Direct. All rights reserved.
              </span>
              <span class="border-right px-4">Email: contact@pollen.tech</span>
            </div></v-sheet
          >
          <v-sheet class="text-grey-darken-1 mt-5">
            <span class="border-right pr-4">
              <NuxtLink
                to="https://www.pollen.tech/privacy"
                class="text-decoration-none text-grey-darken-1"
              >
                Terms
              </NuxtLink></span
            >
            <span class="border-right px-4">
              <NuxtLink
                to="https://www.pollen.tech/privacy"
                class="text-decoration-none text-grey-darken-1"
              >
                Cookies
              </NuxtLink></span
            >
            <span class="px-4">
              <NuxtLink
                to="https://www.pollen.tech/privacy"
                class="text-decoration-none text-grey-darken-1"
              >
                Privacy
              </NuxtLink></span
            ></v-sheet
          >
        </v-sheet>
      </div>
    </v-footer>
  </div>
</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.custom-border {
  border-right: 2px solid #e5e7eb !important;
  margin: 0px 5px;
}
</style>