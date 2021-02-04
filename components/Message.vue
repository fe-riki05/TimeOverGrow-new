<template>
	<v-card class="message">
		<div class="d-flex justify-space-between">
			<div class="d-flex">
				<p class="message-text mb-0 mr-3">{{ time }}時間</p>
				<v-chip
					v-for="(tags, index) in tag" :key="index"
					color="primary"
					class="mr-1"
				>
					<v-icon left>mdi-check-outline</v-icon>
					{{ tags }}
				</v-chip>
			</div>
			<v-btn
				color="success"
				@click="onDelete()"
			>
				<v-icon>
					mdi-trash-can-outline
				</v-icon>
			</v-btn>
		</div>

		<p class="message-text mb-0">{{ body }}</p>
		<div class="message-date">{{ date }}</div>
	</v-card>
</template>

<script>
import firebase, { dbMessages , auth } from '../plugins/firebase'
import MessageModel from '../models/Message'



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
			i: {
      type: Number,
      required: true
    	}
		},
		methods: {
			// async getIndex(delateId) {
			// 	this.delateId = await this.message[this.i].id
			// },
			async onDelete() {
				try {
					// const uid = await auth().currentUser.uid
					// const id = await (await dbMessages.where('uid', '==', uid).get()).docs[this.i].id
					// const collection = await dbMessages.where('uid', '==', uid).orderBy('date').get()
					const id = this.i


					console.log(await MessageModel.clear()[id]);
					// console.log(collection);
					// console.log(uid);
					// console.log(id);
					console.log(id);

				} catch (error) {
					console.error(error)
				}
			}
		}
	}
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
