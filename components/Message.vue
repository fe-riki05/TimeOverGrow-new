<template>
	<v-card class="message">
		<div class="d-flex justify-space-between">
			<div class="d-flex">
<<<<<<< HEAD
				<p class="message-text mb-0 mr-3">{{ time }}時間</p>
				<v-chip v-for="(tags, index) in tag" :key="index" color="primary" class="mr-1">
					<v-icon left> mdi-check-outline </v-icon>
=======
				<p class="message-text mb-0 mr-3">
{{ time }}時間
</p>
				<v-chip
					v-for="(tags, index) in tag"
					:key="index"
					color="primary"
					class="mr-1"
				>
					<v-icon left>
mdi-check-outline
</v-icon>
>>>>>>> ca57608e26590f317a528f326b62ecf182f82cb2
					{{ tags }}
				</v-chip>
			</div>
			<v-btn color="success" @click="onDelete()">
<<<<<<< HEAD
				<v-icon> mdi-trash-can-outline </v-icon>
=======
				<v-icon>mdi-trash-can-outline</v-icon>
>>>>>>> ca57608e26590f317a528f326b62ecf182f82cb2
			</v-btn>
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
<<<<<<< HEAD
	// import firebase, { dbMessages , auth } from '../plugins/firebase'
	// import MessageModel from '../models/Message'
=======
	import { dbMessages } from '../plugins/firebase';
	import MessageModel from '../models/Message';

>>>>>>> ca57608e26590f317a528f326b62ecf182f82cb2

	export default {
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
			// onDelete: {
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
<<<<<<< HEAD
			// async onDelete() {
			// 	try {
			// 		const id = this.i
			// 		const docId = await MessageModel.clear()
			// 		if(docId === []) {
			// 			alert('削除できるデータがありません')
			// 		}
			// 		await dbMessages.doc(docId[id]).delete()
			// 		console.log(await MessageModel.dbtime());
			// 		this.$emit('reload');
			// 	} catch (error) {
			// 		console.error(error)
			// 	}
			// }
=======
			async onDelete() {
				try {
					const id = this.i;
					const docId = await MessageModel.clear();
					if (docId === []) {
						alert('削除できるデータがありません');
					}
					await dbMessages.doc(docId[id]).delete();
					console.log(await MessageModel.dbtime());
				} catch (error) {
					console.error(error);
				}
			}
>>>>>>> ca57608e26590f317a528f326b62ecf182f82cb2
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
