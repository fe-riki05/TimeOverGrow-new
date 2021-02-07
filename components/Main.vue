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
			<TextBox :on-add="add" class="container" />
			<Spinner v-if="!initialLoaded" class="container" />
			<p v-else-if="initialLoaded && messages.length === 0" class="no-messages">毎日の積み上げ0件</p>
			<MessageList :messages="reversedMessages" class="container" />
		</client-only>
	</div>
</template>

<script>
	import MessageModel from '../models/Message'
	// import { dbMessages } from '../plugins/firebase'
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
				vuechartData: [0],
				// BarChartData: {},
				options: {},
				times: 0,
				initialLoaded: false,
				BarChartData: {
					labels: ['学習時間'],
					datasets: [
						{
							label: ['学習時間'],
							data: [0],
							backgroundColor: ['rgba(54, 162, 235, 0.2)'],
							borderColor: ['rgba(54, 162, 235, 1)'],
						},
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
			}
		},
		computed: {
			reversedMessages() {
				return this.messages.slice().reverse()
			}
		},
		// async mounted() {
		// 	await this.add(this.message)
		// },
		async created() {
			const messages = await this.fetchMessages()
			const times = await this.totalTime()
			const vuechartData = await this.getChart()


			this.messages = messages
			this.times = times
			this.vuechartData[0] = vuechartData[0]
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
			add(message) {
				this.messages.push(message)
				this.times += message.time
				this.BarChartData.datasets[0].data[0] += message.time
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
					times += await MessageModel.dbtime()
					return times
				} catch (error) {
					alert(error.message)
				}
			},
			async getChart() {
				try {
					const time = await MessageModel.dbtime()
					this.BarChartData.datasets[0].data[0] += await time
				} catch (error) {
					console.error(error.message)
				}

				return this.BarChartData.datasets[0].data[0]
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
