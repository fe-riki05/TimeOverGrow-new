<template>
	<v-card :elevation="10" class="message mt-5 p-5">
		<div class="d-flex justify-space-between" style="margin: 0 auto">
			<div>
				<v-chip
					v-for="(tags, index) in tag"
					:key="index"
					outlined
					label
					class="tag color ml-3 mb-3"
					style="min-width: 80px"
				>
					<v-icon left class="color"> mdi-check-outline </v-icon>
					<span>{{ tags.text }}</span>
				</v-chip>
			</div>
			<div class="d-flex">
				<Button :on-click="edit" small class="color btn ml-2">
					<v-icon> mdi-lead-pencil </v-icon>
				</Button>
				<Button :on-click="clear" class="color btn ml-2">
					<v-icon> mdi-trash-can-outline </v-icon>
				</Button>
			</div>
		</div>

		<p class="message-text mb-0 mr-3">
			<span>今日の学習時間は</span><span style="text-decoration: underline">{{ time }}時間</span>
		</p>
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
				type: Object,
				required: true
			},
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
					await dbMessages.doc(docId[id]).delete();
					this.$emit('clear');
				} catch (error) {
					console.error(error);
				}
			},
			edit() {
				this.$emit('edit');
			}
		}
	};
</script>

<style scoped>
	.tag {
		background: #fff;
		min-width: 80px;
	}
	.color {
		color: #70c2fd;
	}
	.btn {
		color: #70c2fd;
	}
	.btn:hover {
		color: #0095ff;
	}
	.message {
		min-height: 30px;
		padding: 20px;
		margin: 0;
	}
	/* .message:hover {
		background-color: #eee;
	} */
	.message-date {
		font-size: 0.8em;
		color: #777;
		text-align: right;
	}
</style>
