import { auth } from '~/plugins/firebase.js';

export default (context) => {
  const { store } = context;

  return new Promise((resolve) => {
    auth().onAuthStateChanged((user) => {
      store.commit('setUser', user);

      console.log(user);
      // if (user.isAnonymous) {
      //   console.log('匿名ログインON!!!');
      // }
      resolve();
    });
  });
};
