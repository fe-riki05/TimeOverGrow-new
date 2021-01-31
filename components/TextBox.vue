<template>
	<div class="textbox-container">
		<client-only>
			<div class="d-flex justify-space-between">
				<div>
					<input
						v-model.trim="time"
						class="textbox-input"
						type="number"
						max="24"
						min="0.25"
						step="0.25"
						placeholder="3"
					/>時間
					<p>今日のアウトプット内容</p>
				</div>
				<div>
					<ButtonDelete
					title="削除"
					:on-delete="clear"
					:on-chart="chart"
					:clickable="canPost"
					/>
				</div>
			</div>
			<v-textarea
				v-model.trim="body"
				class="textbox-area"
				label="JavaScriptの非同期処理について学んだが、まだまだ理解不足なのでクイズアプリの実装を通して学んでいきたい。"
				flat
				auto-grow
				outlined
				rows="1"
				row-height="100"
			></v-textarea>
			<div class="button">
				<ButtonPost
					title="今日の学習内容送信！！！"
					:on-click="post"
					:on-get="get"
					:on-chart="chart"
					:clickable="canPost"
				/>
			</div>
		</client-only>
	</div>
</template>

<script>
	import MessageModel from '../models/Message'
	import ButtonPost from './ButtonPost'
	import ButtonDelete from './ButtonDelete'


	export default {
		components: {
			ButtonPost,
			ButtonDelete
		},
		props: {
			onDelete: {
				type: Function,
				required: true
			},
			onPost: {
				type: Function,
				required: true
			},
			onGet: {
				type: Function,
				required: true
			},
			onChart: {
				type: Function,
				required: true
			}
		},
		data() {
			return {
				time: 0,
				body: '',
				canPost: true
			}
		},
		methods: {
			async clear() {
				this.canPost = false
				try {
					const message = await MessageModel.clear()
					this.onDelete(message)
				} catch (error) {
					console.error(error.message)
				}
				this.canPost = true
			},
			async post() {
				this.canPost = false
				try {
					const message = await MessageModel.save({
						time: Number(this.time),
						body: this.body
					})
					this.onPost(message)
					this.time = 0
					this.body = ''
				} catch (error) {
					alert(error.message)
				}
				this.canPost = true
			},
			async get() {
				let times = 0
				try {
					times += await MessageModel.dbtime()
					this.onGet(times)
				} catch (error) {
					console.error(error.message)
				}

				return times
			},

			async chart() {
				const vuechartData = []
				const chartdbtime = await MessageModel.dbtime()
				try {
					if (vuechartData.length === 0) {
						vuechartData.push(chartdbtime)
					}
					this.onChart(vuechartData[0])
				} catch (error) {
					console.error(error.message)
				}
				return vuechartData[0]
			}
		}
	}
</script>

<style scoped>
	.textbox-input {
		margin: 1vw;
		border: 1px solid rgb(161, 161, 161);
	}
	p {
		font-weight: 900;
	}
	.textbox-area {
		width: 100%;
		resize: none;
		background: white;
		border-radius: 5px;
		padding: 0;
	}
	.button {
		margin: 10px 0px 10px 10px;
		text-align: right;
	}
</style>
