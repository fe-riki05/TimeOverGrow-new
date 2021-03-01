<template>
	<!-- eslint-disable -->
	<div class="textbox-container">
		<!-- <client-only> -->
		<div class="d-flex justify-space-between">
			<div>
				<p>今日のアウトプット内容</p>
				<!-- tag事の学習時間を記入 -->
				<div class="text-center">
					<v-dialog v-model="dialog" width="500">
						<v-card>
							<v-card-title class="headline grey lighten-2"> 学習時間を記入して下さい。 </v-card-title>
							<input v-model="tagTimes" class="textbox-input" type="number" max="24" min="0" placeholder="3" />
							時間
							<v-card-text> </v-card-text>
							<v-divider></v-divider>
							<v-card-actions>
								<v-spacer></v-spacer>
								<Button color="primary" text :on-click="tagTime">決定</Button>
								<!-- <v-btn color="primary" text @click="dialog = false"> 決定 </v-btn> -->
							</v-card-actions>
						</v-card>
					</v-dialog>
				</div>

				<v-container fluid class="pl-0">
					<v-combobox
						v-model="select"
						:filter="filter"
						:hide-no-data="!search"
						:items="items"
						:search-input.sync="search"
						label="タグを入力してください。"
						hide-selected
						outlined
						append-icon
						chips
						deletable-chips
						multiple
						small-chips
						solo
					>
						<template v-slot:no-data>
							<v-list-item>
								<span class="subheading">制作</span>
								<v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
									{{ search }}
								</v-chip>
							</v-list-item>
						</template>
						<template v-slot:selection="{ attrs, item, parent, selected }">
							<v-chip
								v-if="item === Object(item)"
								v-bind="attrs"
								:color="`${item.color} lighten-3`"
								:input-value="selected"
								label
								small
							>
								<span class="pr-2">
									{{ item.text }}
								</span>
								<v-icon small @click="parent.selectItem(item)">mdi-close</v-icon>
							</v-chip>
						</template>
						<template v-slot:item="{ index, item }">
							<v-text-field
								v-if="editing === item"
								v-model="editing.text"
								autofocus
								flat
								background-color="transparent"
								hide-details
								solo
								@keyup.enter="edit(index, item)"
							></v-text-field>
							<v-chip v-else :color="`${item.color} lighten-3`" dark label small>
								{{ item.text }}
							</v-chip>
							<v-spacer></v-spacer>
							<v-list-item-action @click.stop>
								<v-btn icon @click.stop.prevent="edit(index, item)">
									<v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
								</v-btn>
							</v-list-item-action>
						</template>
					</v-combobox>
				</v-container>
			</div>
		</div>
		<!-- <DialogTime @dialog="dialog = false" /> -->
		<v-textarea
			v-model.trim="bodys"
			class="textbox-area"
			label="JSの非同期処理(async,await)について学びました。"
			flat
			auto-grow
			outlined
			rows="1"
			row-height="100"
			max-width="100px"
		/>
		<div class="button">
			<Button :on-click.stop="add">
				<v-icon color="#70c2fd"> mdi-send </v-icon>
				<slot />
			</Button>
		</div>
		<!-- </client-only> -->
	</div>
</template>

