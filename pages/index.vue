<template>
  <v-app>
    <Header>
      <v-list-item text nuxt>
        <nuxt-link to="/mypage" class="d-flex auth">
          <v-list-item-icon>
            <v-icon>mdi-account-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title>マイページ</v-list-item-title>
        </nuxt-link>
      </v-list-item>
    </Header>
    <Main class="mt-5 mx-5" />
  </v-app>
</template>

<script>
import Header from '../layouts/Header';
import Main from '../components/Main';

export default {
  components: {
    Header,
    Main,
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
