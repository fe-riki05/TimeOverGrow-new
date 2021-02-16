<template>
	<!-- eslint-disable -->
	<div class="textbox-container">
		<client-only>
			<div class="d-flex justify-space-between">
				<div>
					<p>今日のアウトプット内容</p>
					<input v-model.trim="time" class="textbox-input" type="number" max="24" min="0" step="0.5" placeholder="3" />
					時間
					<!-- <v-combobox v-model.trim="select" multiple label="Tags" append-icon chips deletable-chips /> -->
					<v-container fluid class="pl-0">
						<v-combobox
							v-model="select"
							multiple
							outlined
							:filter="filter"
							:hide-no-data="!search"
							:items="items"
							:search-input.sync="search"
							hide-selected
							label="タグを入力してください。"
							multiple
							small-chips
							solo
						>
							<template #no-data>
								<v-list-item>
									<span class="subheading">制作</span>
									<v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
										{{ search }}
									</v-chip>
								</v-list-item>
							</template>
							<template #selection="{ attrs, item, parent, selected }">
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
							<template #item="{ index, item }">
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
				<Button :on-click="add">
					<v-icon color="success"> mdi-send </v-icon>
				</Button>
			</div>
		</client-only>
	</div>
</template>

<script>
	import firebase from '../plugins/firebase';
	import { dbMessages } from '../plugins/firebase';
	import MessageModel from '../models/Message';
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
				time: '',
				body: '',
				canPost: true,
				// tag: {},
				select: [],
				activator: null,
				attach: null,
				colors: ['purple', 'indigo', 'blue', 'green', 'red', 'orange'],
				editing: null,
				index: -1,
				items: [
					{ header: 'タグを選択するか作成して下さい。' },
					{
						color: [],
						text: []
					}
					// {
					// 	color: 'purple',
					// 	text: 'HTML'
					// },
					// {
					// 	color: 'indigo',
					// 	text: 'CSS'
					// },
					// {
					// 	color: 'blue',
					// 	text: 'JavaScript'
					// },
					// {
					// 	color: 'green',
					// 	text: 'Vue.js'
					// },
					// {
					// 	color: 'red',
					// 	text: 'React.js'
					// },
					// {
					// 	color: 'orange',
					// 	text: 'TypeScript'
					// }
				],
				nonce: 1,
				menu: false,
				// model: [
				// 	{
				// 		text: 'Foo',
				// 		color: 'blue'
				// 	}
				// ],
				x: 0,
				search: null,
				y: 0
			};
		},
		watch: {
			model(val, prev) {
				if (val.length === prev.length) return;

				this.model = val.map(v => {
					if (typeof v === 'string') {
						v = {
							text: v,
							color: this.colors[this.nonce - 1]
						};
						this.items.push(v);
						this.nonce++;
					}

					return v;
				});
			}
		},
		async created() {
			try {
				const color = [];
				const uid = firebase.auth().currentUser.uid;
				const snapShot = await dbMessages.where('uid', '==', uid).get();
				console.log(snapShot.docs);
				dbMessages.forEach(doc => {
					color.push(doc.data().tag.color);
					// this.item[1].text.push(doc.data().tag.text);
				});
			} catch (error) {
				console.error(error);
			}
			console.log(this.items[1]);
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
				this.canPost = false;

				console.log(this.select);

				try {
					const message = await MessageModel.save({
						time: Number(this.time),
						body: this.body,
						tag: this.select
					});
					this.onClick(message);
					this.time = 0;
					this.body = '';
					this.select = '';
				} catch (error) {
					alert(error.message);
				}
				this.canPost = true;
			},
			edit(index, item) {
				if (!this.editing) {
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
		padding: 0;
		border: 1px solid rgb(161, 161, 161);
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
	}
</style>