<script>
	import MessageModel from '../models/Message';
	import TagModel from '../models/Tag';
	import firebase, { dbTags } from '../plugins/firebase';
	import Button from './Button';
	// import DialogTime from './DialogTime';

	export default {
		components: {
			Button
			// DialogTime
		},
		props: {
			onClick: {
				type: Function,
				required: true
			}
		},
		data() {
			return {
				times: 0,
				bodys: '',
				tagTimes: 0,
				totalTagTime: 0,
				canPost: true,
				activator: null,
				attach: null,
				colors: ['blue', 'orange', 'cyan', 'purple', 'indigo', 'green', 'red', 'teal', 'lime', 'navy'],
				editing: null,
				index: -1,
				items: [{ header: 'タグを選択するか作成して下さい。' }],
				nonce: 1,
				menu: false,
				select: [],
				x: 0,
				search: null,
				y: 0,
				dialog: false
			};
		},
		watch: {
			select(val, prev) {
				if (val.length === prev.length) return;
				this.select = Array.prototype.map.call(Object(val), value => {
					if (typeof value === 'string') {
						value = {
							color: this.colors[this.nonce - 1],
							text: value
						};
						this.items.push(value);
						this.nonce++;
					}
					// ここでtag事の学習時間をdialogで入力させることができたらいいかも
					this.dialogTime();
					return value;
				});
			}
		},
		async created() {
			try {
				const tags = await TagModel.get();
				this.items = tags;
			} catch (error) {
				console.error(error);
			}
		},
		methods: {
			async add() {
				this.canPost = false;
				try {
					const uid = firebase.auth().currentUser.uid;
					this.select.forEach(async element => {
						const params = Object.assign(element, { uid: uid });
						// console.log(params);
						const TagSame = await dbTags.where('text', '==', params.text).get();
						if (TagSame.docs) {
							let Tag = [];
							TagSame.docs.forEach(e => {
								Tag = [];
								Tag.push(e.id);
							});
							// console.log(await dbTags.doc(Tag[0]).get());
							// console.log(element.time);
							// console.log(TagSame.docs);

							await dbTags.doc(Tag[0]).set({
								color: params.color,
								text: params.text,
								time: params.time,
								uid: params.uid
							});
						}
						// console.log(params);
					});
					// ここで各tagの学習時間を集計。
					// let tagTime = 0;
					// console.log(this.select);
					// this.select.forEach(e => {
					// 	console.log(e.time);
					// 	tagTime += e.time;
					// });
					// this.times = tagTime;
					const message = await MessageModel.save({
						times: Number(this.times),
						bodys: this.bodys,
						tags: this.select
					});
					this.onClick(message);
					this.times = 0;
					this.bodys = '';
					this.select = '';
				} catch (error) {
					alert(error.message);
				}
				this.canPost = true;
			},
			dialogTime() {
				this.dialog = true;
			},
			// dialog内の決定ボタンで発火
			tagTime() {
				this.dialog = false;
				// もしdbTag内にtime値があれば足していく処理。
				if (this.select[this.select.length - 1].time) {
					console.log('足していく。');
					console.log(this.select);
					console.log(this.select[this.select.length - 1].time);
					console.log(Number(this.tagTimes));

					this.select[this.select.length - 1].time += Number(this.tagTimes);
				} else {
					Object.assign(this.select[this.select.length - 1], { time: Number(this.tagTimes) });
				}

				// let tagTime = 0;
				console.log(this.select);
				console.log(Number(this.tagTimes));
				this.times += Number(this.tagTimes);
				// console.log(tagTime);
				console.log(this.times);
				this.tagTimes = 0;
			},
			async edit(index, item) {
				if (!this.editing) {
					// ここで編集前のデータ削除
					const editBefore = await dbTags.where('text', '==', item.text).get();
					editBefore.docs.forEach(doc => {
						dbTags.doc(doc.id).delete();
					});
					this.editing = item;
					this.index = index;
				} else {
					this.editing = null;
					this.index = -1;
				}
			},
			filter(item, queryText, itemText) {
				if (item.header) return false;

				const hasValue = val => (val != null ? val : '');

				const text = hasValue(itemText);
				const query = hasValue(queryText);

				return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
			}
		}
	};
</script>

<style scoped>
	.textbox-input {
		margin: 0;
		padding: 3px 10px;
		border: 1px solid rgb(161, 161, 161);
		-webkit-appearance: none;
	}
	p {
		font-weight: 900;
		font-size: 25px;
	}
	.textbox-area {
		max-width: 80%;
		resize: none;
		background: white;
		border-radius: 5px;
		padding: 0;
		margin: 0;
	}
	.button {
		margin-right: 50px;
		text-align: right;
		padding: 10px;
		color: #70c2fd;
	}
</style>
