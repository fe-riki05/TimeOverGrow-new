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
					<v-combobox v-model.trim="select" multiple label="Tags" append-icon chips deletable-chips></v-combobox>
				</div>
				<!-- <div>
					<ButtonDelete
					title="削除"
					:on-delete="clear"
					:on-chart="chart"
					:clickable="canPost"
					/>
				</div> -->
			</div>
			<v-textarea
				v-model.trim="body"
				class="textbox-area"
				label="JavaScriptの非同期処理(async,await)について学びました。"
				flat
				auto-grow
				outlined
				rows="1"
				row-height="100"
			></v-textarea>
			<div class="button">
				<AddButton title="今日の学習内容送信！！！" :on-add="add" :clickable="canPost" />
			</div>
		</client-only>
	</div>
</template>

<script>
	import MessageModel from '../models/Message'
	import AddButton from './AddButton'
	// import ButtonDelete from './ButtonDelete'

	export default {
		components: {
			AddButton
			// ButtonDelete
		},
		props: {
			// onDelete: {
			// 	type: Function,
			// 	required: true
			// },
			onAdd: {
				type: Function,
				required: true
			}
		},
		data() {
			return {
				time: '',
				body: '',
				canPost: true,
				select: []
			}
		},
		methods: {
			// updateTags() {
			// 	this.$nextTick(() => {
			// 		this.select.push(...this.search.split(","));
			// 		this.$nextTick(() => {
			// 			this.search = "";
			// 		});
			// 	});
			// },
			// async clear() {
			// 	this.canPost = false
			// 	try {
			// 		const message = await MessageModel.clear()
			// 		this.onDelete(message)
			// 	} catch (error) {
			// 		console.error(error.message)
			// 	}
			// 	this.canPost = true
			// },
			async add() {
				this.canPost = false
				try {
					const message = await MessageModel.save({
						time: Number(this.time),
						body: this.body,
						tag: this.select
					})

					this.onAdd(message)

					this.time = 0
					this.body = ''
					this.select = ''
				} catch (error) {
					alert(error.message)
				}
				this.canPost = true
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
