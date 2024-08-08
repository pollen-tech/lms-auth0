import { defineStore } from "pinia";

export const useSidebarStore = defineStore("main", {
  state: () => {
    return {
      data: [
        {
          icon: "mdi-cog",
          name: "company",
          title: "Company",
          children: [
            {
              icon: "mdi-account-group",
              name: "team",
              title: "Team Management",
              to: "company/team",
            },
          ],
        },
      ],
    };
  },

  getters: {
    sidebarData: (state) => state.data,
  },
});
