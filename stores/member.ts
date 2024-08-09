import { defineStore } from "pinia";
import { lmsApi } from "~/services/api";

export const useMemberStore = defineStore("member", {
  state: () => {
    return {
      headers_member: [
        {
          title: "Pollen Pass ID",
          align: "center",
          sortable: false,
          key: "pollen_pass_id",
        },
        { title: "user_id", align: "d-none", key: "user_id" },
        { title: "First Name", align: "d-none", key: "first_name" },
        { title: "Last Name", align: "d-none", key: "last_name" },
        { title: "Name", align: "center", key: "full_name" },
        { title: "Email", align: "center", key: "email" },
        { title: "country_code", align: "d-none", key: "country_code" },
        { title: "Phone Number", align: "center", key: "phone_no" },
        { title: "role_id", align: "d-none", key: "role_id" },
        { title: "Role", align: "center", key: "role_name" },
        { title: "Status", align: "center", key: "status" },
        { title: "created_at", align: "d-none", key: "created_at" },
        { title: "Actions", align: "center", key: "action" },
      ],
      ruleOptions: [
        { value: "pollen-admin", label: "Admin" },
        { value: "pollen-super-admin", label: "Super Admin" },
      ],
      members: [],
      member_roles: [],
    };
  },
  actions: {
    async get_roles() {
      const { data } = await lmsApi(`/lms/company-user/roles`);
      this.member_roles = data;
    },
    async fetch_team(param: any) {
      const { data } = await lmsApi(`/lms/company-user/${param}`);
      this.members = data;
      return data;
    },
    async submit_invite(user_id: any, body: any) {
      const res = await lmsApi(`/lms/company-user/user`, "POST", body);
      return res;
    },
    async update_member(user_id: any, body: any) {
      const res = await lmsApi(
        `/lms/company-user/user/${user_id}`,
        "PUT",
        body
      );
      return res;
    },
    async delete_member(user_id: any, body: any) {
      const res = await lmsApi(`/lms/company-user/user/${user_id}`, "DELETE");
      return res;
    },
  },
});
