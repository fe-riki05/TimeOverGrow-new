import { auth } from '~/plugins/firebase.js';

export default (context) => {
  const { store } = context;

  new Promise((resolve) => {
    auth().onAuthStateChanged((user) => {
      store.commit('setUser', user);

      resolve();
    });
  });
};
