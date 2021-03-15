<template>
  <div class="message-list">
    <template v-for="(message, index) in messages">
      <Message
        :key="index"
        :hours="Math.floor(message.times / 60)"
        :minutes="message.times - Math.floor(message.times / 60) * 60"
        :bodys="message.bodys"
        :date="message.date"
        :tag="message.tags"
        :i="index"
        @clear="clear"
        @edit="edit"
      />
    </template>
  </div>
</template>

<script>
import Message from './Message';

export default {
  components: {
    Message,
  },
  props: {
    messages: {
      type: Array,
      required: true,
      validator(messages) {
        return messages.every((message) => {
          // if (typeof message.time !== 'number') {
          // 	return false;
          // }
          if (typeof message.date !== 'string') {
            return false;
          }
          if (typeof message.bodys !== 'string') {
            return false;
          }
          return true;
        });
      },
    },
  },
  methods: {
    clear() {
      this.$emit('pop');
    },
    edit(docId) {
      this.$emit('update', docId);
      this.$emit('updatedDate', docId);
    },
  },
};
</script>

<style scoped>
.message-list {
  margin: 0;
}
</style>
