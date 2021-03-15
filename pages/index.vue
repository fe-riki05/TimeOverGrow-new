<template>
  <v-app>
    <Header>
      <v-list-item text nuxt>
        <nuxt-link to="/mypage" class="d-flex auth">
          <v-icon>mdi-account-box-multiple</v-icon>
          <v-list-item-title>これまでの記録</v-list-item-title>
        </nuxt-link>
      </v-list-item>
    </Header>
    <Main class="mt-5 mx-5" />
  </v-app>
</template>

<script>
import Header from '../layouts/Header';
import Main from '../components/Main';
import auth from '../plugins/firebase.auth';

export default {
  components: {
    Header,
    Main,
  },
  created() {
    console.log(auth.Promise);
  },
};
</script>

<style scoped>
>>> .v-application--wrap {
  min-height: 0;
}
.auth {
  text-decoration: none;
  color: inherit;
}
</style>
