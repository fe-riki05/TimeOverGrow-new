<template>
	<v-app>
		<!-- <div> -->
		<Header>
			<nuxt-link to="/" class="link d-flex">
				<v-icon>mdi-reply-all</v-icon>
				<v-list-item-title style="display: block">アプリへ戻る</v-list-item-title>
			</nuxt-link>
		</Header>
		<v-card :elevation="10" class="mt-5 p-5">
			<Chart :chart-data="BarChartData" :options="BarChartOptions" class="m-2" />
		</v-card>
		<!-- </div> -->
	</v-app>
</template>

<script>
	import Header from '../layouts/Header';
	import Chart from '../components/Chart';
	import MessageModel from '../models/Message';

	export default {
		components: {
			Header,
			Chart
		},
		data() {
			return {
				vuechartData: [],
				BarChartData: {
					labels: ['学習時間'],
					datasets: [
						{
							label: ['学習時間'],
							data: [],
							backgroundColor: ['rgba(54, 162, 235, 0.2)'],
							borderColor: ['rgba(54, 162, 235, 1)']
						}
					]
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
									labelString: ''
								}
							}
						],
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
									max: 1000,
									stepSize: 100,
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
			const vuechartData = await this.getChart();
			if (this.BarChartData.datasets[0].data.length === 0) {
				this.BarChartData.datasets[0].data.push(vuechartData[0]);
			}
			this.BarChartData.datasets[0].data[0] = vuechartData[0];
		},
		methods: {
			async getChart() {
				try {
					const chartdbtime = await MessageModel.dbtime();
					if (this.BarChartData.datasets[0].data.length === 0) {
						this.BarChartData.datasets[0].data.push(chartdbtime);
					}
					this.vuechartData[0] = chartdbtime;
					this.BarChartData.datasets[0].data[0] = chartdbtime;
					return this.vuechartData;
				} catch (error) {
					alert(error.message);
				}
			}
		}
	};
</script>

<style scoped>
	>>> .v-application--wrap {
		min-height: 0;
	}
</style>
