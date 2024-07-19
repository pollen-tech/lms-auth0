import { defineStore } from "pinia";
import { lmsApi } from "~/services/api";

export const useSellerStore = defineStore("seller", {
  state: () => {
    return {
      companyType: [
        { id: 1, title: "Principal", description: "Product or Brand Owner" },
        {
          id: 2,
          title: "Factory / Production Facility",
          description:
            "Owner of the production, but not the original brand owner ",
        },
        {
          id: 3,
          title: "Distributor / Wholesaler",
          description: "Packaged  Finished goods",
        },
        {
          id: 4,
          title: "Agent",
          description:
            "Represents inventory but doesn't own the warehouse where goods are stored",
        },
        { id: 5, title: "Logistics", description: "Fulfillment Facility" },
        { id: 6, title: "Retailer", description: "Sells direct to consumer" },
      ],
      sellerCompanyTypes: [],
      sellerLiquidate: [],
      sellerProfile: {},
    };
  },
  actions: {
    async getCompanyTypes() {
      const data = await lmsApi(`/onboard-company/company-type`);
      this.sellerCompanyTypes = data;
    },
    async getLiquidateUnit() {
      const data = await lmsApi(`/onboard-company/liquidate-unit`);
      this.sellerLiquidate = data;
    },
    async validateCompanyNameExist(param: string) {
      const body = {
        company_name: param,
      };
      const data = await lmsApi(
        `/onboard-company?${new URLSearchParams(body).toString()}`
      );
      return data;
    },
    async get_company_profile(param: any) {
      const data = await lmsApi(`/onboard-company/users/${param}`);
      return data;
    },
    async validate_user_exist(param: any) {
      const req = await lmsApi(`/users/pollen-pass-by-email/${param}`);
      return req;
    },
  },
});
