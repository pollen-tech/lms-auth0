import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", {
  state: () => {
    return {
      categories: [],
    };
  },
  actions: {
    async getCategories() {
      this.categories = [];
    },
    setCategories(param: never[]) {
      this.categories = param;
    },
  },
});
