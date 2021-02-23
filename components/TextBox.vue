<template>
	<!-- eslint-disable -->
	<div class="textbox-container">
		<client-only>
			<div class="d-flex justify-space-between">
				<div>
					<p>今日のアウトプット内容</p>
					<input :value="time" class="textbox-input" type="number" max="24" min="0" placeholder="3" />
					時間
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
			<v-textarea
				v-model.trim="body"
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
		</client-only>
	</div>
</template>

<script>
	import MessageModel from '../models/Message';
	import TagModel from '../models/Tag';
	import firebase, { dbTags } from '../plugins/firebase';
	import Button from './Button';

	export default {
		components: {
			Button
		},
		props: {
			onClick: {
				type: Function,
				required: true
			},
			value: {
				type: Number,
				default: 0
			}
			// editId: {
			// 	type: Function,
			// 	required: true
			// }
		},
		data() {
			return {
				// edittime: this.time,
				// time: '',
				body: '',
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
				y: 0
			};
		},
		computed: {
			time: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				}
			}
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
			// updateTime() {
			// 	this.$emit('updateTime', this.value);
			// },
			// updateTags() {
			// 	this.$nextTick(() => {
			// 		this.select.push(...this.search.split(","));
			// 		this.$nextTick(() => {
			// 			this.search = "";
			// 		});
			// 	});
			// },
			async add() {
				this.canPost = false;
				try {
					const uid = firebase.auth().currentUser.uid;
					this.select.forEach(async element => {
						const params = Object.assign(element, { uid: uid });
						// console.log(params.text);
						// console.log(this.select);
						// if (dbTags.where('color', '==', params.color).where('text', '==', params.text)) {
						// 	return;
						// }
						await dbTags.add(params);
					});
					const message = await MessageModel.save({
						time: Number(this.time),
						body: this.body,
						tag: this.select
					});
					this.onClick(message);
					// this.time = '';
					this.body = '';
					this.select = '';
				} catch (error) {
					alert(error.message);
				}
				this.canPost = true;
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
