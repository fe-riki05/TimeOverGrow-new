<template>
  <v-app class="ma-0">
    <h2>今日のアウトプット内容</h2>
    <p class="pt-3">編集前データ</p>
    <v-chip v-for="(editBeforeDatas, index) in editBeforeData" :key="index" outlined label class="tag color ml-3 mb-3">
      <v-icon left> mdi-check </v-icon>
      <span>
        {{ editBeforeDatas.text }} が {{ Math.floor(editBeforeDatas.time / 60) }} 時間
        {{ editBeforeDatas.time - Math.floor(editBeforeDatas.time / 60) * 60 }}
        分
      </span>
    </v-chip>
    <v-container fluid class="px-0 mt-3">
      <v-combobox
        v-model="updatedSelect"
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
            <v-chip color="tagcolor" label small>
              {{ search }}
            </v-chip>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attrs, item, parent, selected }">
          <v-chip v-if="item === Object(item)" v-bind="attrs" color="tagcolor" :input-value="selected" label small>
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
          <v-chip v-else color="tagcolor" label small>
            {{ item.text }}
          </v-chip>
          <v-spacer></v-spacer>
          <v-list-item-action @click.stop>
            <div class="d-flex">
              <v-btn icon @click.stop.prevent="edit(index, item)" class="field">
                <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
              </v-btn>
              <v-btn icon @click="tagDelete(index, item)" class="field ml-2">
                <v-icon> mdi-trash-can-outline </v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </template>
      </v-combobox>
    </v-container>
    <v-dialog v-model="EditDialog" width="500">
      <v-card class="pa-5">
        <v-card-title class="headline px-2 text-center"> 学習時間を記入して下さい。 </v-card-title>
        <input
          v-model="hoursTimes"
          class="textbox-input mt-4"
          type="number"
          step="1"
          max="24"
          min="0"
          placeholder="0"
        />
        <span style="color: #70c2fd">時間</span>
        <input
          v-model="minutesTimes"
          class="textbox-input mt-4"
          type="number"
          step="10"
          max="60"
          min="0"
          placeholder="0"
        />
        <span style="color: #70c2fd">分</span>
        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <Button class="ma-0" text :on-click="tagTime">決定</Button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-textarea
      v-model="updatedBody"
      class="textbox-area"
      label="JSの非同期処理(async,await)について学びました。"
      flat
      auto-grow
      outlined
      rows="1"
      row-height="100"
    />
    <div class="d-flex button ma-0 pa-0">
      <Button :on-click="back">
        <v-icon> mdi-arrow-left-bold-box </v-icon>
        <v-icon color="#6cb4e4" class="pl-1 body-1"> 戻る </v-icon>
      </Button>
      <v-spacer></v-spacer>
      <Button :on-click="update">
        <v-icon color="#70c2fd"> mdi-send </v-icon>
        <v-icon color="#6cb4e4" class="pl-1 body-1"> 更新する </v-icon>
      </Button>
    </div>
  </v-app>
</template>

<script>
import TagModel from '../models/Tag';
import firebase, { dbTags } from '../plugins/firebase';
import Button from '../components/Button';

