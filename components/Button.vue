<template>
  <v-btn class="button" outlined :type="type" :disabled="!clickable" @click="handleClick">
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    onClick: {
      type: [Function, Boolean],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    prevent: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    clickable() {
      return this.disabled === false;
    },
  },
  methods: {
    async handleClick(event) {
      if (this.prevent && this.type === 'button') {
        event.preventDefault();
      }
      if (this.onClick === null) {
        return;
      }
      await this.onClick(event);
    },
  },
};
</script>

<style scoped>
.button {
  padding: 5px;
}
</style>
