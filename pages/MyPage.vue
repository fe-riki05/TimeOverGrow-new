<template>
  <v-app>
    <Header>
      <v-list-item text>
        <nuxt-link to="/" class="d-flex auth">
          <v-icon>mdi-account-check</v-icon>
          <v-list-item-title class="pl-1">マイページへ戻る</v-list-item-title>
        </nuxt-link>
      </v-list-item>
    </Header>
    <v-container class="mt-5 pa-0 col">
      <v-row class="pa-0 col">
        <v-col cols="10" sm="8" md="8" lg="8" xl="8" class="col">
          <v-card :elevation="10" class="mt-5 p-5">
            <Chart :chart-data="TagBarChartData" :options="TagBarChartOptions" class="pa-4" />
          </v-card>
        </v-col>
        <v-col cols="10" sm="8" md="8" lg="8" xl="8" class="col">
          <v-card :elevation="10" class="mt-5 p-5">
            <CalendarHeatmap :values="heartmapData" :end-date="endData" :max="5" tooltip-unit="点" class="ma-10 py-4">
            </CalendarHeatmap>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { CalendarHeatmap } from 'vue-calendar-heatmap';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from '../components/Chart';
import 'chartjs-plugin-colorschemes';
import Header from '../layouts/Header';
import firebase, { dbMessages, dbTags } from '../plugins/firebase';
import MessageModel from '../models/Message';

export default {
  components: {
    Header,
    Chart,
    CalendarHeatmap,
  },
  data() {
    return {
      vuechartData: [],
      TagBarChartData: {
        labels: [],
        datasets: [
          {
            label: ['学習時間'],
            data: [],
          },
        ],
      },
      TagBarChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          colorschemes: {
            scheme: 'brewer.Blues3',
          },
        },
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
      heartmapData: [],
      // 空白だとエラー発生
      endData: '2021-01-1',
      timeCount: null,
    };
  },
  async created() {
    await this.tagChart();
    await this.heartmap();
  },
  methods: {
    // tag毎のグラフ
    async tagChart() {
      const uid = firebase.auth().currentUser.uid;
      const TagCollection = await dbTags.where('uid', '==', uid).get();
      TagCollection.docs.map((e) => {
        this.TagBarChartData.labels.push(e.data().text);

        // 分→時間へ
        let minutesTime = Math.floor((e.data().time / 60) * 10) / 10;

        this.TagBarChartData.datasets[0].data.push(minutesTime);
      });

      this.TagBarChartData = {
        labels: this.TagBarChartData.labels,
        datasets: [
          {
            label: ['学習時間'],
            data: this.TagBarChartData.datasets[0].data,
          },
        ],
      };

      // グラフの最大値とメモリの間隔を設定
      const vuechartData = (await MessageModel.dbtime()) / 60;
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
      this.TagBarChartOptions = {
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
    // heartmapのdata毎の配色分け
    async heartmap() {
      const uid = firebase.auth().currentUser.uid;
      const messageData = await dbMessages.where('uid', '==', uid).get();

      const messagesDate = messageData.docs.map((doc) => {
        let timeData = Math.floor(doc.data().times / 60);

        if (timeData === 0) {
          this.timeCount = 0;
        }
        if (0 < timeData <= 1) {
          this.timeCount = 1;
        }
        if (2 <= timeData) {
          this.timeCount = 2;
        }
        if (3 <= timeData) {
          this.timeCount = 3;
        }
        if (4 <= timeData) {
          this.timeCount = 4;
        }
        if (5 <= timeData) {
          this.timeCount = 5;
        }

        return { date: doc.data().date.seconds * 1000, count: this.timeCount };
      });
      this.heartmapData = messagesDate;

      // endData
      const today = new Date();
      const Year = new Date(today.setFullYear(today.getFullYear()));
      this.endData = Year;
    },
  },
};
</script>

<style scoped>
>>> .v-application--wrap {
  min-height: 0;
}
.col {
  padding: 0;
  margin: 0 auto;
}
.auth {
  text-decoration: none;
  color: inherit;
}
</style>