export default {
  components: {
    Button,
  },
  props: {
    updateTime: {
      type: Number,
      required: true,
    },
    editBeforeData: {
      type: Array,
      required: true,
    },
    updateSelect: {
      type: Array,
      required: true,
    },
    updateBody: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      times: 0,
      bodys: '',
      tagTimes: 0,
      hoursTimes: 0,
      minutesTimes: 0,
      editing: null,
      index: -1,
      items: [{ header: 'タグを選択するか作成して下さい。' }],
      dbMessagesTags: [],
      menu: false,
      search: null,
      EditDialog: false,
    };
  },
  computed: {
    updatedTime: {
      get() {
        return this.updateTime;
      },
      set(value) {
        this.$emit('update:updateTime', value);
      },
    },
    updatedSelect: {
      get() {
        return this.updateSelect;
      },
      set(value) {
        this.$emit('update:updateSelect', value);
      },
    },
    updatedBody: {
      get() {
        return this.updateBody;
      },
      set(value) {
        this.$emit('update:updateBody', value);
      },
    },
  },
  watch: {
    updatedSelect(val, prev) {
      if (val.length === prev.length) return;
      this.updatedSelect = Array.prototype.map.call(Object(val), (value) => {
        if (typeof value === 'string') {
          value = {
            text: value,
          };
          this.items.push(value);
        }
        this.dialogTime();
        return value;
      });
    },
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
    async update() {
      this.$emit('updatedDate');
      try {
        const uid = firebase.auth().currentUser.uid;
        this.updatedSelect.forEach(async (element) => {
          const params = Object.assign(element, { uid });
          const TagSame = await dbTags.where('uid', '==', uid).where('text', '==', params.text).get();
          if (TagSame.docs) {
            let Tag = [];
            TagSame.docs.forEach((e) => {
              Tag = [];
              Tag.push(e.id);
            });

            let TagData = await (await dbTags.doc(Tag[0]).get()).data();
            if (TagData === undefined) {
              TagData = [];
            }
            const dbMessagesTagTime = TagSame.docs.map((doc) => {
              return doc.data();
            });

            await dbTags.doc(Tag[0]).set({
              text: params.text,
              time: params.time,
              uid: params.uid,
            });
          }
        });
      } catch (error) {
        alert(error.message);
      }
    },
    // tagの削除機能
    async tagDelete(index, item) {
      item = JSON.parse(JSON.stringify(item));
      const tagData = await dbTags
        .where('text', '==', item.text)
        .where('time', '==', item.time)
        .where('uid', '==', item.uid)
        .get();

      tagData.docs.map(async (Element) => {
        await dbTags.doc(Element.id).delete();
        return Element.id;
      });

      await this.tagGet();
    },
    // tag一覧の同期
    async tagGet() {
      const tags = await TagModel.get();
      this.items = tags;
    },
    close(item) {
      this.times -= item.time;
    },
    dialogTime() {
      this.EditDialog = true;
    },
    back() {
      this.$emit('back');
    },
    // dialog内の決定ボタンで発火
    async tagTime() {
      this.EditDialog = false;
      const uid = firebase.auth().currentUser.uid;

      // 時間→分
      this.tagTimes = parseInt(this.hoursTimes) * 60 + parseInt(this.minutesTimes);

      // タグに時間とuidを紐付け
      Object.assign(this.updatedSelect[this.updatedSelect.length - 1], { time: parseInt(this.tagTimes) }, { uid });

      this.dbMessagesTags.push(this.updatedSelect[this.updatedSelect.length - 1]);

      this.dbMessagesTags = this.dbMessagesTags.filter((item, index, array) => {
        return array.findIndex((nextItem) => item.text === nextItem.text) === index;
      });

      this.dbMessagesTags[this.dbMessagesTags.length - 1] = JSON.parse(
        JSON.stringify(this.dbMessagesTags[this.dbMessagesTags.length - 1])
      );

      // 合計値を格納
      this.times += this.tagTimes;

      this.hoursTimes = 0;
      this.minutesTimes = 0;
      this.tagTimes = 0;
    },
    async edit(index, item) {
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

      const hasValue = (val) => (val != null ? val : '');

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return text.toString().toLowerCase().includes(query.toString().toLowerCase());
    },
  },
};
</script>

<style scoped>
>>> .v-application--wrap {
  min-height: 0;
}
.textbox-input {
  margin: 0;
  padding: 3px 10px;
  border: 1px solid rgb(161, 161, 161);
  -webkit-appearance: none;
}
.color {
  border: solid 1px #7db4e6;
  color: #70c2fd;
}
h2,
.headline {
  color: #6cb4e4;
  text-align: center;
  padding: 0.25em;
  border-top: solid 2px #6cb4e4;
  border-bottom: solid 2px #6cb4e4;
  background: -webkit-repeating-linear-gradient(-45deg, #f0f8ff, #f0f8ff 3px, #e9f4ff 3px, #e9f4ff 7px);
}
.textbox-area {
  resize: none;
  background: white;
  border-radius: 5px;
  padding: 0;
  margin: 0;
  flex-basis: none;
}
.tagcolor,
.theme--light.v-chip:not(.v-chip--active) {
  background: #a8d5ff;
}
.textbox-area {
  resize: none;
  background: white;
  border-radius: 5px;
  padding: 0;
  margin: 0;
  max-height: 140px;
}
.button {
  text-align: right;
  padding: 10px;
  color: #70c2fd;
}
.field,
.textbox-input {
  border: solid 1px #7db4e6;
}
</style>
