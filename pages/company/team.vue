<template>
  <div class="pa-4">
    <h4>{{ title }}</h4>
    <CompanySearch
      :search-options="search_option"
      :itemsfilter="[]"
      :itemssort="['createdAt', 'updatedAt']"
      :show-add-member="true"
      @searchFn="search_fn"
      @addMember="add_member"
      @loadFn=""
    />

    <v-sheet class="d-flex align-center pa-2 my-4 rounded-lg bg-white">
      <div class="mx-4">
        <p>Selected</p>
        <b>{{ selected.length }}</b>
      </div>
      <v-spacer />

      <v-btn
        variant="tonal"
        append-icon="mdi-chevron-down"
        color="#8431e7"
        class="text-capitalize mr-2"
      >
        Bulk Action
        <v-tooltip activator="parent"> Not Available </v-tooltip>
        <v-menu activator="parent">
          <v-list>
            <v-list-item>
              <v-list-item-title>
                ({{ selected.length }}) Remove</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-sheet>

    <div class="table-responsive rounded-lg">
      <v-data-table
        v-model="selected"
        :headers="headers_member"
        :items="members"
        :items-per-page="page_size"
        item-value="user_id"
        height="50vh"
        class="elevation-0 fixed-cell bg-white"
        fixed-header
        show-select
        :loading="is_loading"
        hide-default-footer
        loading-text="Loading... Please wait"
      >
        <template #item.full_name="{ item }">
          <div class="d-flex align-center pl-2 my-2">
            {{ item.first_name + " " + item.last_name }}
          </div>
        </template>
        <template #item.phone_no="{ item }">
          <div>
            {{ item.phone_no || "-" }}
          </div>
        </template>

        <template #item.status="{ item }">
          <div class="ma-2 text-start">
            <v-chip v-if="item.status === 'Active'" color="green">
              Active
            </v-chip>
            <v-chip
              v-else-if="item.status === 'Incomplete'"
              color="orange-lighten-1"
            >
              Incomplete
            </v-chip>
            <v-chip
              v-else-if="
                item.status === 'Suspended' || item.status === 'Inactive'
              "
              color="red-darken-3"
            >
              {{ item.status }}
            </v-chip>
            <v-chip v-else color="gray"> {{ item.status }} </v-chip>
            <p class="text-caption mt-1 ml-2">
              Last activity: {{ item.last_update }}
            </p>
          </div>
        </template>
        <template #item.action="{ item }">
          <div class="d-flex my-1">
            <v-btn
              icon="mdi-square-edit-outline"
              variant="text"
              class="mr-1"
              @click="edit_item(item)"
            >
            </v-btn>
            <v-btn
              icon="mdi-trash-can-outline"
              variant="text"
              class="mr-1"
              @click="remove_item(item)"
            ></v-btn>
          </div>
        </template>
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
        <template #no-data>
          <div
            class="my-auto py-10 d-flex flex-column justify-center align-center"
          >
            <b class="text-purple-darken-3 my-1">No products found.</b>
            <p class="text-purple-darken-3">
              Upload in bulk by CSV or Add Products Individually
            </p>
          </div>
        </template>
        <template #bottom></template>
      </v-data-table>
    </div>
    <CompanyInviteMember
      v-model="dialog_team"
      :company="seller_company"
      :profile="user_profile"
      @loadfn="load_team"
      @error="handle_error"
      @close="dialog_team = false"
    />
    <CompanyMemberDetail
      v-model="dialog_edit"
      :company="seller_company"
      :profile="user_profile"
      :selected_member="selected_member"
      :show_member="dialog_edit"
      @loadfn="load_team"
      @error="handle_error"
      @close="dialog_edit = false"
    />
    <v-dialog v-model="dialog_success" width="auto">
      <v-container class="">
        <v-card
          class="mx-auto pa-6 rounded-lg"
          :width="$vuetify.display.mobile ? 'auto' : '500'"
        >
          <h4>Invitation Sent</h4>
          <p class="my-3" style="color: #6b7280">
            Please inform the member to check their email for the invitation
            email to setup account and join your team.
          </p>
          <v-card-actions class=" ">
            <v-spacer />
            <v-btn
              variant="outlined"
              class="text-body-1 font-weight-medium"
              @click="dialog_success = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card></v-container
      >
    </v-dialog>
    <NotificationStatus />
    <CommonConfirm ref="confirm" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSellerStore } from "~/stores/seller";
import { useMemberStore } from "~/stores/member";
import { useCommonStore } from "~/stores/common";

const sellerStore = useSellerStore();
const seller_company = computed(() => {
  return sellerStore.seller_company;
});
const user_profile = computed(() => {
  return sellerStore.user_profile;
});

const member_store = useMemberStore();
const { headers_member, fetch_team, get_roles, delete_member } = member_store;
const members = computed(() => member_store.members);
const member_roles = computed(() => member_store.member_roles);

const common_store = useCommonStore();

const title = "Team Management";
const search_option = ref([
  { name: "Name", value: "name" },
  { name: "Email", value: "email" },
]);
const selected = ref([]);
const page_size = ref(10);
const is_loading = ref(false);
const dialog_team = ref(false);
const dialog_edit = ref(false);
const dialog_success = ref(false);
const confirm = ref(null);
const search = reactive({
  name: "",
  email: "",
});
const selected_member = ref();

watch(seller_company, (newValue) => {
  if (newValue && newValue.id) {
    load_team();
  }
});

onMounted(async () => {
  await load_team();
  await get_roles();
  console.log(member_roles.value);
});

const clearSearch = () => {
  search.name = "";
  search.email = "";
};

const load_team = async (param) => {
  try {
    if (param) {
      dialog_success.value = true;
    }
    if (seller_company.value?.id) {
      await fetch_team(seller_company.value.id);
      console.log(members.value);
    }
  } catch (err) {
    console.log("error: ", err);
  }
};

const edit_item = (param) => {
  selected_member.value = param;
  dialog_edit.value = true;
};

const remove_item = async (param) => {
  try {
    const options = {
      title: `Are you sure you want to remove ${param.first_name}!`,
      message: `Removing this contact means that we will permanently delete all the information in our database and can’t be retrieved again. Are you sure you want to proceed?`,
      icon: "mdi-help-circle-outline",
      color: "purple darken-2",
      actionText1: "Back",
      actionText2: "Remove",
      actionIcon2: "",
      rejection: false,
    };
    if (await confirm.value.open(options)) {
      const req = await delete_member(param.user_id);
      if (req.statusCode) {
        handle_error(req);
      }
    }
  } catch (err) {
    handle_error(err);
  }
};

const search_fn = (param) => {
  clearSearch();
  search[param.searchField] = param.search;
  console.log(search);
};

const add_member = () => {
  dialog_team.value = true;
};

const handle_error = (req) => {
  let errorMsg = req.message;
  if (typeof req.message !== "string") {
    const formattedMessages = req.message.map((message) => {
      const words = message.split(" ");
      words[0] = "• " + words[0];
      return words.join(" ");
    });

    errorMsg = formattedMessages.join(",<br/>");
  }

  common_store.setShowNotification({
    display: true,
    status: "error",
    msg: errorMsg,
  });
};
</script>

<style lang="scss" scoped></style>
