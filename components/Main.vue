<template>
  <v-app>
    <v-container class="pa-0 col">
      <v-row class="pa-0 col">
        <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
        <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="col mx-2 mt-5">
          <TotalTime :hours="Math.floor(times / 60)" :minutes="times - Math.floor(times / 60) * 60" />
          <v-card :elevation="10" class="mt-5 py-5">
            <Chart :chart-data="BarChartData" :options="BarChartOptions" class="pa-3" />
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="col mx-2 mt-5">
          <v-card :elevation="10" class="pa-5">
            <TextBox :on-click="add" @tagGet="getData" />
            <h2 v-if="messages.length === 0" class="mt-3 pa-5">投稿が0件です！！！</h2>
          </v-card>
          <MessageList :messages="reversedMessages" @pop="getData" @update="updated" @updatedDate="updatedDateId" />
          <!-- ここからdialog設定 -->
          <v-dialog v-model="dialog" persistent max-width="600">
            <v-card>
              <DialogEdit
                :update-time.sync="updateTime"
                :edit-before-data.sync="editBeforeData"
                :update-select.sync="updateSelect"
                :update-body.sync="updateBody"
                class="container"
                @updatedDate="updatedDate"
                @back="back"
              >
              </DialogEdit>
            </v-card>
          </v-dialog>
          <!-- ここまで -->
        </v-col>
        <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import MessageModel from '../models/Message';
import firebase, { dbMessages, dbTags } from '../plugins/firebase';
import TotalTime from './TotalTime';
import TextBox from './TextBox';
import MessageList from './MessageList';
import DialogEdit from './DialogEdit';
import Chart from './Chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
      editBeforeData: [],
      updateSelect: [],
      updateBody: '',
      editTagData: [],
      dialog: false,
      vuechartData: [],
      messages: [],
      times: 0,
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
                  return label + ' h';
                },
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label(tooltipItem) {
              return tooltipItem.yLabel + ' h';
            },
          },
        },
      },
    };
  },
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    },
  },
  async created() {
    await this.getData();
  },
  methods: {
    async add(message) {
      this.messages.push(message);
      await this.getData();
    },
    async getData() {
      this.messages = await this.fetchMessages();
      this.times = await this.totalTime();
      const vuechartData = Math.floor(((await MessageModel.dbtime()) / 60) * 10) / 10;
      this.BarChartData = {
        labels: ['学習時間'],
        datasets: [
          {
            label: ['学習時間'],
            data: [vuechartData],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
          },
        ],
      };

      // グラフの最大値とメモリの間隔を設定
      let max = 0;
      let stepSize = 0;
      if (vuechartData < 30) {
        max = 30;
        stepSize = 3;
      }
      if (30 <= vuechartData) {
        max = 50;
        stepSize = 5;
      }
      if (50 <= vuechartData) {
        max = 100;
        stepSize = 10;
      }
      if (100 <= vuechartData) {
        max = vuechartData + 20;
        stepSize = 20;
      }
      this.BarChartOptions = {
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
                max: max,
                stepSize: stepSize,
                callback(label) {
                  return label + ' h';
                },
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label(tooltipItem) {
              return tooltipItem.yLabel + ' h';
            },
          },
        },
      };
    },
    back() {
      this.dialog = false;
      this.editTagData = [];
    },
    // ここで選択した投稿IDを取得し、bodyを入力。
    async updated(docId) {
      this.dialog = true;
      const editId = await dbMessages.doc(docId).get();
      const editData = editId.data();
      this.editTagData = editData.tags;
      let newTagData = [];
      editData.tags.map((tagData) => {
        newTagData.push(tagData.text);
        return newTagData;
      });

      this.updateTime = parseInt(editData.times);
      this.editBeforeData = editData.tags;
      this.updateBody = editData.bodys;
    },
    async updatedDateId(docId) {
      const editId = await dbMessages.doc(docId).get();
      this.indexId = editId.id;
    },
    // 編集dialogで決定した際の挙動
    async updatedDate() {
      this.dialog = false;

      // 入力したtagの合計time値をthis.updateTimeへ入力(複数dataの時も考える)
      let tagTime = 0;
      const tagText = [];

      this.updateSelect.map((Element) => {
        tagText.push(Element.text);
        tagTime += Element.time;
      });
      this.updateTime = tagTime;

      this.editTagData.map(async (Element) => {
        Element = JSON.parse(JSON.stringify(Element));

        const uid = firebase.auth().currentUser.uid;
        const sameTagText = await dbTags.where('uid', '==', uid).where('text', '==', Element.text).get();
        sameTagText.docs.map(async (doc) => {
          // クリックした箇所の元々のdataとid
          let sameTagTime = doc.data().time;
          sameTagTime -= Element.time;

          if (sameTagTime <= 0) {
            await dbTags.doc(doc.id).delete();
          } else {
            await dbTags.doc(doc.id).update({
              time: sameTagTime,
            });
          }
          return doc.id, doc.data();
        });
      });

      await dbMessages.doc(this.indexId).update({
        times: this.updateTime,
        tags: this.updateSelect,
        bodys: this.updateBody,
      });
      (this.updateTime = 0),
        (this.updateSelect = []),
        (this.editTagData = []),
        (this.updateBody = ''),
        // 同期処理
        this.getData();
    },
    async fetchMessages() {
      try {
        let messages = [];
        messages = await MessageModel.fetchMessages();
        return messages;
      } catch (error) {
        alert(error.message);
      }
    },
    async totalTime() {
      try {
        let times = 0;
        const time = await MessageModel.dbtime();
        times += time;
        return times;
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
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
