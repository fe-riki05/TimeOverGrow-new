<template>
  <v-app>
    <v-card :elevation="10">
      <v-img
        :src="image_src"
        max-width="350px"
        max-height="350px"
        style="margin: 0 auto"
      />
    </v-card>
    <v-card :elevation="10" class="mt-5 card">
      <div class="totaltime d-flex justify-center mb-3 pb-2">
        <p class="times_text">合計学習時間</p>
        <div class="arrow">
          <p class="times">{{ times }}時間</p>
          <span />
        </div>
      </div>
    </v-card>
  </v-app>
</template>

<script>
export default {
  props: {
    times: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      image_src: require('@/assets/timeovergrow.png'),
    }
  },
}
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
  background: -webkit-repeating-linear-gradient(
    -45deg,
    #f0f8ff,
    #f0f8ff 3px,
    #e9f4ff 3px,
    #e9f4ff 7px
  );
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
/* .arrow {
		margin: 10px 0;
	} */
.arrow p {
  margin: 0;
  padding-left: 5px;
  font-weight: bold;
}
.arrow span {
  display: block;
  width: 150px;
  height: 2px;
  background-color: rgb(0, 47, 255);
  position: relative;
  transform: scale(0, 1);
  transform-origin: top left;
  animation: arrow01 5s ease-in-out infinite forwards;
}
@keyframes arrow01 {
  0% {
    transform: scale(0, 1);
  }
  30% {
    transform: scale(0, 1);
  }
  40% {
    transform: scale(1, 1);
  }
  85% {
    transform: scale(1, 1);
    opacity: 1;
  }
  90% {
    transform: scale(1, 1);
    opacity: 0;
  }
  100% {
    transform: scale(1, 1);
    opacity: 0;
  }
}
.arrow span::after {
  content: '';
  display: block;
  width: 40px;
  height: 15px;
  border-right: 2px solid rgb(0, 47, 255);
  transform: rotate(-45deg) scale(1, 0);
  transform-origin: right bottom;
  position: absolute;
  bottom: 2px;
  right: 1px;
  animation: arrow02 5s ease-in-out infinite forwards;
}
@keyframes arrow02 {
  0% {
    transform: rotate(-45deg) scale(1, 0);
  }
  45% {
    transform: rotate(-45deg) scale(1, 0);
  }
  55% {
    transform: rotate(-45deg) scale(1, 1);
  }
  85% {
    transform: rotate(-45deg) scale(1, 1);
    opacity: 1;
  }
  90% {
    transform: rotate(-45deg) scale(1, 1);
    opacity: 0;
  }
  100% {
    transform: rotate(-45deg) scale(1, 1);
    opacity: 0;
  }
}
</style>
