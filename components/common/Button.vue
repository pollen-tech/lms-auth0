<template>
  <div>
    <v-btn
      v-if="variant !== 'null'"
      :size="size"
      :color="color"
      :variant="variant"
      :prepend-icon="prependIcon"
      :append-icon="appendIcon"
      class="rounded text-capitalize ma-1 pa-2 text-body-2"
      @click="callback($event)"
    >
      <slot />
    </v-btn>

    <v-btn
      v-else
      :size="size"
      :color="color"
      :prepend-icon="prependIcon"
      :append-icon="appendIcon"
      class="rounded text-capitalize ma-1 pa-2 text-body-2"
      @click="callback($event)"
    >
      <slot />
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "PButton",
  props: {
    color: {
      type: String,
      // default: "deep-purple",
      default: "grey-darken-3",
    },
    size: {
      type: String,
      default: null,
    },
    class: {
      type: String,
      default: "",
    },
    appendIcon: {
      type: String,
      default: null,
    },
    prependIcon: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: "null",
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  methods: {
    callback: function (e) {
      this.$emit("click", e);
    },
  },
};
</script>
