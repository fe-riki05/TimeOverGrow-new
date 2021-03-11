<template>
  <v-app>
    <v-container class="pa-0 col">
      <v-row class="pa-0 col">
        <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
        <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="col mx-2 mt-5">
          <TotalTime :times="times" />
          <v-card :elevation="10" class="mt-5 py-5">
            <Chart
              :chart-data="BarChartData"
              :options="BarChartOptions"
              class="pa-3"
            />
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="col mx-2 mt-5">
          <v-card :elevation="10" class="pa-5">
            <TextBox :on-click="add" />
            <h2 v-if="messages.length === 0" class="pa-5">
              投稿が0件です！！！
            </h2>
          </v-card>
          <MessageList
            :messages="reversedMessages"
            @pop="clear"
            @update="updated"
            @updatedDate="updatedDateId"
          />
          <!-- dialogの設定 -->
          <div justify="center">
            <v-dialog v-model="dialog" persistent max-width="600">
              <v-card>
                <DialogEdit
                  :update-time.sync="updateTime"
                  :update-select.sync="updateSelect"
                  :update-body.sync="updateBody"
                  class="container"
                  @updatedDate="updatedDate"
                >
                  <v-icon color="green darken-1"> 更新する </v-icon>
                </DialogEdit>
                <v-card-actions>
                  <v-btn color="green darken-1" text @click="back">
                    戻る
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <!-- ここまで -->
        </v-col>
        <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import MessageModel from '../models/Message'
import firebase, { dbMessages, dbTags } from '../plugins/firebase'
import TotalTime from './TotalTime'
import Chart from './Chart'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import TextBox from './TextBox'
import MessageList from './MessageList'
import DialogEdit from './DialogEdit'

