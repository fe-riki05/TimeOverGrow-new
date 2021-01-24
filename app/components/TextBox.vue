<template>
  <div class="textbox-container">
    <client-only>
      <input
        v-model.trim="time"
        class="textbox-input"
        type="number"
        max="24"
        min="0.25"
        step="0.25"
        placeholder="3"
      />時間
      <p>今日のアウトプット内容</p>
      <v-textarea
        v-model.trim="body"
        class="textbox-area"
        label="JavaScriptの非同期処理について学んだが、まだまだ理解不足なのでクイズアプリの実装を通して学んでいきたい。"
        flat
        auto-grow
        outlined
        rows="1"
        row-height="100"
      ></v-textarea>
      <div class="textbox-button">
        <Button
          title="今日の学習内容送信！！！"
          :on-click="post"
          :on-get="get"
          :on-chart="chart"
          :clickable="canPost"
        />
      </div>
    </client-only>
  </div>
</template>

<script>
import MessageModel from '../models/Message'
import Button from './Button'

export default {
  components: {
    Button
  },
  props: {
    onPost: {
      type: Function,
      required: true
    },
    onGet: {
      type: Function,
      required: true
    },
    onChart: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      time: 0,
      body: '',
      canPost: true
    }
  },
  methods: {
    async post() {
      this.canPost = false
      try {
        const message = await MessageModel.save({
          time: Number(this.time),
          body: this.body
        })
        this.onPost(message)
        this.time = 0
        this.body = ''
      } catch (error) {
        alert(error.message)
      }
      this.canPost = true
    },

    async get() {
      let times = 0
      try {
        times += await MessageModel.dbtime()
        this.onGet(times)
      } catch (error) {
        alert(error.message)
      }

      return times
    },

    async chart() {
      const vuechartData = []
      const chartdbtime = await MessageModel.dbtime()
      try {
        if (vuechartData.length === 0) {
          vuechartData.push(chartdbtime)
        }
        this.onChart(vuechartData[0])
      } catch (error) {
        alert(error.message)
      }
      return vuechartData[0]
    }
  }
}
</script>

<style scoped>
.textbox-container {
  padding: 0 5vw;
}
.textbox-input {
  margin: 1vw;
  border: 1px solid rgb(161, 161, 161);
}
.textbox-area {
  width: 100%;
  resize: none;
  background: white;
  border-radius: 5px;
  padding: 0;
}
.textbox-button {
  margin-top: 10px;
  text-align: right;
}
</style>
