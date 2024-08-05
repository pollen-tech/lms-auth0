import { defineStore } from "pinia";
import { lmsApi } from "~/services/api";

export const useCountryStore = defineStore("country", {
  state: () => {
    return {
      countries: [],
    };
  },
  actions: {
    async getCountries() {
      const data = await lmsApi(`/countries`);
      this.countries = data;
    },
    setCountries(param: never[]) {
      this.countries = param;
    },
    async getCities(param: any) {
      const data = await lmsApi(`/countries/${param}/city`);
      return data;
    },
  },
});
