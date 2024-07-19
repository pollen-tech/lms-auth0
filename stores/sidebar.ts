import { defineStore } from "pinia";

export const useSidebarStore = defineStore("main", {
  state: () => {
    return {
      data: [
        {
          icon: "mdi-cog",
          name: "company",
          title: "Company",
        },
      ],
    };
  },

  getters: {
    sidebarData: (state) => state.data,
  },
});
