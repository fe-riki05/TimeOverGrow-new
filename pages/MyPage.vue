<template>
	<v-app>
		<Header>
			<v-btn text>
				<nuxt-link to="/" class="d-flex auth">
					<v-icon>mdi-reply-all</v-icon>
					<v-list-item-title style="display: block">アプリへ戻る</v-list-item-title>
				</nuxt-link>
			</v-btn>
			<!-- </v-layout> -->
		</Header>
		<v-container class="pa-0">
			<v-row cols="7" sm="7" md="4" class="container">
				<v-col>
					<v-card :elevation="10" class="mt-5 p-5">
						<Chart :chart-data="TagBarChartData" :options="TagBarChartOptions" class="m-2 pa-4" />
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
	import 'chartjs-plugin-colorschemes';
	import Header from '../layouts/Header';
	import Chart from '../components/Chart';
	// import MessageModel from '../models/Message';
	import { dbTags } from '../plugins/firebase';

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
							scheme: 'brewer.DarkTwo8'
							// custom: customColorFunction
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
				}
			};
		},
		async created() {
			await this.tagChart();

			// if (this.TagBarChartData.datasets[0].data.length === 0) {
			// 	this.TagBarChartData.datasets[0].data.push(vuechartData[0]);
			// }
			// this.TagBarChartData.datasets[0].data[0] = vuechartData[0];
		},
		methods: {
			async tagChart() {
				const TagCollection = await dbTags.get();
				// const tagId = [];
				TagCollection.docs.map(e => {
					// ↓でオブジェクトでデータを取得。
					// console.log(e.data());

					// タグtext,colorを格納。
					this.TagBarChartData.labels.push(e.data().text);
					// this.TagBarChartData.datasets[0].backgroundColor.push(e.data().color);
					// this.TagBarChartData.datasets[0].borderColor.push(e.data().color);
					this.TagBarChartData.datasets[0].data.push(e.data().time);

					this.TagBarChartOptions = {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							colorschemes: {
								scheme: 'brewer.DarkTwo8'
							}
						}
					};
				});
				// console.log(this.TagBarChartData.labels);
				// console.log(this.TagBarChartData.datasets[0].backgroundColor);

				this.TagBarChartData = {
					// ↓にtagの名前を格納
					labels: this.TagBarChartData.labels,
					datasets: [
						{
							label: ['学習時間'],
							// ↓にtagのデータを格納
							data: this.TagBarChartData.datasets[0].data
							// ↓にtagの色を格納
							// backgroundColor: this.TagBarChartData.datasets[0].backgroundColor,
							// borderColor: this.TagBarChartData.datasets[0].borderColor
						}
					]
				};
				this.TagBarChartOptions = {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						colorschemes: {
							scheme: 'brewer.DarkTwo8'
						}
					}
				};
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
