<template>
	<v-card class="message">
		<div class="d-flex justify-space-between">
			<div class="d-flex">
				<p class="message-text mb-0 mr-3">
{{ time }}時間
</p>
				<v-chip v-for="(tags, index) in tag" :key="index" color="primary" class="mr-1">
					<v-icon left>
mdi-check-outline
</v-icon>
					{{ tags }}
				</v-chip>
			</div>
			<Button :on-click="clear" color="success">
				<v-icon> mdi-trash-can-outline </v-icon>
			</Button>
		</div>

		<p class="message-text mb-0">
			{{ body }}
		</p>
		<div class="message-date">
			{{ date }}
		</div>
	</v-card>
</template>

<script>
	import MessageModel from '../models/Message';
	import { dbMessages } from '../plugins/firebase';
	import Button from './Button';

	export default {
		components: {
			Button
		},
		props: {
			time: {
				type: Number,
				required: true
			},
			body: {
				type: String,
				required: true
			},
			date: {
				type: String,
				required: true
			},
			tag: {
				type: Array,
				required: true
			},
			// ここから削除機能
			// onClick: {
			// 	type: Function,
			// 	required: true
			// },
			// onTime: {
			// 	type: Function,
			// 	required: true
			// },
			// onChart: {
			// 	type: Function,
			// 	required: true
			// },
			i: {
				type: Number,
				required: true
			}
		},
		methods: {
			async clear() {
				try {
					const id = this.i;
					const docId = await MessageModel.clear();

					console.log(id);
					console.log(docId);

					if (docId === []) {
						alert('削除できるデータがありません');
					} else if (docId !== []) {
						await dbMessages.doc(docId[id]).delete();
					}
					// await MessageModel.fetchMessages();
					this.$emit('clear');
				} catch (error) {
					console.error(error);
				}
			}
		}
	};
</script>

<style scoped>
	.message {
		min-height: 30px;
		padding: 10px;
		margin: 0 5vw 2vw;
	}
	.message:hover {
		background-color: #eee;
	}
	.message-date {
		font-size: 0.8em;
		color: #777;
		text-align: right;
	}
</style>
