<template>
  <v-app>
    <!-- <v-container> -->
    <!-- <v-card class="overflow-hidden"> -->
    <v-app-bar app height="100" class="header-menu header py-0 px-4">
      <v-spacer></v-spacer>
      <v-btn v-if="title" text>
        <nuxt-link to="/top" class="link d-flex menu">
          <v-icon color="black">mdi-timer-sand</v-icon>
          <v-toolbar-title> TimeOverGrow </v-toolbar-title>
        </nuxt-link>
      </v-btn>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-list
        nav
        dense
        class="p-0 justify-end hidden-sm-and-down"
        style="background: transparent"
      >
        <v-list-item-group class="d-flex">
          <v-list-item v-if="logout" text @click="signOut" class="ma-0">
            <v-icon>mdi-arrow-left-bold</v-icon>
            <v-list-item-title class="pl-1 mr-3">ログアウト</v-list-item-title>
          </v-list-item>
          <!-- ここで挿入される -->
          <slot></slot>
        </v-list-item-group>
      </v-list>
      <v-app-bar-nav-icon
        v-if="humbargarmenu"
        class="hidden-md-and-up"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!-- ここからハンバーガーメニュー -->
    <div class="hidden-md-and-up">
      <v-navigation-drawer v-model="drawer" right fixed temporary>
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item v-if="logout" text @click="signOut">
              <v-icon>mdi-arrow-left-bold</v-icon>
              <v-list-item-title class="pl-1">ログアウト</v-list-item-title>
            </v-list-item>
            <!-- ここで挿入される -->
            <slot></slot>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <!-- ここまで -->
    </div>
    <!-- </v-card> -->
    <!-- </v-container> -->
  </v-app>
</template>

<script>
export default {
  name: 'headerMenu',
  props: {
    title: {
      type: Boolean,
      default: true,
    },
    logout: {
      type: Boolean,
      default: true,
    },
    humbargarmenu: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  methods: {
    signOut() {
      this.$store
        .dispatch('signOut')
        .then(() => {
          this.$router.push({
            name: 'login',
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  },
};
</script>

<style>
.link {
  text-decoration: none;
}
.link:visited {
  color: inherit;
}
.header {
  background-color: #70c2fd;
  background: #2980b9; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2980b9,
    #6dd5fa,
    #ffffff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2980b9,
    #6dd5fa,
    #ffffff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.title {
  font-size: 35px;
}
.menu {
  width: 200px;
  padding: 0;
  text-decoration: none;
  color: inherit;
}
h1 {
  margin: 0 auto;
}
.header-menu {
  margin: 0 auto;
  padding: 0 20%;
}
</style>
