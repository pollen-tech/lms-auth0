import { defineStore } from "pinia";
import { adminApi } from "~/services/api";

export const useCountryStore = defineStore("country", {
  state: () => {
    return {
      countries: [],
    };
  },
  actions: {
    async getCountries() {
      const data = await adminApi(`/countries`);
      this.countries = data;
    },
    setCountries(param: never[]) {
      this.countries = param;
    },
    async getCities(param: any) {
      const data = await adminApi(`/countries/${param}/cities`);
      return data;
    },
  },
});
