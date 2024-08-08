<template>
  <div class="bg-white rounded-lg">
    <v-row no-gutters class="px-4 pt-4 my-4">
      <v-col :cols="$vuetify.display.mobile ? '7' : '10'" md="5">
        <v-card elevation="0" class="no-border d-flex" height="60">
          <v-card
            v-if="!$vuetify.display.mobile"
            elevation="0"
            width="100%"
            class="bg-white"
          >
            <v-select
              v-model="defaultSelected"
              :items="searchOptions"
              item-value="value"
              item-title="name"
              :return-object="true"
              class="rounded-s-xl"
              density="compact"
              variant="outlined"
              placeholder="Select"
              @update:model-value="onOptionSelected"
            ></v-select>
          </v-card>
          <v-card elevation="0" width="100%" class="bg-white">
            <v-text-field
              v-model="search"
              variant="outlined"
              density="compact"
              :label="defaultLabel"
              prepend-inner-icon="mdi-magnify"
              class="search-text-filled"
              single-line
              hide-details
              full-width
              clearable
              @input="onSearchTyped()"
              @click:clear="onSearchTyped()"
            ></v-text-field>
          </v-card>
        </v-card>
      </v-col>
      <v-col v-if="$vuetify.display.mobile">
        <div class="h-75 d-flex justify-end">
          <v-menu>
            <template #activator="{ props }">
              <div>
                <v-btn icon variant="text" v-bind="props">
                  <v-icon size="small" color="grey">mdi-dots-vertical</v-icon>
                </v-btn>
              </div>
            </template>

            <v-card class="rounded">
              <v-card-text style="" class="pa-2">
                <v-list>
                  <v-list-item v-if="showAddMember" @click="add_member">
                    <v-list-item-title>
                      <v-icon size="x-small">mdi-plus</v-icon> Add Member
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-menu>

          <div class="d-flex justify-center"></div>
        </div>
      </v-col>

      <v-col v-if="!$vuetify.display.mobile">
        <div
          :class="
            $vuetify.display.mobile ? 'justify-space-between' : 'justify-end'
          "
          class="nav-wrapper d-flex mb-2"
        >
          <CommonButton
            :full-width="$vuetify.display.mobile"
            append-icon="mdi-plus"
            color="#8431e7"
            @click="add_member"
            >Add Member
          </CommonButton>
        </div>
      </v-col>
    </v-row>
    <LoadingPage :loading="isloading" />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import _debounce from "lodash/debounce";
import { useSellerStore } from "~/stores/seller";
import { useCategoriesStore } from "~/stores/categories";
import { useCountryStore } from "~/stores/country";
import { STATUS } from "~/utils/constant";

export default {
  props: {
    searchOptions: { type: Array, default: null },
    showFilter: { type: Boolean, default: true },
    itemsfilter: {
      type: Array,
      default: () => [],
      required: false,
    },
    itemssort: {
      type: Array,
      default: () => [],
      required: false,
    },
    prefilter: { type: String, default: "" },
    showAddMember: { type: Boolean, default: false },
  },
  setup() {
    const sellerStore = useSellerStore();
    const statusList = sellerStore.sellerStatus;

    const categoryStore = useCategoriesStore();
    const categories = computed(() => categoryStore.categories);

    const countryStore = useCountryStore();
    const { countries } = storeToRefs(countryStore);

    onMounted(async () => {
      categoryStore.getCategories();
      countryStore.getCountries();
    });

    return {
      categories,
      categoryStore,
      countries,
      countryStore,
      statusList,
    };
  },
  emits: ["applyOption", "searchFn", "addMember", "loadFn"],
  data() {
    return {
      searchField: "",
      search: "",
      defaultSelected: "",
      defaultLabel: "Input Search",
      filter: [],
      filterKey: 1,
      isloading: false,
      showFilterMobile: false,
      mobilefilter: [
        {
          div: "Company Type",
          name: "companyType",
          key: 1,
        },
        {
          div: "Company Location",
          name: "companyLocation",
          key: 1,
        },
        {
          div: "Company Location",
          key: 1,
        },
      ],
      status: STATUS,
      sort: {},
      sortList: [
        { title: "Ascending", key: "ASC" },
        { title: "Descending", key: "DESC" },
      ],
    };
  },
  computed: {},
  mounted() {
    this.defaultSelected = this.searchOptions[0];
  },
  methods: {
    onOptionSelected(item) {
      this.searchField = item?.value || selectedOption;
      this.search = "";

      this.defaultLabel = "Search " + item.name;

      this.onSearchTyped();
      this.$emit("applyOption", item);
    },
    onSearchTyped() {
      const searchVal = {
        searchField: this.searchField || this.defaultSelected.value,
        search: this.search ? this.search : "",
      };
      this.$emit("searchFn", searchVal);
    },
    add_member() {
      this.$emit("addMember");
    },
  },
};
</script>

<style lang="scss" scoped></style>
