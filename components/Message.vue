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
				<Button small class="color btn ml-2" :on-click="edit">
					<v-icon> mdi-lead-pencil </v-icon>
				</Button>
				<Button :on-click="clear" class="color btn ml-2">
					<v-icon> mdi-trash-can-outline </v-icon>
				</Button>
			</div>
		</div>
		<p class="message-text mb-0 mr-3">
			<span>今日の学習時間は</span><span style="text-decoration: underline">{{ times }}時間</span>
		</p>
		<p class="message-text mb-0">
			{{ bodys }}
		</p>
		<div class="message-date">
			{{ date }}
		</div>
	</v-card>
</template>

<script>
	import MessageModel from '../models/Message';
	import firebase, { dbMessages, dbTags } from '../plugins/firebase';
	import Button from './Button';

	export default {
		components: {
			Button
		},
		props: {
			times: {
				type: Number,
				required: true
			},
			bodys: {
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
			async clear() {
				try {
					const id = this.i;
					const docIds = await MessageModel.clear();

					const Data = await dbMessages.doc(docIds[id]).get();
					console.log(Data.data().tags);

					Data.data().tags.map(async Element => {
						Element = JSON.parse(JSON.stringify(Element));

						const uid = firebase.auth().currentUser.uid;
						const sameTagText = await dbTags.where('uid', '==', uid).where('text', '==', Element.text).get();
						sameTagText.docs.map(async doc => {
							// クリックした箇所の元々のdataとid
							let sameTagTime = doc.data().time;
							sameTagTime -= Element.time;

							if (sameTagTime <= 0) {
								await dbTags.doc(doc.id).delete();
							} else {
								await dbTags.doc(doc.id).update({
									time: sameTagTime
								});
							}

							return doc.id, doc.data();
						});
					});

					await dbMessages.doc(docIds[id]).delete();
					this.$emit('clear');
				} catch (error) {
					console.error(error);
				}
			},
			async edit() {
				const id = this.i;
				const docIds = await MessageModel.clear();
				const docId = dbMessages.doc(docIds[id]).id;
				this.$emit('edit', docId);
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
	.message-date {
		font-size: 0.8em;
		color: #777;
		text-align: right;
	}
</style>
