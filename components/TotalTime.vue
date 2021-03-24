<template>
  <v-app>
    <v-card :elevation="10">
      <v-img :src="image_src" max-width="350px" max-height="350px" style="margin: 0 auto" />
    </v-card>
    <v-card :elevation="10" class="mt-5 card">
      <div class="totaltime d-flex justify-center">
        <p class="times_text">合計学習時間</p>
        <div class="arrow">
          <p class="times">{{ hours }}時間 {{ minutes }}分</p>
          <span />
        </div>
      </div>
    </v-card>
  </v-app>
</template>

<script>
export default {
  props: {
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      image_src: require('@/assets/timeovergrow.png'),
    };
  },
};
</script>

<style scoped>
.totaltime {
  text-align: center;
}
.card {
  color: #6cb4e4;
  text-align: center;
  padding: 0.25em;
  border-top: solid 2px #6cb4e4;
  border-bottom: solid 2px #6cb4e4;
  background: -webkit-repeating-linear-gradient(-45deg, #f0f8ff, #f0f8ff 3px, #e9f4ff 3px, #e9f4ff 7px);
}
.times_text,
.times {
  font-size: 20px;
  font-weight: 900;
}
.times_text {
  margin: auto 0;
}
.times {
  font-size: 30px;
}
.arrow p {
  margin: 0;
  padding-left: 5px;
  font-weight: bold;
}
</style>