export default {
  components: {
    TotalTime,
    Chart,
    TextBox,
    MessageList,
    DialogEdit,
  },
  data() {
    return {
      indexId: '',
      updateTime: 0,
      updateSelect: [],
      updateBody: '',
      editTagData: [],
      dialog: false,
      num: 0,
      name: '',
      index: '',
      vuechartData: [],
      max: 0,
      step: 0,
      done: false,
      messages: [],
      times: 0,
      initialLoaded: false,
      BarChartData: {
        labels: ['学習時間'],
        datasets: [
          {
            label: ['学習時間'],
            data: [],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
          },
        ],
      },
      BarChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: '',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 0,
                stepSize: 0,
                callback(label) {
                  return label + ' h'
                },
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label(tooltipItem) {
              return tooltipItem.yLabel + ' h'
            },
          },
        },
      },
    }
  },
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse()
    },
  },
  async created() {
    const messages = await this.fetchMessages()
    const times = await this.totalTime()
    const vuechartData = await this.getChart()
    this.messages = messages
    this.times = times
    if (this.BarChartData.datasets[0].data.length === 0) {
      this.BarChartData.datasets[0].data.push(vuechartData[0])
    }
    this.BarChartData.datasets[0].data[0] = vuechartData[0]
    this.initialLoaded = true

    await this.timeScales()
  },
  methods: {
    // Chart図のメモリ変更処理
    async timeScales() {
      // let chart = new Chart(this.BarChartData, this.BarChartOptions)
      const totalTime = await MessageModel.dbtime()
      let max = this.BarChartOptions.scales.yAxes[0].ticks.max
      let step = this.BarChartOptions.scales.yAxes[0].ticks.stepSize

      max = JSON.parse(JSON.stringify(max))
      step = JSON.parse(JSON.stringify(step))

      if (totalTime < 30) {
        this.max = max
        this.step = step

        this.BarChartOptions = {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: this.max,
                stepSize: this.step,
                callback(label) {
                  return label + ' h'
                },
              },
            },
          ],
        }
      }

      console.log(totalTime) // 31
      if (totalTime >= 30) {
        console.log(max) // [30]
        console.log(step) // [3]

        // max.pop()
        // step.pop()
        // max.push(50)
        // step.push(5)

        console.log(max) // [50]
        console.log(step) // [5]
      }
    },
    add(message) {
      this.messages.push(message)
      this.times += message.times
      const chartdbtime = message.times
      if (this.BarChartData.datasets[0].data.length === 0) {
        this.BarChartData.datasets[0].data.push(chartdbtime)
      }
      this.BarChartData.datasets[0].data[0] += chartdbtime
      // もう1度作り直さないといけない。
      this.BarChartData = {
        datasets: [
          {
            label: ['学習時間'],
            data: [(this.vuechartData[0] += chartdbtime)],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
          },
        ],
      }
      // this.timeScales();
    },
    async clear() {
      this.messages = await this.fetchMessages()
      this.times = await this.totalTime()
      this.vuechartData[0] = await MessageModel.dbtime()
      this.BarChartData = {
        datasets: [
          {
            label: ['学習時間'],
            data: [this.vuechartData[0]],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
          },
        ],
      }
    },
    back() {
      this.dialog = false
      this.editTagData = []
    },
    // ここで選択した投稿IDを取得し、bodyを入力。
    async updated(docId) {
      this.dialog = true
      const editId = await dbMessages.doc(docId).get()
      const editData = editId.data()
      this.editTagData = editData.tags
      // dialogにtag表示の記述
      // let newTagData = [];
      // editData.tags.map(tagData => {
      // 	newTagData.push(tagData.text);
      // 	return newTagData;
      // });

      // クリックしたtagのdata取得。
      // console.log(editData.tags);

      // console.log(newTagData);
      // console.log();

      this.updateTime = parseInt(editData.times)
      this.updateBody = editData.bodys
      // this.updateSelect = newTagData;
    },
    async updatedDateId(docId) {
      const editId = await dbMessages.doc(docId).get()
      this.indexId = editId.id

      // editId.idは、選択したdocId
      // 一度indexIdへ渡すことで取り出せる様にしてる。
    },
    // 編集dialogで決定した際の挙動
    async updatedDate() {
      this.dialog = false

      // 入力したtagの合計time値をthis.updateTimeへ入力(複数dataの時も考える)
      let tagTime = 0
      const tagText = []

      this.updateSelect.map((Element) => {
        tagText.push(Element.text)
        tagTime += Element.time
      })
      this.updateTime = tagTime

      // クリックしたtagのtime値をdbTagsからマイナス(複数dataの時も考える)
      this.editTagData.map(async (Element) => {
        Element = JSON.parse(JSON.stringify(Element))

        const uid = firebase.auth().currentUser.uid
        const sameTagText = await dbTags
          .where('uid', '==', uid)
          .where('text', '==', Element.text)
          .get()
        sameTagText.docs.map(async (doc) => {
          // クリックした箇所の元々のdataとid
          let sameTagTime = doc.data().time
          sameTagTime -= Element.time

          if (sameTagTime <= 0) {
            await dbTags.doc(doc.id).delete()
          } else {
            await dbTags.doc(doc.id).update({
              time: sameTagTime,
            })
          }
          return doc.id, doc.data()
        })
      })

      await dbMessages.doc(this.indexId).update({
        times: this.updateTime,
        tags: this.updateSelect,
        bodys: this.updateBody,
      })
      ;(this.updateTime = 0),
        (this.updateSelect = []),
        (this.editTagData = []),
        (this.updateBody = ''),
        // フロントでdbを反映
        this.clear()
    },
    async fetchMessages() {
      try {
        let messages = []
        messages = await MessageModel.fetchMessages()
        return messages
      } catch (error) {
        alert(error.message)
      }
    },
    async totalTime() {
      try {
        let times = 0
        const time = await MessageModel.dbtime()
        times += time
        return times
      } catch (error) {
        alert(error.message)
      }
    },
    async getChart() {
      try {
        const chartdbtime = await MessageModel.dbtime()
        if (this.BarChartData.datasets[0].data.length === 0) {
          this.BarChartData.datasets[0].data.push(chartdbtime)
        }
        this.vuechartData[0] = chartdbtime
        this.BarChartData.datasets[0].data[0] = chartdbtime
        return this.vuechartData
      } catch (error) {
        alert(error.message)
      }
    },
  },
}
</script>

<style scoped>
h2 {
  position: relative;
  padding: 0.6em;
  background: #e0edff;
}

h2:after {
  position: absolute;
  content: '';
  top: 100%;
  left: 30px;
  border: 15px solid transparent;
  border-top: 15px solid #e0edff;
  width: 0;
  height: 0;
}
.col {
  padding: 0;
  margin: 0 auto;
}
.v-application .mx-2 {
  margin: 0 auto;
}
</style>
