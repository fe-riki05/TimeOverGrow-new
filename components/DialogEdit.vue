<template>
  <!-- eslint-disable -->
  <v-app class="ma-0" style="max-height: 400px">
    <!-- <v-container fluid class="px-0"> -->
    <h2>今日のアウトプット内容</h2>
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
          <v-chip
            v-if="item === Object(item)"
            v-bind="attrs"
            color="tagcolor"
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
          <v-chip v-else color="tagcolor" label small>
            {{ item.text }}
          </v-chip>
          <v-spacer></v-spacer>
          <v-list-item-action @click.stop>
            <v-btn icon @click.stop.prevent="edit(index, item)">
              <v-icon>{{
                editing !== item ? 'mdi-pencil' : 'mdi-check'
              }}</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-combobox>
    </v-container>
    <!-- </v-container> -->
    <v-dialog v-model="EditDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          学習時間を記入して下さい。
        </v-card-title>
        <input
          v-model="tagTimes"
          class="textbox-input mt-4"
          type="number"
          max="24"
          min="0"
          placeholder="3"
        />
        時間
        <!-- <v-card-text> </v-card-text>
        <v-divider></v-divider> -->
        <v-card-actions>
          <!-- <v-spacer></v-spacer> -->
          <Button color="primary" text :on-click="tagTime">決定</Button>
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
      <!-- <v-card-actions>
        <v-btn color="green darken-1" text @click="back"> 戻る </v-btn>
      </v-card-actions> -->
      <Button :on-click="back">
        <v-icon> mdi-arrow-left-bold-box </v-icon>
        <v-icon color="green darken-1"> 戻る </v-icon>
      </Button>
      <v-spacer></v-spacer>
      <Button :on-click="update">
        <v-icon color="#70c2fd"> mdi-send </v-icon>
        <v-icon color="green darken-1"> 更新する </v-icon>
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
    // onClick: {
    // 	type: Function,
    // 	required: true
    // },
    updateTime: {
      type: Number,
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
      canPost: true,
      activator: null,
      editing: null,
      index: -1,
      items: [{ header: 'タグを選択するか作成して下さい。' }],
      // updatedSelect: [],
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
            // color: this.colors[this.nonce - 1],
            text: value,
          };
          this.items.push(value);
          // this.nonce++;
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
      // Number(this.updateTime);
      this.$emit('updatedDate');
      this.canPost = false;
      try {
        const uid = firebase.auth().currentUser.uid;
        this.updatedSelect.forEach(async (element) => {
          const params = Object.assign(element, { uid });
          const TagSame = await dbTags
            .where('uid', '==', uid)
            .where('text', '==', params.text)
            .get();
          if (TagSame.docs) {
            let Tag = [];
            TagSame.docs.forEach((e) => {
              Tag = [];
              Tag.push(e.id);
            });

            let TagData = await (await dbTags.doc(Tag[0]).get()).data();
            // let TagTime = TagData.data();
            if (TagData === undefined) {
              TagData = [];
            }
            const dbMessagesTagTime = TagSame.docs.map((doc) => {
              return doc.data();
            });

            if (dbMessagesTagTime.length !== 0) {
              params.time += await dbMessagesTagTime[0].time;
            }

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
      this.canPost = true;
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

      Object.assign(
        this.updatedSelect[this.updatedSelect.length - 1],
        { time: parseInt(this.tagTimes) },
        { uid }
      );

      Object.assign(this.dbMessagesTags, {
        tags: this.updatedSelect[this.updatedSelect.length - 1],
        uid,
      });
      this.updatedSelect[this.updatedSelect.length - 1] = JSON.parse(
        JSON.stringify(this.updatedSelect[this.updatedSelect.length - 1])
      );

      this.dbMessagesTags.push(
        this.updatedSelect[this.updatedSelect.length - 1]
      );

      this.dbMessagesTags = this.dbMessagesTags.filter((item, index, array) => {
        return (
          array.findIndex((nextItem) => item.text === nextItem.text) === index
        );
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
        editBefore.docs.forEach((doc) => {
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

      const hasValue = (val) => (val != null ? val : '');

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return text
        .toString()
        .toLowerCase()
        .includes(query.toString().toLowerCase());
    },
  },
};
</script>

<style scoped>
.textbox-input {
  margin: 0;
  padding: 3px 10px;
  border: 1px solid rgb(161, 161, 161);
  -webkit-appearance: none;
}
.input {
  flex: 0;
}
/* Chrome, Safari, Edge */
.textbox-input::-webkit-outer-spin-button,
.textbox-input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none;
}
h2 {
  color: #6cb4e4;
  text-align: center;
  padding: 0.25em;
  border-top: solid 2px #6cb4e4;
  border-bottom: solid 2px #6cb4e4;
  background: -webkit-repeating-linear-gradient(
    -45deg,
    #f0f8ff,
    #f0f8ff 3px,
    #e9f4ff 3px,
    #e9f4ff 7px
  );
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
  background: #a8ff78; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #78ffd6,
    #a8ff78
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #78ffd6,
    #a8ff78
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
  /* margin-right: 50px; */
  text-align: right;
  padding: 10px;
  color: #70c2fd;
}
</style>
