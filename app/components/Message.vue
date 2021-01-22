<template>
  <v-card class="message">
    <p class="message-text mb-0">{{ time }}時間</p>
    <div class="message-date">{{ date }}</div>
    <p class="message-text mb-0">{{ body }}</p>
  </v-card>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.message {
  min-height: 30px;
  padding: 10px;
  margin: 0 5vw 2vw;
}
.message:hover {
  background-color: #eee;
}
.message-date {
  font-size: 0.8em;
  color: #777;
  text-align: right;
}
</style>
