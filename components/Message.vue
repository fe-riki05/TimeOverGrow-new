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
			}
		},
		methods: {
			// getIndex(index) {
			// 	this.deleteId = this.tag[index].id
			// },
			async onDelete(deleteId) {
				try {
					const uid = await auth().currentUser.uid
					const collection = await dbMessages.where('uid', '==', uid).get()
					
					console.log(uid);
					console.log(collection);

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
