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
					<!-- <canvas id="myChart" height="400" width="400"> -->
					<v-card :elevation="10" class="mt-5 p-5">
						<Chart :chart-data="TagBarChartData" :options="TagBarChartOptions" class="m-2 pa-4" />
					</v-card>
					<!-- <v-card :elevation="10" class="mt-5 p-5">
						<Chart :chart-data="TimeBarChartData" :options="TimeBarChartOptions" class="m-2 pa-4" />
					</v-card> -->
					<!-- </canvas> -->
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
	import Chart from '../components/Chart';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import 'chartjs-plugin-colorschemes';
	import Header from '../layouts/Header';
	import firebase, { dbTags } from '../plugins/firebase';

	export default {
		components: {
			Header,
			Chart
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
				}
			};
		},
		async created() {
			await this.tagChart();
		},
		methods: {
			async tagChart() {
				const uid = firebase.auth().currentUser.uid;
				const TagCollection = await dbTags.where('uid', '==', uid).get();
				TagCollection.docs.map(e => {
					this.TagBarChartData.labels.push(e.data().text);
					this.TagBarChartData.datasets[0].data.push(e.data().time);

					// this.TagBarChartOptions = {
					// 	responsive: true,
					// 	maintainAspectRatio: false,
					// 	plugins: {
					// 		colorschemes: {
					// 			scheme: 'brewer.Paired12'
					// 		}
					// 	}
					// };
				});

				this.TagBarChartData = {
					// ↓にtagの名前を格納
					labels: this.TagBarChartData.labels,
					datasets: [
						{
							label: ['学習時間'],
							data: this.TagBarChartData.datasets[0].data
						}
					]
				};
				// this.TagBarChartOptions = {
				// 	responsive: true,
				// 	maintainAspectRatio: false,
				// 	plugins: {
				// 		colorschemes: {
				// 			scheme: 'brewer.Paired12'
				// 		}
				// 	}
				// };
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
