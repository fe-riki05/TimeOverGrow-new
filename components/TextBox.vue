<template>
	<!-- eslint-disable -->
	<v-app class="ma-0">
		<div class="textbox-container">
			<div class="d-flex justify-space-between">
				<div>
					<p>今日のアウトプット内容</p>
					<!-- tag事の学習時間を記入 -->
					<div class="text-center">
						<v-dialog v-model="dialog" width="500">
							<v-card>
								<v-card-title class="headline grey lighten-2"> 学習時間を記入して下さい。 </v-card-title>
								<input
									v-model="tagTimes"
									class="textbox-input ml-4 mt-4"
									type="number"
									max="24"
									min="0"
									placeholder="3"
								/>
								時間
								<v-card-text> </v-card-text>
								<v-divider></v-divider>
								<v-card-actions>
									<v-spacer></v-spacer>
									<Button color="primary" text :on-click="tagTime">決定</Button>
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
							<template v-slot:no-data class="tagcolor">
								<v-list-item>
									<span class="subheading">制作</span>
									<v-chip color="tagcolor" label small>
										{{ search }}
									</v-chip>
								</v-list-item>
							</template>
							<template v-slot:selection="{ attrs, item, parent, selected }">
								<v-chip
									v-if="item === Object(item)"
									v-bind="attrs"
									:input-value="selected"
									label
									small
									color="tagcolor"
								>
									<span class="pr-2 tagcolor">
										{{ item.text }}
									</span>
									<v-icon
										small
										@click="
											parent.selectItem(item);
											close(item);
										"
										>mdi-close</v-icon
									>
								</v-chip>
							</template>
							<template v-slot:item="{ index, item }" class="tagcolor">
								<v-text-field
									v-if="editing === item"
									v-model="editing.text"
									autofocus
									flat
									hide-details
									solo
									@keyup.enter="edit(index, item)"
								></v-text-field>
								<v-chip v-else label small class="tagcolor">
									<span class="tagcolor pa-0 d-block">{{ item.text }}</span>
								</v-chip>
								<v-spacer></v-spacer>
								<v-list-item-action @click.stop>
									<div class="d-flex">
										<v-btn icon @click.stop.prevent="edit(index, item)">
											<v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
										</v-btn>
									</div>
								</v-list-item-action>
							</template>
						</v-combobox>
					</v-container>
				</div>
			</div>
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
		</div>
	</v-app>
</template>

<script>
	import MessageModel from '../models/Message';
	import TagModel from '../models/Tag';
	import firebase, { dbTags } from '../plugins/firebase';
	// import func from '../vue-temp/vue-editor-bridge';
	import Button from './Button';

	export default {
		components: {
			Button
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
				canPost: true,
				activator: null,
				attach: null,
				editing: null,
				index: -1,
				items: [{ header: 'タグを選択するか作成して下さい。' }],
				menu: false,
				select: [],
				dbMessagesTags: [],
				search: null,
				dialog: false
			};
		},
		watch: {
			select(val, prev) {
				if (val.length === prev.length) return;
				this.select = Array.prototype.map.call(Object(val), value => {
					if (typeof value === 'string') {
						value = {
							text: value
						};
						this.items.push(value);
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
					const message = await MessageModel.save({
						times: parseInt(this.times),
						bodys: this.bodys,
						tags: this.dbMessagesTags
					});

					// dbTagsへの保存処理。
					const uid = firebase.auth().currentUser.uid;

					const newSelect = JSON.parse(JSON.stringify(this.select));
					this.select = newSelect;

					this.select.forEach(async element => {
						const params = Object.assign(element, { uid: uid });
						const TagSame = await dbTags.where('text', '==', params.text).get();
						if (TagSame.docs) {
							let Tag = [];
							TagSame.docs.forEach(e => {
								Tag = [];
								Tag.push(e.id);
							});

							let TagData = await (await dbTags.doc(Tag[0]).get()).data();
							// let TagTime = TagData.data();
							if (TagData === undefined) {
								TagData = [];
							}
							let dbMessagesTagTime = TagSame.docs.map(doc => {
								return doc.data();
							});

							console.log(dbMessagesTagTime);

							if (dbMessagesTagTime.length !== 0) {
								params.time += await dbMessagesTagTime[0].time;
							}

							await dbTags.doc(Tag[0]).set({
								text: params.text,
								time: params.time,
								uid: params.uid
							});
						}
					});

					this.onClick(message);
					this.times = 0;
					this.bodys = '';
					this.select = '';
					this.dbMessagesTags = [];
				} catch (error) {
					alert(error.message);
				}
				this.canPost = true;
			},
			close(item) {
				this.times -= item.time;
			},
			dialogTime() {
				this.dialog = true;
			},
			// dialog内の決定ボタンで発火
			async tagTime() {
				this.dialog = false;
				const uid = firebase.auth().currentUser.uid;

				Object.assign(this.select[this.select.length - 1], { time: parseInt(this.tagTimes) }, { uid: uid });

				Object.assign(this.dbMessagesTags, {
					tags: this.select[this.select.length - 1],
					uid: uid
				});
				this.select[this.select.length - 1] = JSON.parse(JSON.stringify(this.select[this.select.length - 1]));

				this.dbMessagesTags.push(this.select[this.select.length - 1]);

				this.dbMessagesTags = this.dbMessagesTags.filter((item, index, array) => {
					return array.findIndex(nextItem => item.text === nextItem.text) === index;
				});

				this.dbMessagesTags[this.dbMessagesTags.length - 1] = JSON.parse(
					JSON.stringify(this.dbMessagesTags[this.dbMessagesTags.length - 1])
				);

				// 合計値を格納
				this.times += parseInt(this.tagTimes);

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
	.tagcolor,
	.theme--light.v-chip:not(.v-chip--active) {
		background: #a8ff78; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #78ffd6, #a8ff78); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#78ffd6,
			#a8ff78
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	.v-card > *:last-child:not(.v-btn):not(.v-chip) {
		margin: 0;
	}
</style>
