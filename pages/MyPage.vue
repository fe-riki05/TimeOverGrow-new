<template>
	<v-app>
		<Header>
			<v-btn text>
				<nuxt-link to="/" class="d-flex auth">
					<v-icon>mdi-reply-all</v-icon>
					<v-list-item-title style="display: block">アプリへ戻る</v-list-item-title>
				</nuxt-link>
			</v-btn>
		</Header>
		<v-container class="pa-0">
			<v-row cols="7" sm="7" md="4" class="container">
				<v-col>
					<v-card :elevation="10" class="mt-5 p-5">
						<Chart :chart-data="TagBarChartData" :options="TagBarChartOptions" class="m-2 pa-4" />
					</v-card>
					<v-card :elevation="10" class="mt-5 p-5">
						<!-- <Chart :chart-data="TimeBarChartData" :options="TimeBarChartOptions" class="m-2 pa-4" /> -->
						<CalendarHeatmap :values="heartmapData" :end-date="endData" :max="5" tooltip-unit="点" class="ma-10 py-4">
						</CalendarHeatmap>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
	import Chart from '../components/Chart';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import 'chartjs-plugin-colorschemes';
	import { CalendarHeatmap } from 'vue-calendar-heatmap';
	import Header from '../layouts/Header';
	import firebase, { dbMessages, dbTags } from '../plugins/firebase';
	// import MessageModel from '../models/Message';

	export default {
		components: {
			Header,
			Chart,
			CalendarHeatmap
		},
		data() {
			return {
				vuechartData: [],
				TagBarChartData: {
					// ↓にtagの名前を格納
					labels: [],
					datasets: [
						{
							label: ['学習時間'],
							// ↓にtagのデータを格納
							data: []
							// ↓にtagの色を格納
							// backgroundColor: [],
							// borderColor: []
						}
					]
				},
				TagBarChartOptions: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						colorschemes: {
							scheme: 'brewer.Paired12'
						}
					},
					scales: {
						xAxes: [
							{
								stacked: true,
								scaleLabel: {
									display: true,
									labelString: ''
								}
							}
						],
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
									max: 500,
									stepSize: 50,
									callback(label) {
										return label + ' h';
									}
								}
							}
						]
					},
					tooltips: {
						callbacks: {
							label(tooltipItem) {
								return tooltipItem.yLabel + ' h';
							}
						}
					}
				},
				TimeBarChartData: {
					// ↓にtagの名前を格納
					labels: [],
					datasets: [
						{
							label: ['学習時間'],
							// ↓にtagのデータを格納
							data: []
							// ↓にtagの色を格納
							// backgroundColor: [],
							// borderColor: []
						}
					]
				},
				TimeBarChartOptions: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						colorschemes: {
							scheme: 'brewer.Paired12'
							// custom: customColorFunction
						},
						ChartDataLabels
					},
					scales: {
						xAxes: [
							{
								stacked: true,
								scaleLabel: {
									display: true,
									labelString: ''
								}
							}
						],
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
									max: 500,
									stepSize: 50,
									callback(label) {
										return label + ' h';
									}
								}
							}
						]
					},
					tooltips: {
						callbacks: {
							label(tooltipItem) {
								return tooltipItem.yLabel + ' h';
							}
						}
					}
				},
				heartmapData: [],
				// 空白だとエラー発生
				endData: '2021-01-1',
				timeCount: 5
			};
		},
		async created() {
			await this.tagChart();
			await this.hearmap();
		},
		methods: {
			async tagChart() {
				const uid = firebase.auth().currentUser.uid;
				const TagCollection = await dbTags.where('uid', '==', uid).get();
				TagCollection.docs.map(e => {
					this.TagBarChartData.labels.push(e.data().text);
					this.TagBarChartData.datasets[0].data.push(e.data().time);
				});
				this.TagBarChartData = {
					labels: this.TagBarChartData.labels,
					datasets: [
						{
							label: ['学習時間'],
							data: this.TagBarChartData.datasets[0].data
						}
					]
				};
			},
			async hearmap() {
				const uid = firebase.auth().currentUser.uid;
				const messageData = await dbMessages.where('uid', '==', uid).get();
				let messagesDate = messageData.docs.map(doc => {
					// console.log(doc.data().times);
					let timeData = doc.data().times;
					if (timeData <= 1) {
						timeData = 1;
					} else if (timeData <= 3) {
						timeData = 2;
					} else if (timeData <= 5) {
						timeData = 3;
					} else if (timeData <= 8) {
						timeData = 4;
					} else if (timeData > 8) {
						timeData = 5;
					}
					this.timeCount = timeData;
					return { date: doc.data().date.seconds * 1000, count: this.timeCount };
				});
				// console.log(messagesDate);

				this.heartmapData = messagesDate;

				// endData
				const today = new Date();
				const Year = new Date(today.setFullYear(today.getFullYear()));
				this.endData = Year;
				// this.startData = Year;

				// console.log(this.heartmapData);
			}
		}
	};
</script>

<style scoped>
	>>> .v-application--wrap {
		min-height: 0;
	}
	.auth {
		text-decoration: none;
		color: inherit;
	}
</style>
