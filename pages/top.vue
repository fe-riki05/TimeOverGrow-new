<template>
  <v-app>
    <Header :logout="false">
      <v-list-item class="ma-0">
        <nuxt-link to="/login" class="d-flex auth" @click="signIn">
          <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
          <v-list-item-title class="pl-1">ログイン</v-list-item-title>
        </nuxt-link>
      </v-list-item>
      <v-list-item class="ma-0">
        <nuxt-link to="/register" class="d-flex auth" @click="signIn">
          <v-icon>mdi-account-plus</v-icon>
          <v-list-item-title class="pl-1">アカウント登録</v-list-item-title>
        </nuxt-link>
      </v-list-item>
      <v-list-item class="ma-0 pa-0">
        <v-btn text class="guest" @click="guestLogin">
          <v-icon color="#7db4e6">mdi-account-check</v-icon>
          <v-list-item-title class="pl-1">テストログイン</v-list-item-title>
        </v-btn>
      </v-list-item>
    </Header>
    <v-container fill-height class="col">
      <v-row class="col" align="center">
        <v-spacer />
        <v-col class="col mx-2 mt-5" cols="12" sm="5" md="5" lg="5" xl="5">
          <v-img :src="imgPath" />
        </v-col>
        <v-col class="col mx-4 mt-5" cols="12" sm="5" md="5" lg="5" xl="5">
          <h2 class="chat">沢山勉強したいのにモチベーションが上がらない。。。</h2>
          <h2 class="chat">Twitterでは転職活動終了のお知らせばかり。。。</h2>
          <h2 class="chat">このままでエンジニアへ転職することはできるのか。。。</h2>
        </v-col>
        <v-spacer />
      </v-row>
      <div class="col my-9">
        <h2 class="text-color text-center">
          <span class="mx-3 title">TIMEOVERGROW</span>はそんなあなたの想いを払拭する為の自己管理アプリです！
        </h2>
      </div>
      <v-row class="text-center bg-card">
        <v-col cols="12" sm="4" md="4" lg="4" xl="4">
          <v-card hover>
            <v-card-title class="d-block">アウトプット機能</v-card-title>
            <v-img class="top-img" :src="outPut" />
            <v-card-text>
              1日1回今日の学習した内容をアウトプットしましょう！学んだ技術のタグ付けを行うことでより正確に自分の学習状況を把握できます！プログラミング同様今の状況を"言語化"して自らの課題を可視化しましょう！
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4" xl="4">
          <v-card hover>
            <v-card-title class="d-block">合計学習時間の表示機能</v-card-title>
            <v-img class="top-img" :src="totalTime" />
            <v-card-text>
              今までの合計学習時間がグラフと数値で一目でわかります！また別ページではタグ毎の合計学習時間をグラフと数値で一目で確認できます！常に自分の時間対効果と向き合いましょう！
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4" xl="4">
          <v-card hover>
            <v-card-title class="d-block">ヒートマップ機能</v-card-title>
            <v-img :src="heartMap" />
            <v-card-text>
              GitHubでおなじみのヒートマップ図を導入しました！草の色は5段階あり、学習時間によって1時間単位で草の色が変色します！5時間以上の学習で1番濃い草になるので毎日継続して濃い草を生やし続けましょう！
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="my-8 test-login text-center">
      <h1 class="text-color">さぁ、未経験から一緒にエンジニア転職しましょう！</h1>
      <div class="mt-5">
        <v-btn text to="/login" class="auth" @click="signIn">
          <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
          <v-list-item-title class="pl-1">ログイン</v-list-item-title>
        </v-btn>
        <v-btn text class="guest" @click="guestLogin">
          <v-icon color="#7db4e6">mdi-account-check</v-icon>
          <v-list-item-title class="pl-1">テストログイン</v-list-item-title>
        </v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
import Header from '../layouts/Header';

export default {
  components: {
    Header,
  },
  data() {
    return {
      imgPath: require('@/assets/app_top.jpg'),
      outPut: require('@/assets/output.png'),
      totalTime: require('@/assets/totaltime.png'),
      heartMap: require('@/assets/heartmap.png'),
    };
  },
  methods: {
    signIn() {
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
    guestLogin() {
      this.$store
        .dispatch('signInWithEmail', {
          email: 'test@test.com',
          password: 'test_login',
        })
        .then(() => {
          // this.login_email = '';
          // this.login_password = '';
          this.$router.push({
            name: 'index',
          });
        })
        .catch((err) => {
          // console.log(err);
          if (err.code === 'auth/user-disabled') {
            this.loginErrorMsg = 'このアカウントはロックされています。';
          } else {
            this.loginErrorMsg = 'メールアドレスまたはパスワードが間違っています。';
          }
        });
    },
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
.guest {
  border: solid 1px #7db4e6;
}
.bg-card {
  background: #daecfb;
}
.test-login {
  margin: 0 auto;
}
.col {
  padding: 0;
  margin: 0 auto;
}
.text-color {
  color: #7db4e6;
}
.chat {
  position: relative;
  color: #7db4e6;
  margin: 2em 0 2em 40px;
  padding: 15px;
  background: #e0edff;
  border-radius: 30px;
}

.chat:before {
  content: '';
  position: absolute;
  left: -38px;
  width: 13px;
  height: 12px;
  bottom: 0;
  background: #e0edff;
  border-radius: 50%;
}

.chat:after {
  content: '';
  position: absolute;
  left: -24px;
  width: 20px;
  height: 18px;
  bottom: 3px;
  background: #e0edff;
  border-radius: 50%;
}
.title {
  position: relative;
  line-height: 1.4;
  padding: 0.25em 1em;
  display: inline-block;
}

.title:before,
.title:after {
  content: '';
  width: 20px;
  height: 30px;
  position: absolute;
  display: inline-block;
}

.title:before {
  border-left: solid 1px #7db4e6;
  border-top: solid 1px #7db4e6;
  top: 0;
  left: 0;
}

.title:after {
  border-right: solid 1px #7db4e6;
  border-bottom: solid 1px #7db4e6;
  bottom: 0;
  right: 0;
}
.top-img {
  width: 50%;
  margin: auto;
}
</style>
