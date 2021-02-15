<template>
	<v-app>
		<v-main>
			<v-container class="d-flex justify-space-around content">
				<v-row cols="5" sm="5" md="4" class="container">
					<v-col class="item text-center">
						<TotalTime :times="times" />
					</v-col>
					<v-col v-if="initialLoaded" class="item">
						<v-card :elevation="10" class="mt-5 p-5">
							<Chart :chart-data="BarChartData" :options="BarChartOptions" class="m-2" />
						</v-card>
					</v-col>
				</v-row>

				<v-row cols="7" sm="7" md="6" class="container mt-0">
					<v-col class="item">
						<v-card :elevation="10" class="pt-3 pl-5">
							<TextBox :on-click="add" class="container" />
							<Spinner v-if="!initialLoaded" class="container" />
							<p v-else-if="initialLoaded && messages.length === 0" class="text-center">投稿が0件です！！！</p>
						</v-card>
						<MessageList :messages="reversedMessages" @pop="clear" @update="edit" />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import MessageModel from '../models/Message';
	import TotalTime from './TotalTime';
	import Chart from './Chart';
	import TextBox from './TextBox';
	import Spinner from './Spinner';
	import MessageList from './MessageList';

	export default {
		components: {
			TotalTime,
			Chart,
			TextBox,
			Spinner,
			MessageList
		},
		data() {
			return {
				num: 0,
				name: '',
				index: '',
				done: false,
				messages: [],
				vuechartData: [],
				times: 0,
				initialLoaded: false,
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
		computed: {
			reversedMessages() {
				return this.messages.slice().reverse();
			}
		},
		async created() {
			const messages = await this.fetchMessages();
			const times = await this.totalTime();
			const vuechartData = await this.getChart();
			this.messages = messages;
			this.times = times;
			if (this.BarChartData.datasets[0].data.length === 0) {
				this.BarChartData.datasets[0].data.push(vuechartData[0]);
			}
			this.BarChartData.datasets[0].data[0] = vuechartData[0];
			this.initialLoaded = true;
		},

		methods: {
			add(message) {
				this.messages.push(message);
				this.times += message.time;

				const chartdbtime = message.time;
				if (this.BarChartData.datasets[0].data.length === 0) {
					this.BarChartData.datasets[0].data.push(chartdbtime);
				}

				this.BarChartData.datasets[0].data[0] += chartdbtime;
				// もう1度作り直さないといけない。
				this.BarChartData = {
					datasets: [
						{
							label: ['学習時間'],
							data: [(this.vuechartData[0] += chartdbtime)],
							backgroundColor: ['rgba(54, 162, 235, 0.2)'],
							borderColor: ['rgba(54, 162, 235, 1)']
						}
					]
				};
			},
			async clear() {
				this.messages = await this.fetchMessages();
				this.times = await this.totalTime();
				this.vuechartData[0] = await MessageModel.dbtime();
				this.BarChartData = {
					datasets: [
						{
							label: ['学習時間'],
							data: [this.vuechartData[0]],
							backgroundColor: ['rgba(54, 162, 235, 0.2)'],
							borderColor: ['rgba(54, 162, 235, 1)']
						}
					]
				};
			},
			edit() {
				console.log('Main.vueのeditです。');
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
	.container {
		max-width: 1300px;
		margin: 0 30px;
		padding: 0;
	}
	.content {
		margin: 0 auto;
	}
	.item {
		padding: 0;
	}
</style>
