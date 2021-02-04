<template>
	<div>
		<client-only>
			<v-row class="container d-flex justify-center">
				<v-col cols="12" sm="6" md="5" class="p-0">
					<TotalTime :times="times" />
				</v-col>
				<v-col v-if="initialLoaded" cols="12" sm="6" md="7" class="p-0">
					<Chart :chart-data="BarChartData" :options="BarChartOptions" />
				</v-col>
			</v-row>
			<TextBox :on-post="addMessage" :on-get="addTime" :on-chart="makeData" class="container" />
			<Spinner v-if="!initialLoaded" class="container" />
			<p v-else-if="initialLoaded && messages.length === 0" class="no-messages">毎日の積み上げ0件</p>
			<MessageList :messages="reversedMessages" class="container" />
		</client-only>
	</div>
</template>

<script>
	import MessageModel from '../models/Message'
	import { dbMessages } from '../plugins/firebase'
	import TotalTime from './TotalTime'
	import Chart from './Chart'
	import TextBox from './TextBox'
	import Spinner from './Spinner'
	import MessageList from './MessageList'
	

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
				BarChartData: {},
				options: {},
				times: 0,
				initialLoaded: false
			}
		},
		computed: {
			reversedMessages() {
				return this.messages.slice().reverse()
			}
		},
		async mounted() {
			await this.makeData()
		},
		async created() {
			const messages = await this.fetchMessages()
			const times = await this.totalTime()
			const vuechartData = await this.getChart()

			this.messages = messages
			this.times = times
			this.BarChartData.datasets[0].data[0] = vuechartData[0]
			this.initialLoaded = true
		},

		methods: {
			// async deleteMessage(message) {
			// 	if (message !== undefined) {
			// 		try {
			// 			await this.messages.pop(message)
			// 			await dbMessages.doc(message).delete()
			// 			this.times = await MessageModel.dbtime()

			// 			const vuechartData = await this.getChart()

			// 			console.log(this.times);
			// 			console.log(vuechartData[0]);
			// 			console.log(this.BarChartData.datasets[0].data[0]);

			// 			this.BarChartData.datasets[0].data[0] = await vuechartData[0]

			// 			console.log(this.BarChartData.datasets[0].data[0]);
			// 		} catch (error) {
			// 			console.error(error)
			// 		}
			// 	} else {
			// 		alert('削除する積み上げがありません。。。')
			// 	}
			// },
			addMessage(message) {
				this.messages.push(message)
			},
			addTime(times) {
				this.times = times
			},
			async makeData() {
				const vuechartData = []
				const chartdbtime = await MessageModel.dbtime()
				if (vuechartData.length === 0) {
					await vuechartData.push(chartdbtime)
				}
				this.BarChartData = {
					labels: ['学習時間'],
					datasets: [
						{
							label: ['学習時間'],
							data: vuechartData,
							backgroundColor: ['rgba(54, 162, 235, 0.2)'],
							borderColor: ['rgba(54, 162, 235, 1)'],
						},
					]
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
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 1000,
                  stepSize: 100,
                  callback(label, index, labels) {
                    return label + ' h'
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label(tooltipItem, data) {
                return tooltipItem.yLabel + ' h'
              }
            }
          }
        }
			},
			async fetchMessages() {
				let messages = []
				try {
					messages = await MessageModel.fetchMessages()
				} catch (error) {
					alert(error.message)
				}

				return messages
			},
			async totalTime() {
				let times = 0
				try {
					times += await MessageModel.dbtime()
				} catch (error) {
					alert(error.message)
				}

				return times
			},
			async getChart() {
				const vuechartData = []
				const chartdbtime = await MessageModel.dbtime()
				try {
					if (vuechartData.length === 0) {
						await vuechartData.push(chartdbtime)
					}
				} catch (error) {
					console.error(error.message)
				}

				return vuechartData
			}
		}
	}
</script>

<style scoped>
	.no-messages {
		text-align: center;
	}
	.container {
		max-width: 1300px;
		margin: 0 auto;
	}
</style>
